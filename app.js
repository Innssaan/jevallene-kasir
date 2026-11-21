// ==========================================================================
// Jevallene POS — Interactive Frontend State & Business Logic
// ==========================================================================

const PRODUCTS = [
  {
    id: 'KOP-011',
    sku: 'KOP-011',
    barcode: '8991001201',
    name: 'Es Kopi Susu Gula Aren',
    category: 'kopi',
    categoryLabel: 'Minuman Kopi',
    badge: 'BEST',
    hpp: 8500,
    price: 22000,
    stock: 42,
    minStock: 10,
    status: 'Aktif',
    note: 'Extra Shot Espresso (+Rp 3.000)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcBrds6NncVIFBSgdMKe33DWU9h62fYO3htWt52zs1oIq3w3Ij0fj71sPPoavofMdpxef3As_u9GbPIi-EuqN6GPnMZTfods0mtwrTDt42UYBjyvEXoDtHXteSOUgT1O6yDkqfQWL3h7cSegw7tWXm1wzw2CO_BN7DVv7s7ZT9D2I0sYnxQ1lp-7pz1OoDxIg31eRSpqW5KIzUgtKQR9J0PQoRgVOHYQt1S3MTP8I'
  },
  {
    id: 'PST-004',
    sku: 'PST-004',
    barcode: '8991001402',
    name: 'Croissant Butter Paris',
    category: 'pastry',
    categoryLabel: 'Snack & Pastry',
    badge: 'PASTRY',
    hpp: 12000,
    price: 28000,
    stock: 18,
    minStock: 8,
    status: 'Aktif',
    note: 'Warm toasted / Hangat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAihN1plaWwL5JS_3Kt0NMbeeGbrSjy2VEBVyafEeTZk8w9z1Fcp0JPn33gefeiPMIxHiYMNO7U7cZZiLUcrdfIhUAWhUYmWq0kTHoZCPpJodZOZDOkclDmP4C0TubQ8rB5yd9Mg4Zllb8BvkUn8lKHY99OlgwAm4rGrtShu-zLQc3FdU6AFlNlCm424XXaGEMIzVRZXe-ijhEuyYhTeE2CX4Q77QjnloKp6IwLiTs'
  },
  {
    id: 'NCF-020',
    sku: 'NCF-020',
    barcode: '8991001882',
    name: 'Matcha Latte Oat',
    category: 'kopi',
    categoryLabel: 'Minuman Non-Kopi',
    badge: 'NON-COFFEE',
    hpp: 14000,
    price: 32000,
    stock: 24,
    minStock: 10,
    status: 'Aktif',
    note: 'Less Sugar 50%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9EyY-po9ALQVUlh_a9EPG-S-URavOSeT5Dym_COd2W2Ug2ksXVQBGGpblOMlBjCiW2olxxUpMr3vDvP-8vo9GGn-0__kzkD5l3Kr9T-R1zAXjro-wNkGE_KL9W3kgBmSsOsdubW-7g_dE2njw5Wq2mv3DDWE8nhVmWl8UkR9OcCREdLwBk3uKqlB7DiLkGDTMyhHMBe-Kns7iFsDwaN3mIdd2YjFpOPBgv0w4mw'
  },
  {
    id: 'MKN-005',
    sku: 'MKN-005',
    barcode: '8991001923',
    name: 'Ayam Geprek Sambal Korek',
    category: 'makanan',
    categoryLabel: 'Makanan Utama',
    badge: 'SPICY',
    hpp: 13500,
    price: 26000,
    stock: 4,
    minStock: 10,
    status: 'Kritis',
    note: 'Level Pedas Sedang',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1tAiEmgeN_5-W1H99_AEwlsgtaGZh3nkoxFjYEDuVbDqa4mLDtyIP88jYKZrqNY8iUrToe9aXuv6hXB_lHmY7jC1q8Lm8tMzAWOyV83YyaNVVnZzJqc_l_zsrVd7XWI6w-1MMh-6_teHYp-Qb0iOVNd96402hKhwQLYvThyFcywQOJUeG_xc4jhLHTVk69V418GJKJsL91sGVqt-vnn5g5HmteQ0DFCPnTV6_lS4'
  },
  {
    id: 'MKN-018',
    sku: 'MKN-018',
    barcode: '8991001550',
    name: 'Mie Goreng Spesial Toko',
    category: 'makanan',
    categoryLabel: 'Makanan Utama',
    badge: 'MAKANAN',
    hpp: 11000,
    price: 25000,
    stock: 31,
    minStock: 10,
    status: 'Aktif',
    note: 'Telur Mata Sapi Setengah Matang',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyOt46Mh1mZOSSQVeB-L4fNegcW4SMdVnMmSWRK4pTnf86h58buc0MEwI236F-IFmMo01eKQC8IoJeEGQMRzzt-a9eh2yfnHVe0K8YwQgkPRiLpEVrgu-2kCInAJX8Soxl51ToUIrkaqddgmnFANDgFCUgRXv2COhembdUXxPQNoc91f4PNMbk5kE1B-v-zPRRjeJvB_APSkqmNTUeh-uP5AkLSH-10myrYn5IE_M'
  },
  {
    id: 'KOP-002',
    sku: 'KOP-002',
    barcode: '8991001610',
    name: 'Americano Double Shot',
    category: 'kopi',
    categoryLabel: 'Minuman Kopi',
    badge: 'CLASSIC',
    hpp: 6500,
    price: 18000,
    stock: 55,
    minStock: 10,
    status: 'Aktif',
    note: 'Arabika House Blend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0fbzo5dOqFoSEkecF4H7wqJehQm11J68o1EXE5-zjNs50ct0KNraGVYRQOTQ6GMAukTfKDvwQYvg25sCwfLgZKrUjgS4A1KXQLWLwRs5xL-2OUbnQk8gIzGGTP9KNNwMIIMKFMoI1IoO9CO4ZEKX11ucda3dagKyCj0W1xke2qlpJpPeHwEuhVBNB0maVo9hzSDiKo8-8L3fXfvTQKkMg72zecZYwAA4Oav-gfps'
  }
];

let cart = [
  { productId: 'KOP-011', qty: 2, unitPrice: 25000, note: 'Extra Shot Espresso (+Rp 3.000)' },
  { productId: 'PST-004', qty: 1, unitPrice: 28000, note: 'Warm toasted / Hangat' },
  { productId: 'NCF-020', qty: 1, unitPrice: 32000, note: 'Less Sugar 50%' }
];

let activePosCategory = 'all';
let selectedPaymentMethod = 'Tunai';
let cashTendered = 150000;
let activeQuickEditProductId = 'KOP-011';

const TRANSACTIONS = [
  {
    id: '#TRX-9482',
    bon: 'TRX-20241024-9482',
    time: '14:32 WIB',
    customer: 'Walk-in (Takeaway)',
    itemsSummary: 'Es Kopi Susu x2, Croissant x1',
    itemCount: '3 items',
    method: 'QRIS BCA',
    methodGroup: 'QRIS',
    cashier: 'Siti Rahma',
    total: 78000,
    status: 'Selesai',
    items: [
      { name: 'Es Kopi Susu Jevallene', qty: 2, price: 22000, note: 'Less Sugar' },
      { name: 'Croissant Butter Paris', qty: 1, price: 28000, note: 'Heated' },
      { name: 'Paper Bag Takeaway', qty: 1, price: 6000, note: 'Packaging' }
    ]
  },
  {
    id: '#TRX-9481',
    bon: 'TRX-20241024-9481',
    time: '14:15 WIB',
    customer: 'Meja 02 (Dine-in)',
    itemsSummary: 'Ayam Geprek x2,Americano x2',
    itemCount: '4 items',
    method: 'Tunai',
    methodGroup: 'Tunai',
    cashier: 'Siti Rahma',
    total: 88000,
    status: 'Selesai',
    items: [
      { name: 'Ayam Geprek Sambal Korek', qty: 2, price: 26000, note: 'Pedas Normal' },
      { name: 'Americano Double Shot', qty: 2, price: 18000, note: 'Iced' }
    ]
  },
  {
    id: '#TRX-9480',
    bon: 'TRX-20241024-9480',
    time: '13:50 WIB',
    customer: 'Meja 07 (Dine-in)',
    itemsSummary: 'Matcha Latte Oat x2',
    itemCount: '2 items',
    method: 'QRIS GoPay',
    methodGroup: 'QRIS',
    cashier: 'Budi Santoso',
    total: 64000,
    status: 'Refund',
    items: [
      { name: 'Matcha Latte Oat', qty: 2, price: 32000, note: 'Refund: Salah Input Pesanan' }
    ]
  },
  {
    id: '#TRX-9479',
    bon: 'TRX-20241024-9479',
    time: '13:42 WIB',
    customer: 'GoFood Pickup (Driver Agus)',
    itemsSummary: 'Mie Goreng Spesial x4, Kopi Susu x2',
    itemCount: '6 items',
    method: 'Transfer BCA',
    methodGroup: 'Transfer',
    cashier: 'Siti Rahma',
    total: 144000,
    status: 'Selesai',
    items: [
      { name: 'Mie Goreng Spesial Toko', qty: 4, price: 25000, note: 'Takeaway Box' },
      { name: 'Es Kopi Susu Gula Aren', qty: 2, price: 22000, note: 'Normal Sugar' }
    ]
  },
  {
    id: '#TRX-9478',
    bon: 'TRX-20241024-9478',
    time: '13:10 WIB',
    customer: 'Walk-in (Dine-in Bar)',
    itemsSummary: 'Americano Double Shot x1',
    itemCount: '1 item',
    method: 'QRIS Mandiri',
    methodGroup: 'QRIS',
    cashier: 'Budi Santoso',
    total: 18000,
    status: 'Selesai',
    items: [
      { name: 'Americano Double Shot', qty: 1, price: 18000, note: 'Hot Cup' }
    ]
  }
];

let selectedTrxId = '#TRX-9482';
let activeOrderNumber = 1;
const STORAGE_KEY_PRODUCTS = 'jevallene_pos_products_v1';
const STORAGE_KEY_TRANSACTIONS = 'jevallene_pos_transactions_v1';

