# Jevallene Kasir

Aplikasi kasir (POS) untuk UMKM kafe & resto dengan tema **Dark Neon** dan **Light Mode Soft Pink & White**.

## Fitur

- Dashboard penjualan, Kasir (POS) dengan scan Barcode / SKU (tekan Enter)
- Produk & kalkulator HPP / margin, input barang baru via scan
- Transaksi + preview struk thermal 80mm
- Inventori & stock opname, Pembelian (PO supplier), Kas Harian, Keuangan, Laporan Laba Rugi
- Karyawan & PIN kasir, Pusat Notifikasi (tandai telah dibaca), login OAuth (demo)
- Sinkronisasi 2 arah database ↔ Excel (`katalog_produk.xlsx` / `.csv`)
- Dark / Light mode (tersimpan di browser)

## Menjalankan secara lokal (dengan backend SQLite + Excel)

```bash
python server.py
# buka http://localhost:8080
```

`server.py` hanya memakai library standar Python (tanpa `pip install`). Database `pos.db` dibuat otomatis.

## Deploy di Vercel

Versi Vercel berjalan sebagai situs statis. Backend Python (`server.py`) tidak ikut di-deploy,
jadi aplikasi otomatis memakai mode offline: data disimpan di `localStorage` browser.
Fitur yang butuh server (sinkronisasi Excel, download `.xlsx`, data bersama antar perangkat)
hanya aktif saat dijalankan lewat `python server.py`.
