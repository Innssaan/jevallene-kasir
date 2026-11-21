#!/usr/bin/env python3
"""
Jevallene POS — Dark Neon UMKM Cloud
REST API Backend + SQLite Database + Static SPA Server (Port 8080)
"""

import csv
import io
import json
import os
import sqlite3
import xml.etree.ElementTree as ET
import zipfile
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "pos.db")
EXCEL_PATH = os.path.join(BASE_DIR, "katalog_produk.xlsx")
CSV_PATH = os.path.join(BASE_DIR, "katalog_produk.csv")
PORT = int(os.environ.get("PORT", 8080))

# ==========================================================================
# INITIAL SEED DATA
# ==========================================================================
SEED_PRODUCTS = [
    {
        "id": "KOP-011",
        "sku": "KOP-011",
        "barcode": "8991001201",
        "name": "Es Kopi Susu Gula Aren",
        "category": "kopi",
        "categoryLabel": "Minuman Kopi",
        "badge": "BEST",
        "hpp": 8500,
        "price": 22000,
        "stock": 42,
        "minStock": 10,
        "status": "Aktif",
        "note": "Extra Shot Espresso (+Rp 3.000)",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAcBrds6NncVIFBSgdMKe33DWU9h62fYO3htWt52zs1oIq3w3Ij0fj71sPPoavofMdpxef3As_u9GbPIi-EuqN6GPnMZTfods0mtwrTDt42UYBjyvEXoDtHXteSOUgT1O6yDkqfQWL3h7cSegw7tWXm1wzw2CO_BN7DVv7s7ZT9D2I0sYnxQ1lp-7pz1OoDxIg31eRSpqW5KIzUgtKQR9J0PQoRgVOHYQt1S3MTP8I",
    },
    {
        "id": "PST-004",
        "sku": "PST-004",
        "barcode": "8991001402",
        "name": "Croissant Butter Paris",
        "category": "pastry",
        "categoryLabel": "Snack & Pastry",
        "badge": "PASTRY",
        "hpp": 12000,
        "price": 28000,
        "stock": 18,
        "minStock": 8,
        "status": "Aktif",
        "note": "Warm toasted / Hangat",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAihN1plaWwL5JS_3Kt0NMbeeGbrSjy2VEBVyafEeTZk8w9z1Fcp0JPn33gefeiPMIxHiYMNO7U7cZZiLUcrdfIhUAWhUYmWq0kTHoZCPpJodZOZDOkclDmP4C0TubQ8rB5yd9Mg4Zllb8BvkUn8lKHY99OlgwAm4rGrtShu-zLQc3FdU6AFlNlCm424XXaGEMIzVRZXe-ijhEuyYhTeE2CX4Q77QjnloKp6IwLiTs",
    },
    {
        "id": "NCF-020",
        "sku": "NCF-020",
        "barcode": "8991001882",
        "name": "Matcha Latte Oat",
        "category": "kopi",
        "categoryLabel": "Minuman Non-Kopi",
        "badge": "NON-COFFEE",
        "hpp": 14000,
        "price": 32000,
        "stock": 24,
        "minStock": 10,
        "status": "Aktif",
        "note": "Less Sugar 50%",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9EyY-po9ALQVUlh_a9EPG-S-URavOSeT5Dym_COd2W2Ug2ksXVQBGGpblOMlBjCiW2olxxUpMr3vDvP-8vo9GGn-0__kzkD5l3Kr9T-R1zAXjro-wNkGE_KL9W3kgBmSsOsdubW-7g_dE2njw5Wq2mv3DDWE8nhVmWl8UkR9OcCREdLwBk3uKqlB7DiLkGDTMyhHMBe-Kns7iFsDwaN3mIdd2YjFpOPBgv0w4mw",
    },
    {
        "id": "MKN-005",
        "sku": "MKN-005",
        "barcode": "8991001923",
        "name": "Ayam Geprek Sambal Korek",
        "category": "makanan",
        "categoryLabel": "Makanan Utama",
        "badge": "SPICY",
        "hpp": 13500,
        "price": 26000,
        "stock": 4,
        "minStock": 10,
        "status": "Kritis",
        "note": "Level Pedas Sedang",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA1tAiEmgeN_5-W1H99_AEwlsgtaGZh3nkoxFjYEDuVbDqa4mLDtyIP88jYKZrqNY8iUrToe9aXuv6hXB_lHmY7jC1q8Lm8tMzAWOyV83YyaNVVnZzJqc_l_zsrVd7XWI6w-1MMh-6_teHYp-Qb0iOVNd96402hKhwQLYvThyFcywQOJUeG_xc4jhLHTVk69V418GJKJsL91sGVqt-vnn5g5HmteQ0DFCPnTV6_lS4",
    },
    {
        "id": "MKN-018",
        "sku": "MKN-018",
        "barcode": "8991001550",
        "name": "Mie Goreng Spesial Toko",
        "category": "makanan",
        "categoryLabel": "Makanan Utama",
        "badge": "MAKANAN",
        "hpp": 11000,
        "price": 25000,
        "stock": 31,
        "minStock": 10,
        "status": "Aktif",
        "note": "Telur Mata Sapi Setengah Matang",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAyOt46Mh1mZOSSQVeB-L4fNegcW4SMdVnMmSWRK4pTnf86h58buc0MEwI236F-IFmMo01eKQC8IoJeEGQMRzzt-a9eh2yfnHVe0K8YwQgkPRiLpEVrgu-2kCInAJX8Soxl51ToUIrkaqddgmnFANDgFCUgRXv2COhembdUXxPQNoc91f4PNMbk5kE1B-v-zPRRjeJvB_APSkqmNTUeh-uP5AkLSH-10myrYn5IE_M",
    },
    {
        "id": "KOP-002",
        "sku": "KOP-002",
        "barcode": "8991001610",
        "name": "Americano Double Shot",
        "category": "kopi",
        "categoryLabel": "Minuman Kopi",
        "badge": "CLASSIC",
        "hpp": 6500,
        "price": 18000,
        "stock": 55,
        "minStock": 10,
        "status": "Aktif",
        "note": "Arabika House Blend",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fbzo5dOqFoSEkecF4H7wqJehQm11J68o1EXE5-zjNs50ct0KNraGVYRQOTQ6GMAukTfKDvwQYvg25sCwfLgZKrUjgS4A1KXQLWLwRs5xL-2OUbnQk8gIzGGTP9KNNwMIIMKFMoI1IoO9CO4ZEKX11ucda3dagKyCj0W1xke2qlpJpPeHwEuhVBNB0maVo9hzSDiKo8-8L3fXfvTQKkMg72zecZYwAA4Oav-gfps",
    },
]