function applyBackendState(data) {
  if (!data) return;
  if (Array.isArray(data.products)) {
    PRODUCTS.splice(0, PRODUCTS.length, ...data.products);
  }
  if (Array.isArray(data.transactions)) {
    TRANSACTIONS.splice(0, TRANSACTIONS.length, ...data.transactions);
    if (TRANSACTIONS.length > 0 && !TRANSACTIONS.some((t) => t.id === selectedTrxId)) {
      selectedTrxId = TRANSACTIONS[0].id;
    }
  }
  if (Array.isArray(data.inventory)) {
    INVENTORY_ITEMS.splice(0, INVENTORY_ITEMS.length, ...data.inventory);
  }
  if (Array.isArray(data.inventoryMutations)) {
    INVENTORY_MUTATIONS.splice(0, INVENTORY_MUTATIONS.length, ...data.inventoryMutations);
  }
  if (Array.isArray(data.purchaseOrders)) {
    PURCHASE_ORDERS.splice(0, PURCHASE_ORDERS.length, ...data.purchaseOrders);
  }
  if (Array.isArray(data.cashDrawer)) {
    CASH_DRAWER_LOGS.splice(0, CASH_DRAWER_LOGS.length, ...data.cashDrawer);
  }
  if (Array.isArray(data.financeLedger)) {
    FINANCE_LEDGER.splice(0, FINANCE_LEDGER.length, ...data.financeLedger);
  }
  if (Array.isArray(data.staff)) {
    STAFF_MEMBERS.splice(0, STAFF_MEMBERS.length, ...data.staff);
  }
  if (Array.isArray(data.notifications)) {
    NOTIFICATIONS.splice(0, NOTIFICATIONS.length, ...data.notifications);
    if (NOTIFICATIONS.length > 0 && !NOTIFICATIONS.some((n) => n.id === selectedNotifId)) {
      selectedNotifId = NOTIFICATIONS[0].id;
    }
  }
  if (data.authUser) {
    currentAuthUser = data.authUser;
    renderAuthUserUI();
  }
  if (data.settings) {
    const s = data.settings;
    if (s.storeName && document.getElementById('setStoreName')) document.getElementById('setStoreName').value = s.storeName;
    if (s.branchName && document.getElementById('setBranchName')) document.getElementById('setBranchName').value = s.branchName;
    if (s.storeAddr && document.getElementById('setStoreAddr')) document.getElementById('setStoreAddr').value = s.storeAddr;
    if (s.storePhone && document.getElementById('setStorePhone')) document.getElementById('setStorePhone').value = s.storePhone;
    if (s.taxRate !== undefined && document.getElementById('setTaxRate')) document.getElementById('setTaxRate').value = s.taxRate;
    if (s.promoRate !== undefined && document.getElementById('setPromoRate')) document.getElementById('setPromoRate').value = s.promoRate;
    if (s.receiptFooter && document.getElementById('setReceiptFooter')) document.getElementById('setReceiptFooter').value = s.receiptFooter;
  }

  renderPosCatalog();
  renderCart();
  renderProductAdminTable();
  renderTransactionsTable();
  renderInventoryTable();
  renderPurchaseOrdersTable();
  renderCashDrawerTable();
  renderFinanceLedger();
  renderStaffTable();
  renderNotificationsView();
  renderAuthUserUI();

  const navTrxBadge = document.querySelector('#sidebar-nav [data-nav="transaksi"] span:last-child');
  if (navTrxBadge) {
    navTrxBadge.textContent = String(184 + Math.max(0, TRANSACTIONS.length - 5));
  }
}

async function syncFromBackend() {
  try {
    const res = await fetch('/api/bootstrap');
    if (res.ok) {
      const data = await res.json();
      applyBackendState(data);
      return true;
    }
  } catch (err) {
    console.warn('Backend API unreachable, falling back to localStorage:', err);
  }
  return false;
}

function loadPersistedState() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        PRODUCTS.splice(0, PRODUCTS.length, ...parsed);
      }
    }
    const savedTrx = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    if (savedTrx) {
      const parsedTrx = JSON.parse(savedTrx);
      if (Array.isArray(parsedTrx) && parsedTrx.length > 0) {
        TRANSACTIONS.splice(0, TRANSACTIONS.length, ...parsedTrx);
        selectedTrxId = TRANSACTIONS[0].id;
      }
    }
  } catch (err) {
    console.warn('Failed to load persisted POS state:', err);
  }
}

function savePersistedState() {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(PRODUCTS));
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(TRANSACTIONS));
  } catch (err) {
    console.warn('Failed to save persisted POS state:', err);
  }
}

// Helper: Format Rupiah with non-breaking space
function formatRp(amount) {
  const formatted = Math.abs(Math.round(amount)).toLocaleString('id-ID');
  return (amount < 0 ? '-Rp\u00A0' : 'Rp\u00A0') + formatted;
}

// View Switcher (SPA Navigation)
function switchView(viewName) {
  const views = [
    'dashboard',
    'kasir',
    'produk',
    'transaksi',
    'inventori',
    'pembelian',
    'kasharian',
    'keuangan',
    'laporan',
    'karyawan',
    'notifikasi',
    'pengaturan'
  ];
  views.forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove('hidden');
        el.classList.add('active-view');
      } else {
        el.classList.add('hidden');
        el.classList.remove('active-view');
      }
    }
  });

  // Update sidebar active state
  document.querySelectorAll('#sidebar-nav [data-nav]').forEach((btn) => {
    if (btn.getAttribute('data-nav') === viewName) {
      btn.classList.add('active-nav');
    } else {
      btn.classList.remove('active-nav');
    }
  });

  // Update header tabs active state
  document.querySelectorAll('[data-header-tab]').forEach((btn) => {
    if (btn.getAttribute('data-header-tab') === viewName) {
      btn.classList.add('active-tab');
    } else {
      btn.classList.remove('active-tab');
    }
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar || !backdrop) return;
  const isHidden = sidebar.classList.contains('-translate-x-full');
  if (isHidden) {
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  } else {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  }
}

// ==========================================================================
// DASHBOARD CHART INTERACTIVITY & ANIMATIONS
// ==========================================================================
function initChartTooltips() {
  const bars = document.querySelectorAll('#chart-bars-group .chart-bar');
  const tooltip = document.getElementById('chart-tooltip');
  const tooltipHour = document.getElementById('tooltip-hour');
  const tooltipVal = document.getElementById('tooltip-val');

  bars.forEach((bar) => {
    bar.addEventListener('mouseenter', () => {
      if (!tooltip) return;
      tooltipHour.textContent = bar.getAttribute('data-hour') || '';
      tooltipVal.textContent = bar.getAttribute('data-sales') || '';
      tooltip.classList.remove('hidden');
    });
    bar.addEventListener('mouseleave', () => {
      if (!tooltip) return;
      tooltip.classList.add('hidden');
    });
  });
}

function switchChartPeriod(period, btnEl) {
  document.querySelectorAll('.period-tab').forEach((b) => {
    b.className = 'period-tab px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all';
  });
  btnEl.className = 'period-tab active-period px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-sm transition-all';

  const subtitle = document.getElementById('chart-subtitle');
  const datasets = {
    today: {
      subtitle: 'Rentang operasional hari ini (08:00 - 21:00 WIB) — Arahkan kursor ke balok grafik untuk detail',
      heights: [50, 70, 85, 120, 186, 172, 115, 80, 100, 125, 166, 150, 65]
    },
    '7d': {
      subtitle: 'Tren penjualan 7 hari terakhir (Rata-rata harian Rp 13.920.000)',
      heights: [75, 95, 110, 140, 175, 190, 130, 105, 120, 145, 182, 165, 95]
    },
    '30d': {
      subtitle: 'Kumulatif performa jam operasional bulan Oktober 2024 (+22.4% MoM)',
      heights: [65, 85, 105, 135, 195, 180, 125, 95, 115, 135, 176, 160, 80]
    }
  };

  const config = datasets[period] || datasets.today;
  if (subtitle) subtitle.textContent = config.subtitle;

  const bars = document.querySelectorAll('#chart-bars-group .chart-bar');
  bars.forEach((bar, idx) => {
    const h = config.heights[idx] || 80;
    const y = 210 - h;
    bar.setAttribute('height', h);
    bar.setAttribute('y', y);
    // Re-trigger grow animation
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = '';
  });
}

function highlightDonut(pct, label) {
  const pctEl = document.getElementById('donut-center-pct');
  const lblEl = document.getElementById('donut-center-label');
  if (pctEl) pctEl.textContent = pct;
  if (lblEl) lblEl.textContent = label;
}

function restockItem(btn, itemName) {
  btn.textContent = '✓ PO Terkirim';
  btn.classList.remove('bg-primary-container', 'text-on-primary-container');
  btn.classList.add('bg-tertiary-container/30', 'text-tertiary', 'border', 'border-tertiary/40');
  showToast(`Permintaan restok cepat untuk "${itemName}" berhasil dikirim ke gudang!`);
}

// ==========================================================================
// KASIR (POS) CATALOG & CART LOGIC
// ==========================================================================
function renderPosCatalog() {
  const grid = document.getElementById('pos-product-grid');
  if (!grid) return;

  const query = (document.getElementById('posSearchInput')?.value || '').toLowerCase().trim();

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activePosCategory === 'all' || p.category === activePosCategory;
    const matchQuery = !query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query) || p.barcode.includes(query);
    return matchCat && matchQuery;
  });

  grid.innerHTML = filtered
    .map((p) => {
      const isLow = p.stock <= p.minStock;
      const stockDotClass = isLow ? 'bg-amber-400' : 'bg-tertiary';
      const stockTextClass = isLow ? 'text-amber-300' : 'text-tertiary';
      const stockLabel = isLow ? `Stok: ${p.stock} (Menipis)` : `Stok: ${p.stock}`;

      return `
      <div onclick="addToCart('${p.id}')" class="group relative flex flex-col justify-between rounded-xl bg-surface-container-lowest border border-outline-variant/25 hover:border-primary-container p-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_24px_-2px_rgba(252,75,155,0.28)] cursor-pointer">
        <div class="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-2.5">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${p.name}" src="${p.image}" />
          <div class="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/30">
            <span class="w-1.5 h-1.5 rounded-full ${stockDotClass}"></span>
            <span class="font-label-sm text-label-sm ${stockTextClass} font-bold tabular-nums">${stockLabel}</span>
          </div>
          <span class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-surface-container-high/90 text-on-surface-variant font-label-sm text-label-sm">${p.badge}</span>
        </div>
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <p class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">SKU: ${p.sku}</p>
            <h3 class="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-bold group-hover:text-primary transition-colors">${p.name}</h3>
          </div>
          <div class="mt-2.5 flex items-center justify-between pt-2 border-t border-outline-variant/15">
            <div>
              <span class="font-label-sm text-label-sm text-outline">Harga</span>
              <p class="font-currency-tile text-currency-tile text-primary font-bold tabular-nums">${formatRp(p.price)}</p>
            </div>
            <button type="button" class="btn-primary-neon w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary-container text-on-surface group-hover:text-on-primary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>
      </div>`;
    })
    .join('');
}

function setPosCategory(cat, btnEl) {
  activePosCategory = cat;
  document.querySelectorAll('#pos-category-pills .pos-cat-btn').forEach((b) => {
    b.className = 'pos-cat-btn px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/25 text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap';
  });
  btnEl.className = 'pos-cat-btn active-cat px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold whitespace-nowrap shadow-[0_0_12px_rgba(252,75,155,0.35)]';
  renderPosCatalog();
}

function filterPosCatalog() {
  renderPosCatalog();
}

async function handlePosBarcodeKeydown(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('posSearchInput');
  const code = (input?.value || '').trim();
  if (!code) return;
  e.preventDefault();

  // 1. Exact match by Barcode or SKU locally
  let matched = PRODUCTS.find(
    (p) => p.barcode === code || p.sku.toLowerCase() === code.toLowerCase() || p.id.toLowerCase() === code.toLowerCase()
  );

  // 2. Fallback: query backend /api/scan or single filtered item
  if (!matched) {
    try {
      const res = await fetch(`/api/scan?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.product) {
          matched = data.product;
        }
      }
    } catch (err) {
      console.warn('Scan lookup fallback:', err);
    }
  }

  if (!matched) {
    const partial = PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(code.toLowerCase()) || p.sku.toLowerCase().includes(code.toLowerCase()) || p.barcode.includes(code)
    );
    if (partial.length === 1) matched = partial[0];
  }

  if (matched) {
    addToCart(matched.id);
    if (input) {
      input.value = '';
      renderPosCatalog();
      input.focus();
    }
    showToast(`✓ Barcode / SKU [${matched.sku} • ${matched.barcode}] terdeteksi → +1 ${matched.name}`);
  } else {
    showToast(`Kode Barcode / SKU "${code}" belum terdaftar. Silakan scan di tab Produk untuk input barang baru.`);
  }
}

function clearPosSearch() {
  const input = document.getElementById('posSearchInput');
  if (input) {
    input.value = '';
    renderPosCatalog();
    input.focus();
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      productId: product.id,
      qty: 1,
      unitPrice: product.price,
      note: product.note
    });
  }
  renderCart();
  showToast(`+1 ${product.name} ditambahkan ke keranjang`);
}

function updateCartQty(productId, delta) {
  const idx = cart.findIndex((i) => i.productId === productId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
  showToast('Keranjang kasir dikosongkan');
}

function renderCart() {
  const container = document.getElementById('pos-cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="h-48 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-outline-variant/30 text-outline">
        <span class="material-symbols-outlined text-[32px] mb-1 opacity-60">shopping_basket</span>
        <p class="font-label-md text-label-md font-semibold">Keranjang Masih Kosong</p>
        <p class="font-label-sm text-label-sm mt-0.5">Klik kartu produk di sebelah kiri atau scan barcode</p>
      </div>`;
  } else {
    container.innerHTML = cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId) || { name: item.productId };
        const lineTotal = item.qty * item.unitPrice;
        return `
        <div class="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/15 hover:border-outline-variant/40 transition-colors">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h4 class="font-label-lg text-label-lg text-on-surface font-bold truncate">${product.name}</h4>
              <p class="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-0.5 truncate">
                <span class="material-symbols-outlined text-[12px]">tune</span>
                <span class="truncate">${item.note}</span>
              </p>
              <span class="font-label-sm text-label-sm text-outline tabular-nums">@ ${formatRp(item.unitPrice)}</span>
            </div>
            <span class="font-currency-tile text-currency-tile text-on-surface font-bold whitespace-nowrap tabular-nums">${formatRp(lineTotal)}</span>
          </div>
          <div class="mt-2 pt-2 border-t border-outline-variant/10 flex items-center justify-between">
            <div class="flex items-center gap-1">
              <button type="button" onclick="updateCartQty('${item.productId}', -1)" class="btn-interactive w-7 h-7 rounded-md bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[14px]">remove</span>
              </button>
              <span class="w-8 text-center font-label-md text-label-md font-bold text-on-surface tabular-nums">${item.qty}</span>
              <button type="button" onclick="updateCartQty('${item.productId}', 1)" class="btn-interactive w-7 h-7 rounded-md bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[14px]">add</span>
              </button>
            </div>
            <button type="button" onclick="updateCartQty('${item.productId}', -99)" class="btn-interactive text-outline hover:text-error p-1 rounded-md" title="Hapus Item">
              <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>`;
      })
      .join('');
  }

  // Calculate Totals
  const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cart.reduce((acc, i) => acc + i.qty * i.unitPrice, 0);
  const discount = Math.round(subtotal * 0.1);
  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * 0.1);
  const grandTotal = Math.ceil((afterDiscount + tax) / 1000) * 1000;

  const subLbl = document.getElementById('cart-subtotal-label');
  const subVal = document.getElementById('cart-subtotal-val');
  const discVal = document.getElementById('cart-discount-val');
  const taxVal = document.getElementById('cart-tax-val');
  const totVal = document.getElementById('cart-total-val');
  const btnBadge = document.getElementById('checkout-btn-badge');
  const changeVal = document.getElementById('cart-change-val');

  if (subLbl) subLbl.textContent = `Subtotal (${totalQty} Item)`;
  if (subVal) subVal.textContent = formatRp(subtotal);
  if (discVal) discVal.textContent = '-' + formatRp(discount);
  if (taxVal) taxVal.textContent = formatRp(tax);
  if (totVal) totVal.textContent = formatRp(grandTotal);
  if (btnBadge) btnBadge.textContent = formatRp(grandTotal);

  const effectiveTendered = cashTendered === 'pas' ? grandTotal : Math.max(cashTendered, grandTotal);
  const change = Math.max(0, effectiveTendered - grandTotal);
  if (changeVal) changeVal.textContent = `Kembalian: ${formatRp(change)}`;
}

function selectPaymentMethod(method, btnEl) {
  selectedPaymentMethod = method;
  document.querySelectorAll('#payment-method-grid .pay-method-btn').forEach((b) => {
    b.className = 'pay-method-btn btn-interactive py-1.5 px-2 rounded-lg bg-surface-container-high border border-outline-variant/25 text-on-surface font-label-md text-label-md flex items-center justify-center gap-1';
  });
  btnEl.className = 'pay-method-btn active-pay btn-interactive py-1.5 px-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(252,75,155,0.4)]';
}

function setCashTendered(amount, btnEl) {
  cashTendered = amount;
  document.querySelectorAll('#cash-denom-pills .denom-pill').forEach((b) => {
    b.className = 'denom-pill btn-interactive px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-sm text-label-sm whitespace-nowrap tabular-nums';
  });
  btnEl.className = 'denom-pill active-denom btn-interactive px-2.5 py-1 rounded-full bg-primary-container/20 border border-primary text-primary font-label-sm text-label-sm font-bold whitespace-nowrap shadow-[0_0_8px_rgba(252,75,155,0.3)] tabular-nums';
  renderCart();
}

function switchActiveOrder(orderNum, btnEl) {
  activeOrderNumber = orderNum;
  document.querySelectorAll('.order-tab').forEach((b) => {
    b.className = 'order-tab btn-interactive group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 text-on-surface-variant hover:text-on-surface text-label-md font-label-md shrink-0';
  });
  btnEl.className = 'order-tab btn-interactive group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-primary-container text-on-surface text-label-md font-label-md shadow-[0_0_12px_rgba(252,75,155,0.25)] shrink-0';
  const titleEl = document.getElementById('cart-order-title');
  if (titleEl) titleEl.textContent = orderNum === 1 ? 'Order #TRX-0492' : 'Order #TRX-0493 (Meja 2)';
  showToast(`Berpindah ke Order #0${orderNum}`);
}