SEED_TRANSACTIONS = [
    {
        "id": "#TRX-9482",
        "bon": "TRX-20241024-9482",
        "time": "14:32 WIB",
        "customer": "Walk-in (Takeaway)",
        "itemsSummary": "Es Kopi Susu x2, Croissant x1",
        "itemCount": "3 items",
        "method": "QRIS BCA",
        "methodGroup": "QRIS",
        "cashier": "Siti Rahma",
        "total": 78000,
        "status": "Selesai",
        "items": [
            {"name": "Es Kopi Susu Jevallene", "qty": 2, "price": 22000, "note": "Less Sugar"},
            {"name": "Croissant Butter Paris", "qty": 1, "price": 28000, "note": "Heated"},
            {"name": "Paper Bag Takeaway", "qty": 1, "price": 6000, "note": "Packaging"},
        ],
    },
    {
        "id": "#TRX-9481",
        "bon": "TRX-20241024-9481",
        "time": "14:15 WIB",
        "customer": "Meja 02 (Dine-in)",
        "itemsSummary": "Ayam Geprek x2, Americano x2",
        "itemCount": "4 items",
        "method": "Tunai",
        "methodGroup": "Tunai",
        "cashier": "Siti Rahma",
        "total": 88000,
        "status": "Selesai",
        "items": [
            {"name": "Ayam Geprek Sambal Korek", "qty": 2, "price": 26000, "note": "Pedas Normal"},
            {"name": "Americano Double Shot", "qty": 2, "price": 18000, "note": "Iced"},
        ],
    },
    {
        "id": "#TRX-9480",
        "bon": "TRX-20241024-9480",
        "time": "13:50 WIB",
        "customer": "Meja 07 (Dine-in)",
        "itemsSummary": "Matcha Latte Oat x2",
        "itemCount": "2 items",
        "method": "QRIS GoPay",
        "methodGroup": "QRIS",
        "cashier": "Budi Santoso",
        "total": 64000,
        "status": "Refund",
        "items": [
            {"name": "Matcha Latte Oat", "qty": 2, "price": 32000, "note": "Refund: Salah Input Pesanan"}
        ],
    },
    {
        "id": "#TRX-9479",
        "bon": "TRX-20241024-9479",
        "time": "13:42 WIB",
        "customer": "GoFood Pickup (Driver Agus)",
        "itemsSummary": "Mie Goreng Spesial x4, Kopi Susu x2",
        "itemCount": "6 items",
        "method": "Transfer BCA",
        "methodGroup": "Transfer",
        "cashier": "Siti Rahma",
        "total": 144000,
        "status": "Selesai",
        "items": [
            {"name": "Mie Goreng Spesial Toko", "qty": 4, "price": 25000, "note": "Takeaway Box"},
            {"name": "Es Kopi Susu Gula Aren", "qty": 2, "price": 22000, "note": "Normal Sugar"},
        ],
    },
    {
        "id": "#TRX-9478",
        "bon": "TRX-20241024-9478",
        "time": "13:10 WIB",
        "customer": "Walk-in (Dine-in Bar)",
        "itemsSummary": "Americano Double Shot x1",
        "itemCount": "1 item",
        "method": "QRIS Mandiri",
        "methodGroup": "QRIS",
        "cashier": "Budi Santoso",
        "total": 18000,
        "status": "Selesai",
        "items": [
            {"name": "Americano Double Shot", "qty": 1, "price": 18000, "note": "Hot Cup"}
        ],
    },
]

SEED_INVENTORY = [
    {"id": "ING-001", "name": "Biji Kopi Arabika Gayo (1Kg)", "category": "Bahan Kopi", "stock": 14, "minStock": 5, "unit": "Pack", "cost": 215000},
    {"id": "ING-002", "name": "Susu UHT Full Cream Diamond (1L)", "category": "Dairy & Oat", "stock": 8, "minStock": 12, "unit": "Box", "cost": 19500},
    {"id": "ING-003", "name": "Oatside Barista Blend (1L)", "category": "Dairy & Oat", "stock": 5, "minStock": 8, "unit": "Box", "cost": 33000},
    {"id": "ING-004", "name": "Gula Aren Organik Cair (5L)", "category": "Sirup & Pemanis", "stock": 6, "minStock": 3, "unit": "Jerigen", "cost": 145000},
    {"id": "ING-005", "name": "Bubuk Matcha Uji Kyoto (500g)", "category": "Bahan Non-Kopi", "stock": 2, "minStock": 4, "unit": "Pouch", "cost": 280000},
    {"id": "ING-006", "name": "Cup Injection 16oz + Lid Sablon", "category": "Packaging", "stock": 420, "minStock": 150, "unit": "Pcs", "cost": 1450},
    {"id": "ING-007", "name": "Croissant Butter Frozen Dough", "category": "Pastry & Bakery", "stock": 36, "minStock": 20, "unit": "Pcs", "cost": 9500},
]

SEED_MUTATIONS = [
    {"time": "Hari ini, 08:15", "item": "Susu UHT Full Cream", "delta": "-6 Box", "reason": "Pemakaian Bar Pagi"},
    {"time": "Kemarin, 17:40", "item": "Biji Kopi Arabika Gayo", "delta": "+10 Pack", "reason": "Restok PO-2410-088"},
    {"time": "Kemarin, 14:10", "item": "Bubuk Matcha Uji Kyoto", "delta": "-1 Pouch", "reason": "Stock Opname Rutin"},
]

SEED_POS = [
    {"id": "PO-2410-091", "date": "24 Okt 2024", "supplier": "CV Dairy Fresh Indonesia", "items": "Oatside Barista 1L (4 Karton), Susu Diamond (6 Karton)", "total": 2850000, "status": "Dikirim"},
    {"id": "PO-2410-090", "date": "23 Okt 2024", "supplier": "PT Kopi Nusantara Roastery", "items": "Arabika Gayo Wine 1Kg (12 Pack), House Blend (10 Pack)", "total": 4250000, "status": "Dikirim"},
    {"id": "PO-2410-089", "date": "20 Okt 2024", "supplier": "UD Kemasan Mandiri Jaya", "items": "Paper Cup 16oz + Lid (2.000 Pcs), Paper Bag (500 Pcs)", "total": 3120000, "status": "Diterima"},
    {"id": "PO-2410-088", "date": "18 Okt 2024", "supplier": "Mitra Pangan Segar Yogya", "items": "Ayam Fillet Segar (25 Kg), Cabai Rawit & Bahan Dapur", "total": 1980000, "status": "Diterima"},
]

SEED_CASH_DRAWER = [
    {"time": "07:30 WIB", "type": "in", "label": "Modal Awal Laci", "note": "Pembukaan Shift 1 (Pecahan Kecil)", "user": "Siti Rahma", "amount": 500000},
    {"time": "10:15 WIB", "type": "out", "label": "Kas Keluar (Petty)", "note": "Beli Galon Air Mineral Bar (5 Galon)", "user": "Siti Rahma", "amount": 100000},
    {"time": "12:40 WIB", "type": "out", "label": "Kas Keluar (Petty)", "note": "Beli Plastik Takeaway & Karet", "user": "Budi Santoso", "amount": 85000},
    {"time": "14:15 WIB", "type": "in", "label": "Penjualan Tunai POS", "note": "Akumulasi Pembayaran Tunai Kasir", "user": "Sistem POS", "amount": 3420000},
]