async function processCheckout() {
  if (cart.length === 0) {
    showToast('Tambahkan minimal 1 produk sebelum melakukan pembayaran!');
    return;
  }

  const customer = activeOrderNumber === 2 ? 'Meja 02 (Dine-in)' : 'Walk-in (Kasir POS)';
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        paymentMethod: selectedPaymentMethod,
        customer,
        cashier: 'Siti Rahma'
      })
    });
    if (res.ok) {
      const result = await res.json();
      cart = [];
      selectedTrxId = result.transactionId;
      applyBackendState(result.state);
      savePersistedState();
      showToast(`Pembayaran ${selectedPaymentMethod} (${formatRp(result.grandTotal)}) BERHASIL! Tercatat di DB sebagai ${result.transactionId}`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/checkout fallback to local:', err);
  }

  // Fallback local calculation if offline
  const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cart.reduce((acc, i) => acc + i.qty * i.unitPrice, 0);
  const discount = Math.round(subtotal * 0.1);
  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * 0.1);
  const grandTotal = Math.ceil((afterDiscount + tax) / 1000) * 1000;

  const trxItems = [];
  const summaryParts = [];
  cart.forEach((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.qty);
      product.status = product.stock <= product.minStock ? 'Kritis' : 'Aktif';
      trxItems.push({
        name: product.name,
        qty: item.qty,
        price: item.unitPrice,
        note: item.note || 'Normal'
      });
      summaryParts.push(`${product.name} x${item.qty}`);
    }
  });

  const nextNum = 9483 + Math.max(0, TRANSACTIONS.length - 5);
  const newId = `#TRX-${nextNum}`;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const methodGroup = selectedPaymentMethod.includes('QRIS')
    ? 'QRIS'
    : selectedPaymentMethod.includes('Transfer')
    ? 'Transfer'
    : 'Tunai';

  const newTrx = {
    id: newId,
    bon: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${nextNum}`,
    time: `${hh}:${mm} WIB`,
    customer,
    itemsSummary: summaryParts.join(', '),
    itemCount: `${totalQty} item${totalQty > 1 ? 's' : ''}`,
    method: selectedPaymentMethod,
    methodGroup: methodGroup,
    cashier: 'Siti Rahma',
    total: grandTotal,
    status: 'Selesai',
    items: trxItems
  };

  TRANSACTIONS.unshift(newTrx);
  selectedTrxId = newId;
  cart = [];

  savePersistedState();
  renderCart();
  renderPosCatalog();
  renderProductAdminTable();
  renderTransactionsTable();
  showToast(`Pembayaran ${selectedPaymentMethod} (${formatRp(grandTotal)}) BERHASIL! Tercatat sebagai ${newId}`);
}

// ==========================================================================
// PRODUK & HPP MARGIN CALCULATOR LOGIC
// ==========================================================================
function renderProductAdminTable() {
  const tbody = document.getElementById('product-admin-tbody');
  if (!tbody) return;
  const q = (document.getElementById('productTableSearch')?.value || '').toLowerCase().trim();

  const list = PRODUCTS.filter((p) => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));

  tbody.innerHTML = list
    .map((p) => {
      const marginPct = (((p.price - p.hpp) / p.price) * 100).toFixed(1);
      const isSelected = p.id === activeQuickEditProductId;
      const isCritical = p.stock <= p.minStock;
      const rowBg = isSelected ? 'bg-primary/10' : 'hover:bg-surface-container/60';

      return `
      <tr onclick="selectProductForQuickEdit('${p.id}')" class="${rowBg} transition-colors cursor-pointer">
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <img class="w-10 h-10 rounded-xl object-cover shadow-md shrink-0" alt="${p.name}" src="${p.image}" />
            <div class="min-w-0">
              <p class="font-label-lg text-label-lg font-bold text-on-surface truncate">${p.name}</p>
              <span class="font-label-sm text-label-sm ${isSelected ? 'text-primary font-semibold' : 'text-outline'}">${p.badge}</span>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-3 font-mono">
          <span class="font-label-sm text-label-sm text-on-surface block font-semibold">${p.sku}</span>
          <span class="font-label-sm text-label-sm text-outline">${p.barcode}</span>
        </td>
        <td class="py-3.5 px-3">
          <span class="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant">${p.categoryLabel}</span>
        </td>
        <td class="py-3.5 px-3 text-right font-mono font-label-md text-label-md text-outline tabular-nums">${formatRp(p.hpp)}</td>
        <td class="py-3.5 px-3 text-right font-mono font-label-md text-label-md text-on-surface font-bold tabular-nums">${formatRp(p.price)}</td>
        <td class="py-3.5 px-3 text-center">
          <span class="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-bold tabular-nums">${marginPct}%</span>
        </td>
        <td class="py-3.5 px-3">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${isCritical ? 'bg-secondary animate-pulse' : 'bg-tertiary'}"></span>
            <span class="font-label-md text-label-md font-semibold ${isCritical ? 'text-secondary' : 'text-on-surface'} tabular-nums">${p.stock} Pcs</span>
          </div>
          <span class="font-label-sm text-label-sm ${isCritical ? 'text-secondary' : 'text-outline'}">${isCritical ? 'Stok Menipis' : 'Aman'}</span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <button type="button" class="btn-interactive p-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary-container hover:text-on-primary-container">
            <span class="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </td>
      </tr>`;
    })
    .join('');
}

function filterProductTable() {
  renderProductAdminTable();
}

function selectProductForQuickEdit(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  activeQuickEditProductId = productId;

  document.getElementById('drawer-product-title').textContent = product.name;
  document.getElementById('drawer-product-sku').textContent = `SKU: ${product.sku} • Barcode: ${product.barcode}`;
  if (document.getElementById('editProductSku')) document.getElementById('editProductSku').value = product.sku;
  if (document.getElementById('editProductBarcode')) document.getElementById('editProductBarcode').value = product.barcode;
  if (document.getElementById('editProductStock')) document.getElementById('editProductStock').value = product.stock;
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductCat').value = product.categoryLabel;
  document.getElementById('inputHpp').value = product.hpp;
  document.getElementById('inputJual').value = product.price;

  recalculateMargin();
  renderProductAdminTable();
}

function focusQuickEditNew() {
  prepareNewProductByScan();
}

function prepareNewProductByScan(prefillCode = '') {
  activeQuickEditProductId = '__NEW__';
  const isNumericBarcode = /^\d{6,}$/.test(prefillCode);
  const nextIdx = PRODUCTS.length + 1;
  const generatedSku = isNumericBarcode || !prefillCode ? `BRG-0${nextIdx}` : prefillCode.toUpperCase();
  const generatedBarcode = isNumericBarcode ? prefillCode : `899100${2000 + nextIdx}`;

  document.getElementById('drawer-product-title').textContent = 'Input Barang Baru (Sync Excel)';
  document.getElementById('drawer-product-sku').textContent = `SKU: ${generatedSku} • Barcode: ${generatedBarcode}`;
  if (document.getElementById('editProductSku')) document.getElementById('editProductSku').value = generatedSku;
  if (document.getElementById('editProductBarcode')) document.getElementById('editProductBarcode').value = generatedBarcode;
  if (document.getElementById('editProductStock')) document.getElementById('editProductStock').value = 30;
  document.getElementById('editProductName').value = '';
  document.getElementById('editProductCat').value = 'Minuman Kopi';
  document.getElementById('inputHpp').value = 10000;
  document.getElementById('inputJual').value = 24000;

  recalculateMargin();
  document.getElementById('editProductName').focus();
  showToast('Form Barang Baru siap! Isi Nama & Harga lalu klik Simpan untuk sinkron ke Excel.');
}

async function handleAdminBarcodeScan(e) {
  e.preventDefault();
  const input = document.getElementById('adminBarcodeScanInput');
  const code = (input?.value || '').trim();
  if (!code) {
    showToast('Masukkan atau scan nomor Barcode / kode SKU terlebih dahulu!');
    return;
  }

  let existing = PRODUCTS.find(
    (p) => p.barcode === code || p.sku.toLowerCase() === code.toLowerCase() || p.id.toLowerCase() === code.toLowerCase()
  );

  if (!existing) {
    try {
      const res = await fetch(`/api/scan?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.product) existing = data.product;
      }
    } catch (err) {
      console.warn('Admin scan lookup fallback:', err);
    }
  }

  if (existing) {
    selectProductForQuickEdit(existing.id);
    if (document.getElementById('editProductStock')) {
      document.getElementById('editProductStock').focus();
      document.getElementById('editProductStock').select();
    }
    showToast(`✓ SKU/Barcode ditemukan: "${existing.name}" (Stok: ${existing.stock}). Siap edit/tambah stok!`);
  } else {
    prepareNewProductByScan(code);
    showToast(`✨ Kode "${code}" belum terdaftar → Form Input Barang Baru otomatis disiapkan!`);
  }
  if (input) input.value = '';
}

async function reloadFromLocalExcelFile() {
  try {
    const res = await fetch('/api/excel/sync-from-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`✓ Sinkronisasi 2-Arah: ${result.importedCount} produk dimuat dari ${result.excelPath}!`);
      return;
    }
  } catch (err) {
    console.warn('Excel sync error:', err);
  }
  showToast('Gagal memuat file Excel lokal.');
}

function uploadExcelCatalog(e) {
  const file = e.target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    const dataUrl = String(reader.result || '');
    const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : '';
    try {
      const res = await fetch('/api/excel/sync-from-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, base64Data })
      });
      if (res.ok) {
        const result = await res.json();
        applyBackendState(result.state);
        showToast(`✓ Berhasil mengimpor ${result.importedCount} barang dari "${file.name}" ke Database & Excel!`);
      }
    } catch (err) {
      console.warn('Upload Excel failed:', err);
      showToast('Gagal mengimpor file Excel/CSV.');
    }
    e.target.value = '';
  };
  reader.readAsDataURL(file);
}

function recalculateMargin() {
  const hpp = parseFloat(document.getElementById('inputHpp')?.value) || 0;
  const jual = parseFloat(document.getElementById('inputJual')?.value) || 1;
  const profit = jual - hpp;
  const profitPct = Math.max(0, Math.min(100, ((profit / jual) * 100)));
  const hppPct = 100 - profitPct;

  document.getElementById('calc-profit-rp').textContent = formatRp(profit);
  const statusLabel = profitPct >= 50 ? 'Sangat Baik' : profitPct >= 30 ? 'Sehat' : 'Rendah';
  document.getElementById('calc-profit-pct').textContent = `${profitPct.toFixed(1)}% (${statusLabel})`;

  document.getElementById('bar-hpp-width').style.width = `${hppPct.toFixed(1)}%`;
  document.getElementById('bar-profit-width').style.width = `${profitPct.toFixed(1)}%`;
  document.getElementById('label-hpp-pct').textContent = `HPP ${hppPct.toFixed(1)}%`;
  document.getElementById('label-profit-pct').textContent = `Laba Kotor ${profitPct.toFixed(1)}%`;
}

async function saveProductQuickEdit(e) {
  e.preventDefault();
  const skuVal = (document.getElementById('editProductSku')?.value || '').trim().toUpperCase();
  const barcodeVal = (document.getElementById('editProductBarcode')?.value || '').trim();
  const stockVal = parseInt(document.getElementById('editProductStock')?.value, 10);
  const nameVal = (document.getElementById('editProductName')?.value || '').trim();
  const catVal = document.getElementById('editProductCat')?.value || 'Minuman Kopi';
  const hppVal = parseFloat(document.getElementById('inputHpp')?.value) || 0;
  const priceVal = parseFloat(document.getElementById('inputJual')?.value) || 0;

  const isCreatingNew = activeQuickEditProductId === '__NEW__' || !PRODUCTS.some((p) => p.id === activeQuickEditProductId);

  if (isCreatingNew) {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku: skuVal,
          barcode: barcodeVal,
          name: nameVal,
          categoryLabel: catVal,
          hpp: hppVal,
          price: priceVal,
          stock: isNaN(stockVal) ? 25 : stockVal
        })
      });
      if (res.ok) {
        const result = await res.json();
        activeQuickEditProductId = result.sku;
        applyBackendState(result.state);
        selectProductForQuickEdit(result.sku);
        savePersistedState();
        showToast(`✓ Barang baru "${nameVal}" (${result.sku} • ${result.barcode}) tersimpan ke SQLite & katalog_produk.xlsx!`);
        return;
      }
    } catch (err) {
      console.warn('POST /api/products fallback:', err);
    }
  }

  const product = PRODUCTS.find((p) => p.id === activeQuickEditProductId);
  if (!product) return;

  const updated = {
    sku: skuVal || product.sku,
    barcode: barcodeVal || product.barcode,
    stock: isNaN(stockVal) ? product.stock : stockVal,
    name: nameVal || product.name,
    categoryLabel: catVal || product.categoryLabel,
    hpp: hppVal || product.hpp,
    price: priceVal || product.price
  };

  try {
    const res = await fetch(`/api/products/${encodeURIComponent(activeQuickEditProductId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      document.getElementById('drawer-product-title').textContent = updated.name;
      document.getElementById('drawer-product-sku').textContent = `SKU: ${updated.sku} • Barcode: ${updated.barcode}`;
      savePersistedState();
      showToast(`✓ Perubahan "${updated.name}" tersimpan ke SQLite & Excel (katalog_produk.xlsx)!`);
      return;
    }
  } catch (err) {
    console.warn('PUT /api/products fallback:', err);
  }

  Object.assign(product, updated);
  document.getElementById('drawer-product-title').textContent = product.name;
  savePersistedState();
  renderProductAdminTable();
  renderPosCatalog();
  showToast(`Perubahan harga & HPP untuk "${product.name}" berhasil disimpan!`);
}

// ==========================================================================
// RIWAYAT TRANSAKSI & THERMAL RECEIPT PREVIEW
// ==========================================================================
function renderTransactionsTable() {
  const tbody = document.getElementById('trx-table-body');
  if (!tbody) return;

  const methodFilter = document.getElementById('trxFilterMethod')?.value || 'all';
  const filtered = TRANSACTIONS.filter((t) => methodFilter === 'all' || t.methodGroup === methodFilter);

  tbody.innerHTML = filtered
    .map((t) => {
      const isSelected = t.id === selectedTrxId;
      const isRefund = t.status === 'Refund';
      return `
      <tr onclick="selectTransaction('${t.id}')" class="${isSelected ? 'bg-surface-container-high/80' : 'hover:bg-surface-container'} transition-colors cursor-pointer">
        <td class="py-3.5 px-4 font-label-lg text-label-lg font-bold ${isSelected ? 'text-primary' : 'text-on-surface'} flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px] ${isSelected ? 'text-primary' : 'text-outline'}">receipt</span>
          <span>${t.id}</span>
        </td>
        <td class="py-3.5 px-3 whitespace-nowrap text-on-surface-variant font-mono">${t.time}</td>
        <td class="py-3.5 px-3 whitespace-nowrap">
          <span class="font-label-md text-label-md text-on-surface block">${t.customer}</span>
          <span class="font-label-sm text-label-sm text-outline">Kasir: ${t.cashier}</span>
        </td>
        <td class="py-3.5 px-3">
          <span class="font-label-md text-label-md text-on-surface block">${t.itemCount}</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant truncate block max-w-[200px]">${t.itemsSummary}</span>
        </td>
        <td class="py-3.5 px-3 whitespace-nowrap">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container border border-outline-variant/25 font-label-sm text-label-sm text-on-surface">
            ${t.method}
          </span>
        </td>
        <td class="py-3.5 px-4 whitespace-nowrap text-right font-currency-tile text-currency-tile ${isRefund ? 'text-error line-through' : 'text-on-surface'} tabular-nums">
          ${formatRp(t.total)}
        </td>
        <td class="py-3.5 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full ${
            isRefund ? 'bg-error-container/40 text-error' : 'bg-tertiary-container/30 text-tertiary'
          } font-label-sm text-label-sm font-bold">
            ${t.status}
          </span>
        </td>
      </tr>`;
    })
    .join('');

  renderThermalReceipt();
}

function selectTransaction(trxId) {
  selectedTrxId = trxId;
  renderTransactionsTable();
}

function renderThermalReceipt() {
  const trx = TRANSACTIONS.find((t) => t.id === selectedTrxId) || TRANSACTIONS[0];
  if (!trx) return;

  document.getElementById('receipt-badge-id').textContent = trx.id;
  document.getElementById('receipt-no').textContent = trx.bon;
  document.getElementById('receipt-time').textContent = `24/10/2024 ${trx.time}`;
  document.getElementById('receipt-cashier').textContent = trx.cashier;
  document.getElementById('receipt-customer').textContent = trx.customer;
  document.getElementById('receipt-total').textContent = formatRp(trx.total);
  document.getElementById('receipt-method').textContent = trx.method;
  document.getElementById('receipt-status').textContent = trx.status === 'Refund' ? 'REFUND / VOID' : 'LUNAS / SETTLED';

  const itemsContainer = document.getElementById('receipt-items-list');
  if (itemsContainer) {
    itemsContainer.innerHTML = trx.items
      .map(
        (item) => `
      <div>
        <div class="flex justify-between font-bold text-neutral-100">
          <span>${item.name}</span>
          <span class="tabular-nums">${formatRp(item.qty * item.price)}</span>
        </div>
        <div class="flex justify-between text-neutral-400 text-[11px] pl-2">
          <span>${item.qty} x @ ${formatRp(item.price)} (${item.note})</span>
        </div>
      </div>`
      )
      .join('');
  }
}

// ==========================================================================
// TOAST NOTIFICATION & KEYBOARD SHORTCUTS
// ==========================================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className =
    'pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-surface-container-highest/95 backdrop-blur-md border border-primary/40 text-on-surface shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 translate-y-2 opacity-0';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary text-[18px]">bolt</span>
    <span class="font-label-md text-label-md font-semibold">${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function showModuleToast(moduleName) {
  showToast(`Modul "${moduleName}" terhubung ke database Toko Berkah Utama.`);
}

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    document.getElementById('globalSearchInput')?.focus();
  } else if (e.key === 'F1') {
    e.preventDefault();
    switchView('kasir');
  } else if (e.key === 'F2') {
    e.preventDefault();
    switchView('kasir');
    setTimeout(() => document.getElementById('posSearchInput')?.focus(), 50);
  } else if (e.key === 'F8') {
    e.preventDefault();
    showToast('Perintah Cetak Struk (Thermal 80mm) dikirim!');
  }
});

// ==========================================================================
// OPERASIONAL TOKO MODULES (INVENTORI, PO, KAS HARIAN, KEUANGAN, KARYAWAN, PENGATURAN)
// ==========================================================================

const INVENTORY_ITEMS = [
  { id: 'ING-001', name: 'Biji Kopi Arabika Gayo (1Kg)', category: 'Bahan Kopi', stock: 14, minStock: 5, unit: 'Pack', cost: 215000 },
  { id: 'ING-002', name: 'Susu UHT Full Cream Diamond (1L)', category: 'Dairy & Oat', stock: 8, minStock: 12, unit: 'Box', cost: 19500 },
  { id: 'ING-003', name: 'Oatside Barista Blend (1L)', category: 'Dairy & Oat', stock: 5, minStock: 8, unit: 'Box', cost: 33000 },
  { id: 'ING-004', name: 'Gula Aren Organik Cair (5L)', category: 'Sirup & Pemanis', stock: 6, minStock: 3, unit: 'Jerigen', cost: 145000 },
  { id: 'ING-005', name: 'Bubuk Matcha Uji Kyoto (500g)', category: 'Bahan Non-Kopi', stock: 2, minStock: 4, unit: 'Pouch', cost: 280000 },
  { id: 'ING-006', name: 'Cup Injection 16oz + Lid Sablon', category: 'Packaging', stock: 420, minStock: 150, unit: 'Pcs', cost: 1450 },
  { id: 'ING-007', name: 'Croissant Butter Frozen Dough', category: 'Pastry & Bakery', stock: 36, minStock: 20, unit: 'Pcs', cost: 9500 }
];

let selectedInventoryId = 'ING-001';

const INVENTORY_MUTATIONS = [
  { time: 'Hari ini, 08:15', item: 'Susu UHT Full Cream', delta: '-6 Box', reason: 'Pemakaian Bar Pagi' },
  { time: 'Kemarin, 17:40', item: 'Biji Kopi Arabika Gayo', delta: '+10 Pack', reason: 'Restok PO-2410-088' },
  { time: 'Kemarin, 14:10', item: 'Bubuk Matcha Uji Kyoto', delta: '-1 Pouch', reason: 'Stock Opname Rutin' }
];

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;
  const q = (document.getElementById('invSearchInput')?.value || '').toLowerCase().trim();
  const filtered = INVENTORY_ITEMS.filter((i) => !q || i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));

  const critCount = INVENTORY_ITEMS.filter((i) => i.stock <= i.minStock).length;
  const critEl = document.getElementById('inv-critical-count');
  if (critEl) critEl.innerHTML = `${critCount} <span class="font-label-sm text-label-sm font-normal text-error/80">Wajib Order</span>`;

  tbody.innerHTML = filtered
    .map((item) => {
      const isSelected = item.id === selectedInventoryId;
      const isLow = item.stock <= item.minStock;
      return `
      <tr onclick="selectInventoryItem('${item.id}')" class="${isSelected ? 'bg-primary/10' : 'hover:bg-surface-container/60'} transition-colors cursor-pointer">
        <td class="py-3.5 px-4">
          <p class="font-label-lg text-label-lg font-bold text-on-surface">${item.name}</p>
          <span class="font-label-sm text-label-sm font-mono ${isSelected ? 'text-primary font-semibold' : 'text-outline'}">${item.id}</span>
        </td>
        <td class="py-3.5 px-3">
          <span class="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant">${item.category}</span>
        </td>
        <td class="py-3.5 px-3 text-right font-mono font-bold ${isLow ? 'text-error' : 'text-on-surface'} tabular-nums">${item.stock} ${item.unit}</td>
        <td class="py-3.5 px-3 text-right font-mono text-outline tabular-nums">${item.minStock} ${item.unit}</td>
        <td class="py-3.5 px-3 text-right font-mono text-on-surface tabular-nums">${formatRp(item.cost)}</td>
        <td class="py-3.5 px-3 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full ${
            isLow ? 'bg-error-container/40 text-error' : 'bg-tertiary-container/30 text-tertiary'
          } font-label-sm text-label-sm font-bold">${isLow ? 'Menipis' : 'Aman'}</span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <button type="button" class="btn-interactive p-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary-container hover:text-on-primary-container">
            <span class="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </td>
      </tr>`;
    })
    .join('');

  const logEl = document.getElementById('inv-mutation-log');
  if (logEl) {
    logEl.innerHTML = INVENTORY_MUTATIONS.map(
      (m) => `
      <div class="p-2 rounded-lg bg-surface-container border border-outline-variant/15 flex items-center justify-between text-xs">
        <div>
          <p class="font-bold text-on-surface">${m.item} <span class="text-primary font-mono">(${m.delta})</span></p>
          <p class="text-outline text-[11px]">${m.reason}</p>
        </div>
        <span class="text-outline font-mono text-[10px]">${m.time}</span>
      </div>`
    ).join('');
  }
}

function selectInventoryItem(itemId) {
  const item = INVENTORY_ITEMS.find((i) => i.id === itemId);
  if (!item) return;
  selectedInventoryId = itemId;
  document.getElementById('inv-drawer-title').textContent = item.name;
  document.getElementById('inv-drawer-code').textContent = `Kode: ${item.id} • Satuan: ${item.unit}`;
  document.getElementById('invSystemStock').value = `${item.stock} ${item.unit}`;
  document.getElementById('invActualStock').value = item.stock;
  renderInventoryTable();
}

async function saveInventoryAdjustment(e) {
  e.preventDefault();
  const item = INVENTORY_ITEMS.find((i) => i.id === selectedInventoryId);
  if (!item) return;
  const newStock = parseInt(document.getElementById('invActualStock').value, 10);
  if (isNaN(newStock) || newStock < 0) return;
  const reason = document.getElementById('invAdjustReason').value;

  try {
    const res = await fetch('/api/inventory/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedInventoryId, actualStock: newStock, reason })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      document.getElementById('invSystemStock').value = `${newStock} ${item.unit}`;
      showToast(`Stok "${item.name}" diperbarui di Database menjadi ${newStock} ${item.unit}!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/inventory/adjust fallback:', err);
  }

  const diff = newStock - item.stock;
  const diffStr = diff >= 0 ? `+${diff} ${item.unit}` : `${diff} ${item.unit}`;
  item.stock = newStock;
  document.getElementById('invSystemStock').value = `${item.stock} ${item.unit}`;
  INVENTORY_MUTATIONS.unshift({ time: 'Baru saja', item: item.name, delta: diffStr, reason });
  renderInventoryTable();
  showToast(`Stok "${item.name}" berhasil diperbarui menjadi ${item.stock} ${item.unit}!`);
}