SEED_FINANCE = [
    {"date": "24 Okt 2024", "cat": "Pencairan Settlement QRIS", "desc": "Settlement Otomatis QRIS BCA & GoPay (142 Trx)", "acc": "BCA Bisnis", "type": "in", "amount": 8450000},
    {"date": "23 Okt 2024", "cat": "Setoran Tunai Kasir", "desc": "Setoran Tutup Shift Pagi & Sore", "acc": "Brankas Tunai", "type": "in", "amount": 4120000},
    {"date": "22 Okt 2024", "cat": "Pembelian Bahan Baku", "desc": "Pelunasan Faktur PT Kopi Nusantara Roastery", "acc": "BCA Bisnis", "type": "out", "amount": 4250000},
    {"date": "20 Okt 2024", "cat": "Utilitas (Listrik / WiFi / Air)", "desc": "Token Listrik PLN 3-Phase & PDAM Toko", "acc": "BCA Bisnis", "type": "out", "amount": 2850000},
]

SEED_STAFF = [
    {"name": "Siti Rahma", "role": "Owner & Store Manager", "shift": "Full Access", "pin": "1122", "trxCount": 412, "status": "Bertugas"},
    {"name": "Budi Santoso", "role": "Head Barista & Kasir", "shift": "Shift Pagi (07:30)", "pin": "2048", "trxCount": 318, "status": "Bertugas"},
    {"name": "Dinda Permata", "role": "Kasir & Barista", "shift": "Shift Pagi (07:30)", "pin": "3310", "trxCount": 274, "status": "Bertugas"},
    {"name": "Rizky Pratama", "role": "Kitchen & Pastry", "shift": "Shift Pagi (07:30)", "pin": "5512", "trxCount": 195, "status": "Bertugas"},
    {"name": "Nadia Putri", "role": "Supervisor Shift (Akses Refund)", "shift": "Shift Sore (14:30)", "pin": "7781", "trxCount": 289, "status": "Siap Shift"},
    {"name": "Fajar Nugroho", "role": "Kasir & Barista", "shift": "Shift Sore (14:30)", "pin": "9014", "trxCount": 210, "status": "Siap Shift"},
]

SEED_SETTINGS = {
    "storeName": "JEVALLENE COFFEE & EATERY",
    "branchName": "Toko Berkah Utama (JVL-8821)",
    "storeAddr": "Jl. Melati No. 42, Kota Yogyakarta",
    "storePhone": "0812-9988-7711",
    "taxRate": 10,
    "promoRate": 10,
    "receiptFooter": "Terima kasih! WiFi: Jevallene_5G • Pass: kopisusu24",
}

SEED_NOTIFICATIONS = [
    {
        "id": "NTF-106",
        "title": "Stok Kritis: Ayam Geprek Sambal Korek",
        "message": "Sisa stok di katalog POS tinggal 4 Pcs (di bawah batas minimum 10 Pcs). Segera lakukan prep dapur atau PO bahan baku.",
        "category": "Stok & Gudang",
        "severity": "critical",
        "time": "10 menit lalu",
        "isRead": 0,
        "actionTab": "inventori",
        "actionLabel": "Cek Gudang & Stok",
    },
    {
        "id": "NTF-105",
        "title": "Pencairan Settlement QRIS BCA Berhasil",
        "message": "Dana settlement QRIS kemarin sebesar Rp 8.450.000 (142 transaksi) telah masuk ke rekening BCA Bisnis Operasional.",
        "category": "Keuangan & QRIS",
        "severity": "success",
        "time": "45 menit lalu",
        "isRead": 0,
        "actionTab": "keuangan",
        "actionLabel": "Lihat Buku Besar",
    },
    {
        "id": "NTF-104",
        "title": "Bahan Baku Menipis: Bubuk Matcha Uji Kyoto",
        "message": "Stok gudang tersisa 2 Pouch (minimum 4 Pouch). Disarankan menerbitkan PO ke PT Kopi Nusantara Roastery.",
        "category": "Stok & Gudang",
        "severity": "warning",
        "time": "1 jam lalu",
        "isRead": 0,
        "actionTab": "pembelian",
        "actionLabel": "Buat PO Supplier",
    },
    {
        "id": "NTF-103",
        "title": "Otorisasi Refund Transaksi #TRX-9480",
        "message": "Refund senilai Rp 64.000 (Matcha Latte Oat x2 - Salah Input Pesanan) telah diverifikasi menggunakan PIN Supervisor.",
        "category": "Keamanan & Audit",
        "severity": "warning",
        "time": "2 jam lalu",
        "isRead": 0,
        "actionTab": "transaksi",
        "actionLabel": "Audit Struk #TRX-9480",
    },
    {
        "id": "NTF-102",
        "title": "Kurir Supplier Dalam Perjalanan (PO-2410-091)",
        "message": "Pengiriman Oatside Barista 1L & Susu Diamond dari CV Dairy Fresh Indonesia dijadwalkan tiba pukul 15:30 WIB.",
        "category": "Pembelian PO",
        "severity": "info",
        "time": "3 jam lalu",
        "isRead": 1,
        "actionTab": "pembelian",
        "actionLabel": "Lacak Status PO",
    },
    {
        "id": "NTF-101",
        "title": "Sinkronisasi Cloud & Backup SQLite Selesai",
        "message": "Seluruh data katalog, HPP, dan jurnal kas Shift 1 telah terenkripsi dan tersinkronisasi 100% ke Jevallene Cloud.",
        "category": "Sistem Cloud",
        "severity": "success",
        "time": "Hari ini, 07:30",
        "isRead": 1,
        "actionTab": "pengaturan",
        "actionLabel": "Pengaturan Sistem",
    },
]

SEED_AUTH_USER = {
    "name": "Siti Rahma",
    "email": "siti.rahma@jevallene.cloud",
    "role": "Owner",
    "provider": "Google Workspace OAuth 2.0",
    "initials": "SR",
    "branch": "Toko Berkah Utama (JVL-8821)",
    "verified": True,
    "lastLogin": "Hari ini, 07:30 WIB",
}