// PURCHASE ORDERS (PEMBELIAN)
const PURCHASE_ORDERS = [
  { id: 'PO-2410-091', date: '24 Okt 2024', supplier: 'CV Dairy Fresh Indonesia', items: 'Oatside Barista 1L (4 Karton), Susu Diamond (6 Karton)', total: 2850000, status: 'Dikirim' },
  { id: 'PO-2410-090', date: '23 Okt 2024', supplier: 'PT Kopi Nusantara Roastery', items: 'Arabika Gayo Wine 1Kg (12 Pack), House Blend (10 Pack)', total: 4250000, status: 'Dikirim' },
  { id: 'PO-2410-089', date: '20 Okt 2024', supplier: 'UD Kemasan Mandiri Jaya', items: 'Paper Cup 16oz + Lid (2.000 Pcs), Paper Bag (500 Pcs)', total: 3120000, status: 'Diterima' },
  { id: 'PO-2410-088', date: '18 Okt 2024', supplier: 'Mitra Pangan Segar Yogya', items: 'Ayam Fillet Segar (25 Kg), Cabai Rawit & Bahan Dapur', total: 1980000, status: 'Diterima' }
];

function renderPurchaseOrdersTable() {
  const tbody = document.getElementById('po-table-body');
  if (!tbody) return;

  const pendingCount = PURCHASE_ORDERS.filter((p) => p.status !== 'Diterima').length;
  const pendingEl = document.getElementById('po-pending-count');
  if (pendingEl) pendingEl.innerHTML = `${pendingCount} <span class="font-label-sm text-label-sm font-normal text-secondary/75">Menunggu Kurir</span>`;

  tbody.innerHTML = PURCHASE_ORDERS.map((po) => {
    const isDone = po.status === 'Diterima';
    return `
      <tr class="hover:bg-surface-container/60 transition-colors">
        <td class="py-3.5 px-4">
          <p class="font-label-lg text-label-lg font-bold text-primary font-mono">${po.id}</p>
          <span class="font-label-sm text-label-sm text-outline">${po.date}</span>
        </td>
        <td class="py-3.5 px-3 font-label-md text-label-md font-semibold text-on-surface">${po.supplier}</td>
        <td class="py-3.5 px-3 font-body-sm text-body-sm text-on-surface-variant max-w-xs truncate">${po.items}</td>
        <td class="py-3.5 px-3 text-right font-mono font-bold text-on-surface tabular-nums">${formatRp(po.total)}</td>
        <td class="py-3.5 px-3 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full ${
            isDone ? 'bg-tertiary-container/30 text-tertiary' : 'bg-secondary-container/40 text-secondary'
          } font-label-sm text-label-sm font-bold">${po.status}</span>
        </td>
        <td class="py-3.5 px-4 text-right">
          ${
            isDone
              ? `<span class="font-label-sm text-label-sm text-outline">✓ Masuk Gudang</span>`
              : `<button type="button" onclick="receivePurchaseOrder('${po.id}')" class="btn-secondary-neon px-3 py-1 rounded-lg bg-surface-container-high text-tertiary font-label-sm text-label-sm font-bold">Terima Barang</button>`
          }
        </td>
      </tr>`;
  }).join('');
}

async function createPurchaseOrder(e) {
  e.preventDefault();
  const supplier = document.getElementById('poSupplier').value;
  const items = document.getElementById('poItemName').value;
  const total = parseFloat(document.getElementById('poTotalCost').value) || 1500000;

  try {
    const res = await fetch('/api/purchase-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplier, items, total })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`Purchase Order ${result.poId} ke "${supplier}" tersimpan di Database!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/purchase-orders fallback:', err);
  }

  const nextNum = 92 + Math.max(0, PURCHASE_ORDERS.length - 4);
  const newId = `PO-2410-0${nextNum}`;
  PURCHASE_ORDERS.unshift({ id: newId, date: 'Hari ini', supplier, items, total, status: 'Dikirim' });
  renderPurchaseOrdersTable();
  showToast(`Purchase Order ${newId} ke "${supplier}" berhasil diterbitkan!`);
}

async function receivePurchaseOrder(poId) {
  try {
    const res = await fetch(`/api/purchase-orders/${encodeURIComponent(poId)}/receive`, { method: 'POST' });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`${poId} diterima di Database! Stok bahan baku gudang otomatis bertambah.`);
      return;
    }
  } catch (err) {
    console.warn('POST receive PO fallback:', err);
  }

  const po = PURCHASE_ORDERS.find((p) => p.id === poId);
  if (!po) return;
  po.status = 'Diterima';
  if (INVENTORY_ITEMS[1]) INVENTORY_ITEMS[1].stock += 10;
  renderPurchaseOrdersTable();
  renderInventoryTable();
  showToast(`${poId} diterima! Stok bahan baku gudang otomatis bertambah.`);
}

// KAS HARIAN & SHIFT KASIR
const CASH_DRAWER_LOGS = [
  { time: '07:30 WIB', type: 'in', label: 'Modal Awal Laci', note: 'Pembukaan Shift 1 (Pecahan Kecil)', user: 'Siti Rahma', amount: 500000 },
  { time: '10:15 WIB', type: 'out', label: 'Kas Keluar (Petty)', note: 'Beli Galon Air Mineral Bar (5 Galon)', user: 'Siti Rahma', amount: 100000 },
  { time: '12:40 WIB', type: 'out', label: 'Kas Keluar (Petty)', note: 'Beli Plastik Takeaway & Karet', user: 'Budi Santoso', amount: 85000 },
  { time: '14:15 WIB', type: 'in', label: 'Penjualan Tunai POS', note: 'Akumulasi Pembayaran Tunai Kasir', user: 'Sistem POS', amount: 3420000 }
];

function renderCashDrawerTable() {
  const tbody = document.getElementById('cash-drawer-tbody');
  if (!tbody) return;

  let cashIn = 0;
  let cashOut = 0;
  CASH_DRAWER_LOGS.forEach((l) => {
    if (l.type === 'in') cashIn += l.amount;
    else cashOut += l.amount;
  });

  const expected = cashIn - cashOut;
  const outEl = document.getElementById('cash-out-total');
  const expEl = document.getElementById('cash-expected-drawer');
  if (outEl) outEl.textContent = '-' + formatRp(cashOut);
  if (expEl) expEl.textContent = formatRp(expected);

  tbody.innerHTML = CASH_DRAWER_LOGS.map((l) => {
    const isOut = l.type === 'out';
    return `
      <tr class="hover:bg-surface-container/60 transition-colors">
        <td class="py-3.5 px-4 font-mono text-on-surface-variant">${l.time}</td>
        <td class="py-3.5 px-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full ${
            isOut ? 'bg-error-container/40 text-error' : 'bg-tertiary-container/30 text-tertiary'
          } font-label-sm text-label-sm font-bold">${l.label}</span>
        </td>
        <td class="py-3.5 px-3 font-label-md text-label-md text-on-surface">${l.note}</td>
        <td class="py-3.5 px-3 text-outline">${l.user}</td>
        <td class="py-3.5 px-4 text-right font-mono font-bold ${isOut ? 'text-error' : 'text-tertiary'} tabular-nums">
          ${isOut ? '-' : '+'}${formatRp(l.amount)}
        </td>
      </tr>`;
  }).join('');
}

async function addCashDrawerEntry(e) {
  e.preventDefault();
  const type = document.getElementById('cashEntryType').value;
  const amount = parseFloat(document.getElementById('cashEntryAmount').value) || 0;
  const note = document.getElementById('cashEntryNote').value;
  if (amount <= 0) return;

  try {
    const res = await fetch('/api/cash-drawer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, amount, note, user: 'Siti Rahma' })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`Mutasi kas ${formatRp(amount)} tersimpan di Database Laci Kasir!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/cash-drawer fallback:', err);
  }

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
  CASH_DRAWER_LOGS.unshift({
    time: timeStr,
    type,
    label: type === 'out' ? 'Kas Keluar (Petty)' : 'Kas Masuk Laci',
    note,
    user: 'Siti Rahma',
    amount
  });
  renderCashDrawerTable();
  showToast(`Mutasi kas ${formatRp(amount)} berhasil dicatat ke laci kasir!`);
}

function closeCashierShift() {
  const exp = document.getElementById('cash-expected-drawer')?.textContent || 'Rp 3.735.000';
  showToast(`Rekonsiliasi Shift 1 Selesai! Saldo fisik ${exp} sesuai. Z-Report dicetak.`);
}

// KEUANGAN & ARUS KAS
const FINANCE_LEDGER = [
  { date: '24 Okt 2024', cat: 'Pencairan Settlement QRIS', desc: 'Settlement Otomatis QRIS BCA & GoPay (142 Trx)', acc: 'BCA Bisnis', type: 'in', amount: 8450000 },
  { date: '23 Okt 2024', cat: 'Setoran Tunai Kasir', desc: 'Setoran Tutup Shift Pagi & Sore', acc: 'Brankas Tunai', type: 'in', amount: 4120000 },
  { date: '22 Okt 2024', cat: 'Pembelian Bahan Baku', desc: 'Pelunasan Faktur PT Kopi Nusantara Roastery', acc: 'BCA Bisnis', type: 'out', amount: 4250000 },
  { date: '20 Okt 2024', cat: 'Utilitas (Listrik / WiFi / Air)', desc: 'Token Listrik PLN 3-Phase & PDAM Toko', acc: 'BCA Bisnis', type: 'out', amount: 2850000 }
];

function renderFinanceLedger() {
  const tbody = document.getElementById('finance-ledger-tbody');
  if (!tbody) return;

  tbody.innerHTML = FINANCE_LEDGER.map((f) => {
    const isOut = f.type === 'out';
    return `
      <tr class="hover:bg-surface-container/60 transition-colors">
        <td class="py-3.5 px-4 font-mono text-outline">${f.date}</td>
        <td class="py-3.5 px-3">
          <span class="px-2.5 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">${f.cat}</span>
        </td>
        <td class="py-3.5 px-3 font-label-md text-label-md text-on-surface">${f.desc}</td>
        <td class="py-3.5 px-3 text-on-surface-variant">${f.acc}</td>
        <td class="py-3.5 px-4 text-right font-mono font-bold ${isOut ? 'text-error' : 'text-tertiary'} tabular-nums">
          ${isOut ? '-' : '+'}${formatRp(f.amount)}
        </td>
      </tr>`;
  }).join('');
}

async function addFinanceExpense(e) {
  e.preventDefault();
  const cat = document.getElementById('finCategory').value;
  const desc = document.getElementById('finDesc').value;
  const amount = parseFloat(document.getElementById('finAmount').value) || 0;
  if (amount <= 0) return;

  try {
    const res = await fetch('/api/finance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cat, desc, amount, acc: 'BCA Bisnis', type: 'out' })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`Pengeluaran "${desc}" (${formatRp(amount)}) tersimpan di Buku Besar SQLite!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/finance fallback:', err);
  }

  FINANCE_LEDGER.unshift({ date: 'Hari ini', cat, desc, acc: 'BCA Bisnis', type: 'out', amount });
  renderFinanceLedger();
  showToast(`Pengeluaran "${desc}" sebesar ${formatRp(amount)} tercatat di Buku Besar!`);
}

// MANAJEMEN KARYAWAN
const STAFF_MEMBERS = [
  { name: 'Siti Rahma', role: 'Owner & Store Manager', shift: 'Full Access', pin: '1122', trxCount: 412, status: 'Bertugas' },
  { name: 'Budi Santoso', role: 'Head Barista & Kasir', shift: 'Shift Pagi (07:30)', pin: '2048', trxCount: 318, status: 'Bertugas' },
  { name: 'Dinda Permata', role: 'Kasir & Barista', shift: 'Shift Pagi (07:30)', pin: '3310', trxCount: 274, status: 'Bertugas' },
  { name: 'Rizky Pratama', role: 'Kitchen & Pastry', shift: 'Shift Pagi (07:30)', pin: '5512', trxCount: 195, status: 'Bertugas' },
  { name: 'Nadia Putri', role: 'Supervisor Shift (Akses Refund)', shift: 'Shift Sore (14:30)', pin: '7781', trxCount: 289, status: 'Siap Shift' },
  { name: 'Fajar Nugroho', role: 'Kasir & Barista', shift: 'Shift Sore (14:30)', pin: '9014', trxCount: 210, status: 'Siap Shift' }
];

function renderStaffTable() {
  const tbody = document.getElementById('staff-table-body');
  if (!tbody) return;

  const countEl = document.getElementById('staff-total-count');
  if (countEl) countEl.innerHTML = `${STAFF_MEMBERS.length} <span class="font-label-sm text-label-sm font-normal text-outline">Personel</span>`;

  tbody.innerHTML = STAFF_MEMBERS.map((s) => {
    const isOnDuty = s.status === 'Bertugas';
    return `
      <tr class="hover:bg-surface-container/60 transition-colors">
        <td class="py-3.5 px-4 font-label-lg text-label-lg font-bold text-on-surface">${s.name}</td>
        <td class="py-3.5 px-3 text-on-surface-variant">${s.role}</td>
        <td class="py-3.5 px-3 font-mono text-xs text-outline">${s.shift}</td>
        <td class="py-3.5 px-3 font-mono font-bold text-primary">••${s.pin.slice(-2)}</td>
        <td class="py-3.5 px-3 text-right font-mono font-bold text-on-surface tabular-nums">${s.trxCount} Struk</td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full ${
            isOnDuty ? 'bg-tertiary-container/30 text-tertiary' : 'bg-surface-container-highest text-outline'
          } font-label-sm text-label-sm font-bold">${s.status}</span>
        </td>
      </tr>`;
  }).join('');
}

async function addStaffMember(e) {
  e.preventDefault();
  const name = document.getElementById('staffName').value;
  const role = document.getElementById('staffRole').value;
  const shift = document.getElementById('staffShift').value;
  const pin = document.getElementById('staffPin').value || '1234';

  try {
    const res = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, shift, pin })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      document.getElementById('staffName').value = '';
      showToast(`Karyawan "${name}" tersimpan di Database dengan PIN ••${pin.slice(-2)}!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/staff fallback:', err);
  }

  STAFF_MEMBERS.unshift({ name, role, shift, pin, trxCount: 0, status: 'Bertugas' });
  document.getElementById('staffName').value = '';
  renderStaffTable();
  showToast(`Karyawan "${name}" ditambahkan dengan PIN Kasir ••${pin.slice(-2)}!`);
}

// PENGATURAN SISTEM
async function savePosSettings(e) {
  e.preventDefault();
  const payload = {
    storeName: document.getElementById('setStoreName')?.value || 'JEVALLENE COFFEE & EATERY',
    branchName: document.getElementById('setBranchName')?.value || 'Toko Berkah Utama (JVL-8821)',
    storeAddr: document.getElementById('setStoreAddr')?.value || 'Jl. Melati No. 42, Kota Yogyakarta',
    storePhone: document.getElementById('setStorePhone')?.value || '0812-9988-7711',
    taxRate: parseFloat(document.getElementById('setTaxRate')?.value) || 10,
    promoRate: parseFloat(document.getElementById('setPromoRate')?.value) || 10,
    receiptFooter: document.getElementById('setReceiptFooter')?.value || ''
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast(`Konfigurasi "${payload.storeName}" berhasil disimpan ke Database SQLite!`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/settings fallback:', err);
  }

  showToast(`Konfigurasi "${payload.storeName}" & Printer Thermal berhasil disimpan!`);
}

async function resetDemoDatabase() {
  localStorage.removeItem(STORAGE_KEY_PRODUCTS);
  localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
  try {
    const res = await fetch('/api/reset', { method: 'POST' });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      showToast('Database SQLite pos.db berhasil di-reset ke data awal!');
      return;
    }
  } catch (err) {
    console.warn('POST /api/reset fallback:', err);
  }
  showToast('Data demo berhasil di-reset ke kondisi awal! Memuat ulang...');
  setTimeout(() => window.location.reload(), 900);
}

// ==========================================================================
// PUSAT NOTIFIKASI & OAUTH 2.0 SSO AUTHENTICATION
// ==========================================================================

const NOTIFICATIONS = [
  {
    id: 'NTF-106',
    title: 'Stok Kritis: Ayam Geprek Sambal Korek',
    message: 'Sisa stok di katalog POS tinggal 4 Pcs (di bawah batas minimum 10 Pcs). Segera lakukan prep dapur atau PO bahan baku.',
    category: 'Stok & Gudang',
    severity: 'critical',
    time: '10 menit lalu',
    isRead: false,
    actionTab: 'inventori',
    actionLabel: 'Cek Gudang & Stok'
  },
  {
    id: 'NTF-105',
    title: 'Pencairan Settlement QRIS BCA Berhasil',
    message: 'Dana settlement QRIS kemarin sebesar Rp 8.450.000 (142 transaksi) telah masuk ke rekening BCA Bisnis Operasional.',
    category: 'Keuangan & QRIS',
    severity: 'success',
    time: '45 menit lalu',
    isRead: false,
    actionTab: 'keuangan',
    actionLabel: 'Lihat Buku Besar'
  },
  {
    id: 'NTF-104',
    title: 'Bahan Baku Menipis: Bubuk Matcha Uji Kyoto',
    message: 'Stok gudang tersisa 2 Pouch (minimum 4 Pouch). Disarankan menerbitkan PO ke PT Kopi Nusantara Roastery.',
    category: 'Stok & Gudang',
    severity: 'warning',
    time: '1 jam lalu',
    isRead: false,
    actionTab: 'pembelian',
    actionLabel: 'Buat PO Supplier'
  },
  {
    id: 'NTF-103',
    title: 'Otorisasi Refund Transaksi #TRX-9480',
    message: 'Refund senilai Rp 64.000 (Matcha Latte Oat x2 - Salah Input Pesanan) telah diverifikasi menggunakan PIN Supervisor.',
    category: 'Keamanan & Audit',
    severity: 'warning',
    time: '2 jam lalu',
    isRead: false,
    actionTab: 'transaksi',
    actionLabel: 'Audit Struk #TRX-9480'
  },
  {
    id: 'NTF-102',
    title: 'Kurir Supplier Dalam Perjalanan (PO-2410-091)',
    message: 'Pengiriman Oatside Barista 1L & Susu Diamond dari CV Dairy Fresh Indonesia dijadwalkan tiba pukul 15:30 WIB.',
    category: 'Pembelian PO',
    severity: 'info',
    time: '3 jam lalu',
    isRead: true,
    actionTab: 'pembelian',
    actionLabel: 'Lacak Status PO'
  },
  {
    id: 'NTF-101',
    title: 'Sinkronisasi Cloud & Backup SQLite Selesai',
    message: 'Seluruh data katalog, HPP, dan jurnal kas Shift 1 telah terenkripsi dan tersinkronisasi 100% ke Jevallene Cloud.',
    category: 'Sistem Cloud',
    severity: 'success',
    time: 'Hari ini, 07:30',
    isRead: true,
    actionTab: 'pengaturan',
    actionLabel: 'Pengaturan Sistem'
  }
];

let selectedNotifId = 'NTF-106';
let activeNotifFilter = 'all';

let currentAuthUser = {
  name: 'Siti Rahma',
  email: 'siti.rahma@jevallene.cloud',
  role: 'Owner',
  provider: 'Google Workspace OAuth 2.0',
  initials: 'SR',
  branch: 'Toko Berkah Utama (JVL-8821)'
};

function renderNotificationsView() {
  const container = document.getElementById('notifications-list-container');
  const totalCount = NOTIFICATIONS.length;
  const unreadCount = NOTIFICATIONS.filter((n) => !n.isRead).length;
  const readCount = totalCount - unreadCount;
  const critCount = NOTIFICATIONS.filter((n) => n.severity === 'critical' || n.severity === 'warning').length;

  const kpiTotal = document.getElementById('notif-kpi-total');
  const kpiUnread = document.getElementById('notif-kpi-unread');
  const kpiCrit = document.getElementById('notif-kpi-critical');
  const kpiRead = document.getElementById('notif-kpi-read');
  if (kpiTotal) kpiTotal.innerHTML = `${totalCount} <span class="font-label-sm text-label-sm font-normal text-outline">Pesan</span>`;
  if (kpiUnread) kpiUnread.innerHTML = `${unreadCount} <span class="font-label-sm text-label-sm font-normal text-primary/80">Baru</span>`;
  if (kpiCrit) kpiCrit.innerHTML = `${critCount} <span class="font-label-sm text-label-sm font-normal text-error/80">Prioritas</span>`;
  if (kpiRead) kpiRead.innerHTML = `${readCount} <span class="font-label-sm text-label-sm font-normal text-tertiary/80">Selesai</span>`;

  const sideBadge = document.getElementById('sidebar-notif-badge');
  const headerDot = document.getElementById('header-notif-dot');
  if (sideBadge) {
    sideBadge.textContent = String(unreadCount);
    if (unreadCount === 0) {
      sideBadge.className = 'font-label-sm text-[10px] bg-surface-container-high text-outline px-1.5 py-0.5 rounded-full';
    } else {
      sideBadge.className = 'font-label-sm text-[10px] bg-primary-container text-on-primary-container px-1.5 py-0.5 rounded-full font-bold';
    }
  }
  if (headerDot) {
    if (unreadCount === 0) headerDot.classList.add('hidden');
    else headerDot.classList.remove('hidden');
  }

  if (!container) return;

  const filtered = NOTIFICATIONS.filter((n) => {
    if (activeNotifFilter === 'unread') return !n.isRead;
    if (activeNotifFilter === 'read') return n.isRead;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-outline">
        <span class="material-symbols-outlined text-[36px] text-tertiary mb-1">notifications_off</span>
        <p class="font-label-lg text-label-lg font-bold text-on-surface">Tidak ada notifikasi pada filter ini</p>
        <p class="font-body-sm text-body-sm">Semua peringatan operasional toko sudah ditangani.</p>
      </div>`;
  } else {
    container.innerHTML = filtered
      .map((n) => {
        const isSelected = n.id === selectedNotifId;
        const iconMap = {
          critical: { icon: 'warning', color: 'text-error bg-error-container/30' },
          warning: { icon: 'notification_important', color: 'text-secondary bg-secondary-container/30' },
          success: { icon: 'verified', color: 'text-tertiary bg-tertiary-container/25' },
          info: { icon: 'info', color: 'text-primary bg-primary-container/20' }
        };
        const st = iconMap[n.severity] || iconMap.info;

        return `
        <div onclick="selectNotification('${n.id}')" class="p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
          isSelected ? 'bg-primary/10' : n.isRead ? 'opacity-75 hover:bg-surface-container/40' : 'bg-surface-container/30 hover:bg-surface-container/70'
        }">
          <div class="flex items-start gap-3.5 min-w-0">
            <div class="w-10 h-10 rounded-xl ${st.color} flex items-center justify-center shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-[20px]">${st.icon}</span>
            </div>
            <div class="min-w-0 space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-label-sm text-label-sm uppercase tracking-wider ${n.isRead ? 'text-outline' : 'text-primary font-bold'}">${n.category}</span>
                <span class="text-outline text-xs">•</span>
                <span class="font-mono text-xs text-outline">${n.time}</span>
                ${
                  !n.isRead
                    ? `<span class="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[10px] font-bold">BARU</span>`
                    : `<span class="px-2 py-0.5 rounded-full bg-surface-container-highest text-outline font-label-sm text-[10px]">Dibaca</span>`
                }
              </div>
              <h4 class="font-headline-sm text-headline-sm ${n.isRead ? 'text-on-surface-variant font-semibold' : 'text-on-surface font-bold'}">${n.title}</h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${n.message}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            ${
              !n.isRead
                ? `<button type="button" onclick="event.stopPropagation(); markNotificationRead('${n.id}')" class="btn-secondary-neon px-3 py-1.5 rounded-xl bg-surface-container-high text-primary font-label-sm text-label-sm font-bold whitespace-nowrap flex items-center gap-1">
                    <span class="material-symbols-outlined text-[15px]">done</span>
                    <span>Tandai Dibaca</span>
                  </button>`
                : `<span class="material-symbols-outlined text-tertiary text-[18px]" title="Telah Dibaca">done_all</span>`
            }
          </div>
        </div>`;
      })
      .join('');
  }

  renderSelectedNotificationDetail();
}