# ==========================================================================
# DATABASE INITIALIZATION & HELPERS
# ==========================================================================
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(force_reset=False):
    conn = get_db()
    cur = conn.cursor()

    if force_reset:
        for tbl in [
            "products",
            "transactions",
            "inventory",
            "inventory_mutations",
            "purchase_orders",
            "cash_drawer",
            "finance_ledger",
            "staff",
            "settings",
            "notifications",
        ]:
            cur.execute(f"DROP TABLE IF EXISTS {tbl}")

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            sku TEXT,
            barcode TEXT,
            name TEXT,
            category TEXT,
            categoryLabel TEXT,
            badge TEXT,
            hpp REAL,
            price REAL,
            stock INTEGER,
            minStock INTEGER,
            status TEXT,
            note TEXT,
            image TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS transactions (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT UNIQUE,
            bon TEXT,
            time TEXT,
            customer TEXT,
            itemsSummary TEXT,
            itemCount TEXT,
            method TEXT,
            methodGroup TEXT,
            cashier TEXT,
            total REAL,
            status TEXT,
            items_json TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS inventory (
            id TEXT PRIMARY KEY,
            name TEXT,
            category TEXT,
            stock INTEGER,
            minStock INTEGER,
            unit TEXT,
            cost REAL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS inventory_mutations (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT,
            item TEXT,
            delta TEXT,
            reason TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS purchase_orders (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT UNIQUE,
            date TEXT,
            supplier TEXT,
            items TEXT,
            total REAL,
            status TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS cash_drawer (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT,
            type TEXT,
            label TEXT,
            note TEXT,
            user TEXT,
            amount REAL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS finance_ledger (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            cat TEXT,
            desc TEXT,
            acc TEXT,
            type TEXT,
            amount REAL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS staff (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            role TEXT,
            shift TEXT,
            pin TEXT,
            trxCount INTEGER,
            status TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS notifications (
            seq INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT UNIQUE,
            title TEXT,
            message TEXT,
            category TEXT,
            severity TEXT,
            time TEXT,
            isRead INTEGER DEFAULT 0,
            actionTab TEXT,
            actionLabel TEXT
        )
        """
    )

    # Seed products if empty
    cur.execute("SELECT COUNT(*) FROM products")
    if cur.fetchone()[0] == 0:
        for p in SEED_PRODUCTS:
            cur.execute(
                """
                INSERT INTO products (id, sku, barcode, name, category, categoryLabel, badge, hpp, price, stock, minStock, status, note, image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    p["id"],
                    p["sku"],
                    p["barcode"],
                    p["name"],
                    p["category"],
                    p["categoryLabel"],
                    p["badge"],
                    p["hpp"],
                    p["price"],
                    p["stock"],
                    p["minStock"],
                    p["status"],
                    p["note"],
                    p["image"],
                ),
            )

        # Insert in reverse so ORDER BY seq DESC returns newest first
        for t in reversed(SEED_TRANSACTIONS):
            cur.execute(
                """
                INSERT INTO transactions (id, bon, time, customer, itemsSummary, itemCount, method, methodGroup, cashier, total, status, items_json)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    t["id"],
                    t["bon"],
                    t["time"],
                    t["customer"],
                    t["itemsSummary"],
                    t["itemCount"],
                    t["method"],
                    t["methodGroup"],
                    t["cashier"],
                    t["total"],
                    t["status"],
                    json.dumps(t["items"]),
                ),
            )

        for i in SEED_INVENTORY:
            cur.execute(
                "INSERT INTO inventory (id, name, category, stock, minStock, unit, cost) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (i["id"], i["name"], i["category"], i["stock"], i["minStock"], i["unit"], i["cost"]),
            )

        for m in reversed(SEED_MUTATIONS):
            cur.execute(
                "INSERT INTO inventory_mutations (time, item, delta, reason) VALUES (?, ?, ?, ?)",
                (m["time"], m["item"], m["delta"], m["reason"]),
            )

        for po in reversed(SEED_POS):
            cur.execute(
                "INSERT INTO purchase_orders (id, date, supplier, items, total, status) VALUES (?, ?, ?, ?, ?, ?)",
                (po["id"], po["date"], po["supplier"], po["items"], po["total"], po["status"]),
            )

        for cd in reversed(SEED_CASH_DRAWER):
            cur.execute(
                "INSERT INTO cash_drawer (time, type, label, note, user, amount) VALUES (?, ?, ?, ?, ?, ?)",
                (cd["time"], cd["type"], cd["label"], cd["note"], cd["user"], cd["amount"]),
            )

        for fl in reversed(SEED_FINANCE):
            cur.execute(
                "INSERT INTO finance_ledger (date, cat, desc, acc, type, amount) VALUES (?, ?, ?, ?, ?, ?)",
                (fl["date"], fl["cat"], fl["desc"], fl["acc"], fl["type"], fl["amount"]),
            )

        for st in reversed(SEED_STAFF):
            cur.execute(
                "INSERT INTO staff (name, role, shift, pin, trxCount, status) VALUES (?, ?, ?, ?, ?, ?)",
                (st["name"], st["role"], st["shift"], st["pin"], st["trxCount"], st["status"]),
            )

        for k, v in SEED_SETTINGS.items():
            cur.execute("INSERT INTO settings (key, value) VALUES (?, ?)", (k, json.dumps(v)))

    # Ensure notifications and authUser are seeded even on existing pos.db
    cur.execute("SELECT COUNT(*) FROM notifications")
    if cur.fetchone()[0] == 0:
        for n in reversed(SEED_NOTIFICATIONS):
            cur.execute(
                """
                INSERT INTO notifications (id, title, message, category, severity, time, isRead, actionTab, actionLabel)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    n["id"],
                    n["title"],
                    n["message"],
                    n["category"],
                    n["severity"],
                    n["time"],
                    n["isRead"],
                    n["actionTab"],
                    n["actionLabel"],
                ),
            )

    cur.execute("SELECT COUNT(*) FROM settings WHERE key = 'authUser'")
    if cur.fetchone()[0] == 0:
        cur.execute("INSERT INTO settings (key, value) VALUES ('authUser', ?)", (json.dumps(SEED_AUTH_USER),))

    conn.commit()
    conn.close()
    sync_products_to_excel()


# ==========================================================================
# EXCEL (.XLSX) & CSV TWO-WAY DATABASE SYNC ENGINE (ZERO EXTERNAL DEPS)
# ==========================================================================
EXCEL_HEADERS = [
    "SKU",
    "BARCODE",
    "NAMA_PRODUK",
    "KATEGORI_KODE",
    "KATEGORI_LABEL",
    "BADGE",
    "HPP_MODAL",
    "HARGA_JUAL",
    "STOK",
    "MIN_STOK",
    "STATUS",
    "CATATAN",
    "IMAGE_URL",
]


def _xml_escape(val):
    s = str(val if val is not None else "")
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&apos;")
    )


def _col_letter(idx):
    letters = ""
    while idx >= 0:
        letters = chr(65 + (idx % 26)) + letters
        idx = (idx // 26) - 1
    return letters


def build_xlsx_bytes(products):
    """Generates a valid Microsoft Excel .xlsx (OpenXML) file in memory."""
    rows_data = [EXCEL_HEADERS]
    for p in products:
        rows_data.append(
            [
                p.get("sku", p.get("id", "")),
                p.get("barcode", ""),
                p.get("name", ""),
                p.get("category", "kopi"),
                p.get("categoryLabel", "Minuman Kopi"),
                p.get("badge", "REGULAR"),
                int(float(p.get("hpp", 0))),
                int(float(p.get("price", 0))),
                int(p.get("stock", 0)),
                int(p.get("minStock", 5)),
                p.get("status", "Aktif"),
                p.get("note", ""),
                p.get("image", ""),
            ]
        )

    sheet_rows_xml = []
    for r_idx, row in enumerate(rows_data, start=1):
        cells_xml = []
        for c_idx, val in enumerate(row):
            col_ref = f"{_col_letter(c_idx)}{r_idx}"
            if r_idx > 1 and isinstance(val, (int, float)):
                cells_xml.append(f'<c r="{col_ref}"><v>{val}</v></c>')
            else:
                cells_xml.append(
                    f'<c r="{col_ref}" t="inlineStr"><is><t>{_xml_escape(val)}</t></is></c>'
                )
        sheet_rows_xml.append(f'<row r="{r_idx}">{"".join(cells_xml)}</row>')

    worksheet_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetData>{"".join(sheet_rows_xml)}</sheetData>'
        "</worksheet>"
    )

    content_types_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        "</Types>"
    )

    rels_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        "</Relationships>"
    )

    workbook_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<sheets><sheet name="Katalog_Produk_POS" sheetId="1" r:id="rId1"/></sheets>'
        "</workbook>"
    )

    workbook_rels_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        "</Relationships>"
    )

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml)
        zf.writestr("_rels/.rels", rels_xml)
        zf.writestr("xl/workbook.xml", workbook_xml)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml)
        zf.writestr("xl/worksheets/sheet1.xml", worksheet_xml)
    return buf.getvalue()


def parse_xlsx_bytes(raw_bytes):
    """Parses any standard .xlsx file into a list of dicts."""
    ns = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with zipfile.ZipFile(io.BytesIO(raw_bytes), "r") as zf:
        shared_strings = []
        if "xl/sharedStrings.xml" in zf.namelist():
            ss_root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in ss_root.findall("main:si", ns):
                texts = [t.text or "" for t in si.findall(".//main:t", ns)]
                shared_strings.append("".join(texts))

        sheet_root = ET.fromstring(zf.read("xl/worksheets/sheet1.xml"))
        matrix = []
        for row_el in sheet_root.findall(".//main:sheetData/main:row", ns):
            row_vals = []
            for c_el in row_el.findall("main:c", ns):
                c_type = c_el.attrib.get("t", "")
                val_text = ""
                if c_type == "inlineStr":
                    t_el = c_el.find(".//main:t", ns)
                    val_text = t_el.text if (t_el is not None and t_el.text) else ""
                elif c_type == "s":
                    v_el = c_el.find("main:v", ns)
                    if v_el is not None and v_el.text is not None:
                        idx = int(v_el.text)
                        val_text = shared_strings[idx] if idx < len(shared_strings) else ""
                else:
                    v_el = c_el.find("main:v", ns)
                    val_text = v_el.text if (v_el is not None and v_el.text) else ""
                row_vals.append(val_text.strip())
            if any(row_vals):
                matrix.append(row_vals)

    if len(matrix) < 2:
        return []
    headers = [h.upper().strip() for h in matrix[0]]
    results = []
    for row in matrix[1:]:
        item = {}
        for idx, h in enumerate(headers):
            item[h] = row[idx] if idx < len(row) else ""
        results.append(item)
    return results