function setNotifFilter(filter, btnEl) {
  activeNotifFilter = filter;
  document.querySelectorAll('.notif-filter-btn').forEach((b) => {
    b.className = 'notif-filter-btn px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm';
  });
  btnEl.className = 'notif-filter-btn px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold';
  renderNotificationsView();
}

function selectNotification(id) {
  selectedNotifId = id;
  renderNotificationsView();
}

function renderSelectedNotificationDetail() {
  const n = NOTIFICATIONS.find((item) => item.id === selectedNotifId) || NOTIFICATIONS[0];
  if (!n) return;

  const catEl = document.getElementById('notif-detail-cat');
  const statusEl = document.getElementById('notif-detail-status');
  const titleEl = document.getElementById('notif-detail-title');
  const timeEl = document.getElementById('notif-detail-time');
  const msgEl = document.getElementById('notif-detail-msg');
  const markBtn = document.getElementById('notif-detail-mark-btn');
  const actionLbl = document.getElementById('notif-detail-action-label');

  if (catEl) catEl.textContent = n.category;
  if (statusEl) {
    statusEl.textContent = n.isRead ? 'Telah Dibaca' : 'Belum Dibaca';
    statusEl.className = n.isRead
      ? 'px-2 py-0.5 rounded-full bg-tertiary-container/25 text-tertiary font-label-sm text-label-sm font-bold'
      : 'px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm font-bold';
  }
  if (titleEl) titleEl.textContent = n.title;
  if (timeEl) timeEl.textContent = `${n.time} • ID: ${n.id}`;
  if (msgEl) msgEl.textContent = n.message;
  if (actionLbl) actionLbl.textContent = n.actionLabel || 'Buka Modul Terkait';
  if (markBtn) {
    if (n.isRead) {
      markBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">done_all</span><span>Sudah Ditandai Dibaca</span>`;
      markBtn.classList.add('opacity-60');
    } else {
      markBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Tandai Telah Dibaca</span>`;
      markBtn.classList.remove('opacity-60');
    }
  }
}

async function markNotificationRead(ntfId) {
  const targetId = ntfId || selectedNotifId;
  const item = NOTIFICATIONS.find((n) => n.id === targetId);
  if (item) item.isRead = true;
  renderNotificationsView();

  try {
    const res = await fetch(`/api/notifications/${encodeURIComponent(targetId)}/read`, { method: 'POST' });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
    }
  } catch (err) {
    console.warn('POST /api/notifications/read fallback:', err);
  }
  showToast(`Notifikasi ${targetId} ditandai telah dibaca.`);
}

function markSelectedNotificationRead() {
  markNotificationRead(selectedNotifId);
}

async function markAllNotificationsRead() {
  NOTIFICATIONS.forEach((n) => {
    n.isRead = true;
  });
  renderNotificationsView();

  try {
    const res = await fetch('/api/notifications/read-all', { method: 'POST' });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
    }
  } catch (err) {
    console.warn('POST /api/notifications/read-all fallback:', err);
  }
  showToast('Seluruh notifikasi telah ditandai dibaca!');
}

function triggerSelectedNotificationAction() {
  const n = NOTIFICATIONS.find((item) => item.id === selectedNotifId) || NOTIFICATIONS[0];
  if (!n) return;
  if (!n.isRead) markNotificationRead(n.id);
  if (n.actionTab) switchView(n.actionTab);
}

// OAUTH 2.0 SSO LOGIN FUNCTIONS
function renderAuthUserUI() {
  const u = currentAuthUser;
  if (!u) return;

  const shortProvider = (u.provider || 'OAuth').split(' ')[0];
  const hName = document.getElementById('header-user-name');
  const hRole = document.getElementById('header-user-role');
  const hAvatar = document.getElementById('header-user-avatar');
  if (hName) hName.textContent = u.name;
  if (hRole) hRole.textContent = `${u.role} • ${shortProvider} SSO`;
  if (hAvatar) hAvatar.textContent = u.initials || 'SR';

  const cName = document.getElementById('oauth-card-name');
  const cEmail = document.getElementById('oauth-card-email');
  const cProv = document.getElementById('oauth-card-provider');
  if (cName) cName.textContent = `${u.name} (${u.role})`;
  if (cEmail) cEmail.textContent = u.email;
  if (cProv) cProv.textContent = `Provider: ${u.provider}`;

  const mName = document.getElementById('modal-current-name');
  const mEmail = document.getElementById('modal-current-email');
  const mProv = document.getElementById('modal-current-provider');
  const mAvatar = document.getElementById('modal-current-avatar');
  if (mName) mName.textContent = `${u.name} (${u.role})`;
  if (mEmail) mEmail.textContent = u.email;
  if (mProv) mProv.textContent = u.provider;
  if (mAvatar) mAvatar.textContent = u.initials || 'SR';
}

function openOAuthModal() {
  const modal = document.getElementById('oauth-modal');
  if (modal) {
    renderAuthUserUI();
    modal.classList.remove('hidden');
  }
}

function closeOAuthModal() {
  const modal = document.getElementById('oauth-modal');
  if (modal) modal.classList.add('hidden');
}

async function loginWithOAuth(provider, name, email, role) {
  try {
    const res = await fetch('/api/auth/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, name, email, role })
    });
    if (res.ok) {
      const result = await res.json();
      applyBackendState(result.state);
      closeOAuthModal();
      showToast(`Login OAuth 2.0 (${provider}) berhasil! Selamat bertugas, ${name}.`);
      return;
    }
  } catch (err) {
    console.warn('POST /api/auth/oauth fallback:', err);
  }

  const parts = name.split(' ').filter(Boolean).map((p) => p[0].toUpperCase()).slice(0, 2);
  currentAuthUser = {
    name,
    email,
    role,
    provider,
    initials: parts.join('') || 'SR'
  };
  renderAuthUserUI();
  closeOAuthModal();
  showToast(`Login OAuth 2.0 (${provider}) berhasil! Selamat bertugas, ${name}.`);
}

function submitCustomOAuth(e) {
  e.preventDefault();
  const name = document.getElementById('customOAuthName')?.value || 'Kasir POS';
  const email = document.getElementById('customOAuthEmail')?.value || 'kasir@jevallene.cloud';
  loginWithOAuth('Custom OIDC / OAuth 2.0', name, email, 'Store Supervisor');
}

// ==========================================================================
// DARK / LIGHT MODE (SOFT PINK & WHITE)
// ==========================================================================
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  localStorage.setItem('jevallene_theme', theme);
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.title = theme === 'dark' ? 'Ganti ke Light Mode (Soft Pink)' : 'Ganti ke Dark Mode (Neon)';
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  root.classList.add('theme-switching');
  applyTheme(next);
  setTimeout(() => root.classList.remove('theme-switching'), 350);
  showToast(next === 'light' ? 'Light Mode (Soft Pink & White) aktif' : 'Dark Neon Mode aktif');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(localStorage.getItem('jevallene_theme') || 'dark');
  loadPersistedState();
  initChartTooltips();
  renderPosCatalog();
  renderCart();
  renderProductAdminTable();
  renderTransactionsTable();
  renderInventoryTable();
  renderPurchaseOrdersTable();
  renderCashDrawerTable();
  renderFinanceLedger();
  renderStaffTable();
  renderNotificationsView();
  renderAuthUserUI();
  await syncFromBackend();
});