def sync_products_to_excel():
    """Writes all products from SQLite pos.db to katalog_produk.xlsx and katalog_produk.csv."""
    conn = get_db()
    products = [dict(r) for r in conn.execute("SELECT * FROM products").fetchall()]
    conn.close()

    # 1. Write .xlsx
    xlsx_bytes = build_xlsx_bytes(products)
    with open(EXCEL_PATH, "wb") as f:
        f.write(xlsx_bytes)

    # 2. Write .csv (UTF-8 with BOM so Excel on Windows opens it cleanly)
    with open(CSV_PATH, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(EXCEL_HEADERS)
        for p in products:
            writer.writerow(
                [
                    p.get("sku", p.get("id", "")),
                    p.get("barcode", ""),
                    p.get("name", ""),
                    p.get("category", "kopi"),
                    p.get("categoryLabel", "Minuman Kopi"),
                    p.get("badge", "REGULAR"),
                    int(float(p.get("hpp", 0))),
                    int(float(p.get("price", 0))),
                    int(p.get("stock", 0)),
                    int(p.get("minStock", 5)),
                    p.get("status", "Aktif"),
                    p.get("note", ""),
                    p.get("image", ""),
                ]
            )


def import_rows_to_db(rows):
    """Upserts product rows from Excel/CSV into SQLite pos.db and re-syncs."""
    conn = get_db()
    cur = conn.cursor()
    default_img = SEED_PRODUCTS[0]["image"]
    upserted = 0

    for r in rows:
        sku = (r.get("SKU") or r.get("ID") or "").strip().upper()
        barcode = (r.get("BARCODE") or "").strip()
        name = (r.get("NAMA_PRODUK") or r.get("NAME") or "").strip()
        if not sku and not barcode and not name:
            continue
        if not sku:
            sku = f"SKU-{100 + upserted}"
        if not barcode:
            barcode = f"899100{1000 + upserted}"

        cat_label = (r.get("KATEGORI_LABEL") or r.get("KATEGORI") or "Minuman Kopi").strip()
        cat_code = (r.get("KATEGORI_KODE") or "").strip().lower()
        if not cat_code:
            if "pastry" in cat_label.lower() or "snack" in cat_label.lower():
                cat_code = "pastry"
            elif "makan" in cat_label.lower():
                cat_code = "makanan"
            else:
                cat_code = "kopi"

        badge = (r.get("BADGE") or "EXCEL").strip()
        hpp = float(r.get("HPP_MODAL") or r.get("HPP") or 10000)
        price = float(r.get("HARGA_JUAL") or r.get("PRICE") or 20000)
        stock = int(float(r.get("STOK") or r.get("STOCK") or 25))
        min_stock = int(float(r.get("MIN_STOK") or 10))
        status = "Kritis" if stock <= min_stock else "Aktif"
        note = (r.get("CATATAN") or r.get("NOTE") or "Tersinkronisasi dari Excel").strip()
        image = (r.get("IMAGE_URL") or "").strip() or default_img

        cur.execute(
            """
            INSERT OR REPLACE INTO products
            (id, sku, barcode, name, category, categoryLabel, badge, hpp, price, stock, minStock, status, note, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (sku, sku, barcode, name, cat_code, cat_label, badge, hpp, price, stock, min_stock, status, note, image),
        )
        upserted += 1

    conn.commit()
    conn.close()
    sync_products_to_excel()
    return upserted


def fetch_full_bootstrap():
    conn = get_db()
    cur = conn.cursor()

    products = [dict(r) for r in cur.execute("SELECT * FROM products").fetchall()]

    trx_rows = cur.execute("SELECT * FROM transactions ORDER BY seq DESC").fetchall()
    transactions = []
    for r in trx_rows:
        d = dict(r)
        d["items"] = json.loads(d.pop("items_json", "[]"))
        d.pop("seq", None)
        transactions.append(d)

    inventory = [dict(r) for r in cur.execute("SELECT * FROM inventory").fetchall()]

    mutations = []
    for r in cur.execute("SELECT time, item, delta, reason FROM inventory_mutations ORDER BY seq DESC LIMIT 20").fetchall():
        mutations.append(dict(r))

    purchase_orders = []
    for r in cur.execute("SELECT id, date, supplier, items, total, status FROM purchase_orders ORDER BY seq DESC").fetchall():
        purchase_orders.append(dict(r))

    cash_drawer = []
    for r in cur.execute("SELECT time, type, label, note, user, amount FROM cash_drawer ORDER BY seq DESC").fetchall():
        cash_drawer.append(dict(r))

    finance_ledger = []
    for r in cur.execute("SELECT date, cat, desc, acc, type, amount FROM finance_ledger ORDER BY seq DESC").fetchall():
        finance_ledger.append(dict(r))

    staff = []
    for r in cur.execute("SELECT name, role, shift, pin, trxCount, status FROM staff ORDER BY seq DESC").fetchall():
        staff.append(dict(r))

    settings = {}
    for r in cur.execute("SELECT key, value FROM settings").fetchall():
        settings[r["key"]] = json.loads(r["value"])

    notifications = []
    for r in cur.execute(
        "SELECT id, title, message, category, severity, time, isRead, actionTab, actionLabel FROM notifications ORDER BY seq DESC"
    ).fetchall():
        d = dict(r)
        d["isRead"] = bool(d["isRead"])
        notifications.append(d)

    auth_user = settings.pop("authUser", SEED_AUTH_USER)

    conn.close()
    return {
        "status": "ok",
        "engine": "SQLite3",
        "database": "pos.db",
        "products": products,
        "transactions": transactions,
        "inventory": inventory,
        "inventoryMutations": mutations,
        "purchaseOrders": purchase_orders,
        "cashDrawer": cash_drawer,
        "financeLedger": finance_ledger,
        "staff": staff,
        "settings": settings,
        "notifications": notifications,
        "authUser": auth_user,
    }


# ==========================================================================
# HTTP REQUEST HANDLER (REST API + STATIC SPA SERVER)
# ==========================================================================
class POSRequestHandler(SimpleHTTPRequestHandler):
    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length <= 0:
            return {}
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw) if raw else {}

    def do_OPTIONS(self):
        self.send_json({"ok": True})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self.send_json({"status": "online", "service": "Jevallene POS SQLite Backend", "timestamp": datetime.now().isoformat()})
            return

        if path == "/api/bootstrap":
            self.send_json(fetch_full_bootstrap())
            return

        if path == "/api/products":
            data = fetch_full_bootstrap()
            self.send_json({"products": data["products"]})
            return

        if path == "/api/transactions":
            data = fetch_full_bootstrap()
            self.send_json({"transactions": data["transactions"]})
            return

        if path == "/api/scan":
            qs = parse_qs(parsed.query)
            code = (qs.get("code", [""])[0] or "").strip()
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM products WHERE LOWER(sku) = LOWER(?) OR barcode = ? OR LOWER(id) = LOWER(?)",
                (code, code, code),
            ).fetchone()
            conn.close()
            if row:
                self.send_json({"ok": True, "found": True, "product": dict(row)})
            else:
                self.send_json({"ok": True, "found": False, "code": code})
            return

        if path == "/api/excel/export":
            sync_products_to_excel()
            qs = parse_qs(parsed.query)
            fmt = (qs.get("format", ["xlsx"])[0] or "xlsx").lower()
            if fmt == "csv":
                with open(CSV_PATH, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/csv; charset=utf-8")
                self.send_header("Content-Disposition", 'attachment; filename="katalog_produk.csv"')
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
                return
            else:
                with open(EXCEL_PATH, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header(
                    "Content-Type",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                )
                self.send_header("Content-Disposition", 'attachment; filename="katalog_produk.xlsx"')
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
                return

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        try:
            body = self.read_json_body()
        except Exception as e:
            self.send_json({"error": f"Invalid JSON: {e}"}, status=400)
            return

        conn = get_db()
        cur = conn.cursor()

        try:
            # 1. POS CHECKOUT -> Create Transaction, Deduct Product Stock, Log Cash Drawer if Tunai
            if path == "/api/checkout":
                cart = body.get("cart", [])
                if not cart:
                    self.send_json({"error": "Keranjang kosong"}, status=400)
                    return

                payment_method = body.get("paymentMethod", "Tunai")
                customer = body.get("customer", "Walk-in (Kasir POS)")
                cashier = body.get("cashier", "Siti Rahma")

                total_qty = 0
                subtotal = 0
                trx_items = []
                summary_parts = []

                for item in cart:
                    pid = item.get("productId")
                    qty = int(item.get("qty", 1))
                    unit_price = float(item.get("unitPrice", 0))
                    note = item.get("note", "Normal")

                    row = cur.execute("SELECT * FROM products WHERE id = ?", (pid,)).fetchone()
                    pname = row["name"] if row else pid
                    if row:
                        new_stock = max(0, int(row["stock"]) - qty)
                        new_status = "Kritis" if new_stock <= int(row["minStock"]) else "Aktif"
                        cur.execute("UPDATE products SET stock = ?, status = ? WHERE id = ?", (new_stock, new_status, pid))

                    total_qty += qty
                    subtotal += qty * unit_price
                    trx_items.append({"name": pname, "qty": qty, "price": unit_price, "note": note})
                    summary_parts.append(f"{pname} x{qty}")

                discount = round(subtotal * 0.10)
                after_disc = subtotal - discount
                tax = round(after_disc * 0.10)
                grand_total = int(((after_disc + tax + 999) // 1000) * 1000)

                count_trx = cur.execute("SELECT COUNT(*) FROM transactions").fetchone()[0]
                next_num = 9478 + count_trx + 1
                new_id = f"#TRX-{next_num}"
                now = datetime.now()
                bon = f"TRX-{now.strftime('%Y%m%d')}-{next_num}"
                time_str = f"{now.strftime('%H:%M')} WIB"

                method_group = (
                    "QRIS"
                    if "QRIS" in payment_method
                    else "Transfer"
                    if "Transfer" in payment_method
                    else "Tunai"
                )

                cur.execute(
                    """
                    INSERT INTO transactions (id, bon, time, customer, itemsSummary, itemCount, method, methodGroup, cashier, total, status, items_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        new_id,
                        bon,
                        time_str,
                        customer,
                        ", ".join(summary_parts),
                        f"{total_qty} item{'s' if total_qty > 1 else ''}",
                        payment_method,
                        method_group,
                        cashier,
                        grand_total,
                        "Selesai",
                        json.dumps(trx_items),
                    ),
                )

                # If paid in cash, also log to cash_drawer
                if method_group == "Tunai":
                    cur.execute(
                        "INSERT INTO cash_drawer (time, type, label, note, user, amount) VALUES (?, ?, ?, ?, ?, ?)",
                        (time_str, "in", "Penjualan Tunai POS", f"Transaksi Kasir {new_id}", cashier, grand_total),
                    )

                # Increment cashier transaction counter
                cur.execute("UPDATE staff SET trxCount = trxCount + 1 WHERE name = ?", (cashier,))

                # Add real-time notification for new POS transaction
                ntf_count = cur.execute("SELECT COUNT(*) FROM notifications").fetchone()[0]
                ntf_id = f"NTF-{101 + ntf_count + 1}"
                cur.execute(
                    """
                    INSERT INTO notifications (id, title, message, category, severity, time, isRead, actionTab, actionLabel)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        ntf_id,
                        f"Transaksi Baru {new_id} Lunas ({payment_method})",
                        f"Pembayaran {customer} sebesar Rp {grand_total:,} ({total_qty} item) berhasil dicetak oleh {cashier}.".replace(",", "."),
                        "Transaksi POS",
                        "success",
                        f"Baru saja ({time_str})",
                        0,
                        "transaksi",
                        f"Lihat Struk {new_id}",
                    ),
                )

                conn.commit()
                conn.close()
                sync_products_to_excel()
                self.send_json({"ok": True, "transactionId": new_id, "grandTotal": grand_total, "state": fetch_full_bootstrap()})
                return

            # 2. INVENTORY ADJUSTMENT (STOCK OPNAME)
            if path == "/api/inventory/adjust":
                item_id = body.get("id")
                new_stock = int(body.get("actualStock", 0))
                reason = body.get("reason", "Penyesuaian Rutin (Stock Opname)")

                row = cur.execute("SELECT * FROM inventory WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Item tidak ditemukan"}, status=404)
                    return

                diff = new_stock - int(row["stock"])
                diff_str = f"+{diff} {row['unit']}" if diff >= 0 else f"{diff} {row['unit']}"
                now_str = f"Hari ini, {datetime.now().strftime('%H:%M')}"

                cur.execute("UPDATE inventory SET stock = ? WHERE id = ?", (new_stock, item_id))
                cur.execute(
                    "INSERT INTO inventory_mutations (time, item, delta, reason) VALUES (?, ?, ?, ?)",
                    (now_str, row["name"], diff_str, reason),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 3. CREATE PURCHASE ORDER
            if path == "/api/purchase-orders":
                supplier = body.get("supplier", "PT Kopi Nusantara Roastery")
                items = body.get("items", "Bahan Baku Gudang")
                total = float(body.get("total", 1500000))

                count_po = cur.execute("SELECT COUNT(*) FROM purchase_orders").fetchone()[0]
                new_id = f"PO-2410-{88 + count_po + 1:03d}"
                cur.execute(
                    "INSERT INTO purchase_orders (id, date, supplier, items, total, status) VALUES (?, ?, ?, ?, ?, ?)",
                    (new_id, "Hari ini", supplier, items, total, "Dikirim"),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "poId": new_id, "state": fetch_full_bootstrap()})
                return

            # 4. RECEIVE PURCHASE ORDER
            if path.startswith("/api/purchase-orders/") and path.endswith("/receive"):
                po_id = path.split("/")[3]
                po_row = cur.execute("SELECT * FROM purchase_orders WHERE id = ?", (po_id,)).fetchone()
                if not po_row:
                    self.send_json({"error": "PO tidak ditemukan"}, status=404)
                    return

                cur.execute("UPDATE purchase_orders SET status = 'Diterima' WHERE id = ?", (po_id,))
                cur.execute("UPDATE inventory SET stock = stock + 10 WHERE id = 'ING-002'")
                cur.execute(
                    "INSERT INTO inventory_mutations (time, item, delta, reason) VALUES (?, ?, ?, ?)",
                    (f"Hari ini, {datetime.now().strftime('%H:%M')}", "Susu UHT Full Cream Diamond (1L)", "+10 Box", f"Penerimaan {po_id}"),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 5. CASH DRAWER ENTRY
            if path == "/api/cash-drawer":
                entry_type = body.get("type", "out")
                amount = float(body.get("amount", 0))
                note = body.get("note", "Operasional Kas")
                user = body.get("user", "Siti Rahma")
                time_str = f"{datetime.now().strftime('%H:%M')} WIB"
                label = "Kas Keluar (Petty)" if entry_type == "out" else "Kas Masuk Laci"

                cur.execute(
                    "INSERT INTO cash_drawer (time, type, label, note, user, amount) VALUES (?, ?, ?, ?, ?, ?)",
                    (time_str, entry_type, label, note, user, amount),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 6. FINANCE LEDGER EXPENSE
            if path == "/api/finance":
                cat = body.get("cat", "Biaya Operasional")
                desc = body.get("desc", "Pengeluaran Toko")
                amount = float(body.get("amount", 0))
                acc = body.get("acc", "BCA Bisnis")
                entry_type = body.get("type", "out")

                cur.execute(
                    "INSERT INTO finance_ledger (date, cat, desc, acc, type, amount) VALUES (?, ?, ?, ?, ?, ?)",
                    ("Hari ini", cat, desc, acc, entry_type, amount),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 7. ADD STAFF MEMBER
            if path == "/api/staff":
                name = body.get("name", "Staf Baru")
                role = body.get("role", "Kasir & Barista")
                shift = body.get("shift", "Shift Pagi (07:30)")
                pin = body.get("pin", "1234")

                cur.execute(
                    "INSERT INTO staff (name, role, shift, pin, trxCount, status) VALUES (?, ?, ?, ?, ?, ?)",
                    (name, role, shift, pin, 0, "Bertugas"),
                )
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 8. SAVE SETTINGS
            if path == "/api/settings":
                for k, v in body.items():
                    cur.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (k, json.dumps(v)))
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 9. NOTIFICATIONS: MARK ONE READ, MARK ALL READ, OR CREATE
            if path == "/api/notifications/read-all":
                cur.execute("UPDATE notifications SET isRead = 1")
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            if path.startswith("/api/notifications/") and path.endswith("/read"):
                ntf_id = path.split("/")[3]
                cur.execute("UPDATE notifications SET isRead = 1 WHERE id = ?", (ntf_id,))
                conn.commit()
                conn.close()
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            # 10. OAUTH 2.0 LOGIN & LOGOUT SESSION
            if path == "/api/auth/oauth":
                provider = body.get("provider", "Google")
                name = body.get("name", "Siti Rahma")
                email = body.get("email", "siti.rahma@jevallene.cloud")
                role = body.get("role", "Owner")
                parts = [p[0].upper() for p in name.split() if p][:2]
                initials = "".join(parts) or "SR"
                now_str = f"Hari ini, {datetime.now().strftime('%H:%M')} WIB"

                auth_user = {
                    "name": name,
                    "email": email,
                    "role": role,
                    "provider": provider,
                    "initials": initials,
                    "branch": "Toko Berkah Utama (JVL-8821)",
                    "verified": True,
                    "lastLogin": now_str,
                }
                cur.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('authUser', ?)", (json.dumps(auth_user),))

                # Log OAuth security notification
                ntf_count = cur.execute("SELECT COUNT(*) FROM notifications").fetchone()[0]
                ntf_id = f"NTF-{101 + ntf_count + 1}"
                cur.execute(
                    """
                    INSERT INTO notifications (id, title, message, category, severity, time, isRead, actionTab, actionLabel)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        ntf_id,
                        f"Login SSO OAuth Berhasil ({provider})",
                        f"Sesi kasir & dashboard diotorisasi untuk {name} ({email}) sebagai {role}.",
                        "Keamanan & Audit",
                        "info",
                        now_str,
                        0,
                        "pengaturan",
                        "Cek Sesi Akun",
                    ),
                )

                conn.commit()
                conn.close()
                self.send_json({"ok": True, "authUser": auth_user, "state": fetch_full_bootstrap()})
                return

            # 11. CREATE OR UPSERT PRODUCT (VIA SKU / BARCODE SCANNER OR FORM) & SYNC TO EXCEL
            if path == "/api/products":
                sku = (body.get("sku") or body.get("id") or "").strip().upper()
                barcode = (body.get("barcode") or "").strip()
                name = (body.get("name") or "").strip()
                if not sku or not name:
                    conn.close()
                    self.send_json({"error": "SKU dan Nama Produk wajib diisi"}, status=400)
                    return
                if not barcode:
                    barcode = f"899100{datetime.now().strftime('%H%M')}"

                cat_label = body.get("categoryLabel", "Minuman Kopi")
                if "pastry" in cat_label.lower() or "snack" in cat_label.lower():
                    cat_code = "pastry"
                elif "makan" in cat_label.lower():
                    cat_code = "makanan"
                else:
                    cat_code = "kopi"

                hpp = float(body.get("hpp", 10000))
                price = float(body.get("price", 22000))
                stock = int(body.get("stock", 25))
                min_stock = int(body.get("minStock", 10))
                status = "Kritis" if stock <= min_stock else "Aktif"
                badge = body.get("badge", "NEW")
                note = body.get("note", "Tersinkronisasi Excel & Barcode")
                image = body.get("image") or SEED_PRODUCTS[0]["image"]

                cur.execute(
                    """
                    INSERT OR REPLACE INTO products
                    (id, sku, barcode, name, category, categoryLabel, badge, hpp, price, stock, minStock, status, note, image)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (sku, sku, barcode, name, cat_code, cat_label, badge, hpp, price, stock, min_stock, status, note, image),
                )
                conn.commit()
                conn.close()
                sync_products_to_excel()
                self.send_json({"ok": True, "sku": sku, "barcode": barcode, "state": fetch_full_bootstrap()})
                return

            # 12. RELOAD FROM DISK EXCEL (.XLSX / .CSV) OR UPLOADED BASE64 EXCEL/CSV
            if path == "/api/excel/sync-from-file":
                b64_data = body.get("base64Data")
                filename = (body.get("filename") or "katalog_produk.xlsx").lower()
                conn.close()

                rows = []
                if b64_data:
                    import base64

                    raw_bytes = base64.b64decode(b64_data)
                    if filename.endswith(".xlsx"):
                        rows = parse_xlsx_bytes(raw_bytes)
                    else:
                        text = raw_bytes.decode("utf-8-sig", errors="replace")
                        reader = csv.DictReader(io.StringIO(text))
                        rows = [{k.upper().strip(): v for k, v in r.items() if k} for r in reader]
                else:
                    if os.path.exists(EXCEL_PATH):
                        with open(EXCEL_PATH, "rb") as f:
                            rows = parse_xlsx_bytes(f.read())
                    elif os.path.exists(CSV_PATH):
                        with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
                            reader = csv.DictReader(f)
                            rows = [{k.upper().strip(): v for k, v in r.items() if k} for r in reader]

                count = import_rows_to_db(rows)
                self.send_json({"ok": True, "importedCount": count, "excelPath": "katalog_produk.xlsx", "state": fetch_full_bootstrap()})
                return

            # 13. RESET DATABASE TO DEMO DEFAULTS
            if path == "/api/reset":
                conn.close()
                init_db(force_reset=True)
                self.send_json({"ok": True, "state": fetch_full_bootstrap()})
                return

            conn.close()
            self.send_json({"error": f"Endpoint POST {path} tidak ditemukan"}, status=404)

        except Exception as e:
            conn.close()
            self.send_json({"error": str(e)}, status=500)

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path
        try:
            body = self.read_json_body()
        except Exception as e:
            self.send_json({"error": f"Invalid JSON: {e}"}, status=400)
            return

        if path.startswith("/api/products/"):
            product_id = path.split("/")[3]
            conn = get_db()
            cur = conn.cursor()
            row = cur.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
            if not row:
                conn.close()
                self.send_json({"error": "Produk tidak ditemukan"}, status=404)
                return

            name = body.get("name", row["name"])
            sku = (body.get("sku", row["sku"]) or row["sku"]).strip().upper()
            barcode = (body.get("barcode", row["barcode"]) or row["barcode"]).strip()
            cat_label = body.get("categoryLabel", row["categoryLabel"])
            hpp = float(body.get("hpp", row["hpp"]))
            price = float(body.get("price", row["price"]))
            stock = int(body.get("stock", row["stock"]))
            min_stock = int(row["minStock"])
            status = "Kritis" if stock <= min_stock else "Aktif"

            cur.execute(
                "UPDATE products SET sku = ?, barcode = ?, name = ?, categoryLabel = ?, hpp = ?, price = ?, stock = ?, status = ? WHERE id = ?",
                (sku, barcode, name, cat_label, hpp, price, stock, status, product_id),
            )
            conn.commit()
            conn.close()
            sync_products_to_excel()
            self.send_json({"ok": True, "state": fetch_full_bootstrap()})
            return

        self.send_json({"error": f"Endpoint PUT {path} tidak ditemukan"}, status=404)


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    init_db(force_reset=False)
    server = ThreadingHTTPServer(("0.0.0.0", PORT), POSRequestHandler)
    print(f"[Jevallene POS Backend] Running on http://localhost:{PORT} (Database: {DB_PATH})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.server_close()
