const products = [
  { id: 1, name: 'فستان لافندر مزهر', category: 'women', label: 'نسائي', price: 399, oldPrice: 469, badge: 'جديد', isNew: true, image: 'assets/products/lavender-floral-maxi.png', desc: 'فستان طويل بلون لافندر هادئ مع طبعات زهرية ناعمة، بقصة واسعة وانسيابية مثالية للإطلالات الراقية والمريحة.' },
  { id: 2, name: 'عباية زيتي أنيقة مع حقيبة', category: 'women', label: 'نسائي', price: 429, oldPrice: 489, badge: 'الأكثر طلبًا', isNew: true, image: 'assets/products/sage-elegance-abaya.png', desc: 'عباية بلون زيتي أنيق مع أكمام منفوخة وحجاب متناغم، مناسبة للمشاوير اليومية واللقاءات الراقية.' },
  { id: 3, name: 'فستان وردي بحزام جانبي', category: 'women', label: 'نسائي', price: 385, oldPrice: 445, badge: 'عرض', isNew: false, image: 'assets/products/dusty-rose-tiered-dress.png', desc: 'فستان طويل بلون وردي ترابي مع حزام جانبي وتفاصيل ناعمة، يمنحك إطلالة بسيطة وأنيقة في نفس الوقت.' },
  { id: 4, name: 'قفطان بناتي باللون النعناعي', category: 'girls', label: 'بناتي', price: 249, oldPrice: 299, badge: 'بناتي', isNew: true, image: 'assets/products/mint-girls-lace-dress.png', desc: 'قفطان بناتي ناعم بلون نعناعي مع دانتيل أبيض أنيق، مناسب للمناسبات العائلية والأعياد.' },
  { id: 5, name: 'فستان سماوي بقصّة راقية', category: 'women', label: 'نسائي', price: 369, oldPrice: 429, badge: 'حصري', isNew: true, image: 'assets/products/sky-blue-mannequin-dress.png', desc: 'فستان سماوي بتصميم راقٍ وياقة مرتفعة وثنيات أنيقة، مثالي للعرض والتفصيل حسب الطلب.' },
  { id: 6, name: 'فستان فوشيا بطبقة شفافة', category: 'women', label: 'نسائي', price: 459, oldPrice: 519, badge: 'مميز', isNew: true, image: 'assets/products/fuchsia-layered-dress.png', desc: 'فستان فوشيا فاخر بطبقة خارجية انسيابية وأكتاف مربوطة، قطعة مميزة للمناسبات والإطلالات الملفتة.' }
];

let currentFilter = 'all';
let searchTerm = '';
let selectedProduct = null;
let cart = JSON.parse(localStorage.getItem('dar-alasala-cart') || '[]');

const productGrid = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('productModal');
const toast = document.getElementById('toast');

function renderProducts() {
  let list = products.filter(product => {
    const matchesFilter = currentFilter === 'all' ||
      product.category === currentFilter ||
      (currentFilter === 'new' && product.isNew);
    const matchesSearch = product.name.includes(searchTerm) || product.label.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const sortValue = document.getElementById('sortSelect').value;
  if (sortValue === 'low') list.sort((a, b) => a.price - b.price);
  if (sortValue === 'high') list.sort((a, b) => b.price - a.price);

  productGrid.innerHTML = list.length ? list.map(product => `
    <article class="product-card reveal visible">
      <div class="product-image" style="background-image:url('${product.image}')">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="quick-view" onclick="openProduct(${product.id})">عرض سريع</button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.label}</span>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <div class="price"><strong>${product.price} د.م</strong>${product.oldPrice ? `<del>${product.oldPrice} د.م</del>` : ''}</div>
          <button class="add-cart" onclick="addToCart(${product.id}, 1)" aria-label="إضافة ${product.name} إلى السلة">+</button>
        </div>
      </div>
    </article>
  `).join('') : '<p style="grid-column:1/-1;text-align:center;padding:55px;color:#756a64">لم نجد منتجات مطابقة للبحث.</p>';
}

function openProduct(id) {
  selectedProduct = products.find(p => p.id === id);
  if (!selectedProduct) return;
  document.getElementById('modalImage').style.backgroundImage = `url('${selectedProduct.image}')`;
  document.getElementById('modalCategory').textContent = selectedProduct.label;
  document.getElementById('modalTitle').textContent = selectedProduct.name;
  document.getElementById('modalPrice').textContent = `${selectedProduct.price} د.م`;
  document.getElementById('modalDescription').textContent = selectedProduct.desc;
  document.getElementById('modalQty').value = 1;
  productModal.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePanels() {
  cartDrawer.classList.remove('open');
  productModal.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function addToCart(id, qty = 1) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  showToast('تمت إضافة المنتج إلى السلة');
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem('dar-alasala-cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartSubtitle').textContent = `${count} منتجات`;
  document.getElementById('cartEmpty').style.display = cart.length ? 'none' : 'block';
  document.getElementById('cartFooter').style.display = cart.length ? 'block' : 'none';
  const itemsEl = document.getElementById('cartItems');
  itemsEl.style.display = cart.length ? 'block' : 'none';

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    total += product.price * item.qty;
    return `<div class="cart-item">
      <div class="cart-item-img" style="background-image:url('${product.image}')"></div>
      <div>
        <h4>${product.name}</h4>
        <small>${product.price} د.م</small>
        <div class="cart-item-actions">
          <button onclick="updateQty(${product.id},1)">+</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${product.id},-1)">−</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeItem(${product.id})">حذف</button>
    </div>`;
  }).join('');
  document.getElementById('cartTotal').textContent = `${total} د.م`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function checkoutWhatsApp() {
  if (!cart.length) return;
  const lines = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `• ${product.name} × ${item.qty} — ${product.price * item.qty} د.م`;
  });
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);
  const message = `مرحبًا، أريد تأكيد الطلب التالي:\n\n${lines.join('\n')}\n\nالمجموع: ${total} د.م\n\nالاسم:\nالمدينة:\nرقم الهاتف:`;
  window.open(`https://wa.me/962790000000?text=${encodeURIComponent(message)}`, '_blank');
}

document.querySelectorAll('.filter-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderProducts();
  });
});

document.querySelectorAll('[data-filter-link]').forEach(card => {
  card.addEventListener('click', () => {
    currentFilter = card.dataset.filterLink;
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-scroll]').forEach(card => card.addEventListener('click', () => document.querySelector(card.dataset.scroll).scrollIntoView({behavior:'smooth'})));
document.getElementById('sortSelect').addEventListener('change', renderProducts);
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closePanels);
document.getElementById('modalClose').addEventListener('click', closePanels);
document.getElementById('overlay').addEventListener('click', closePanels);
document.getElementById('modalAdd').addEventListener('click', () => {
  const qty = Math.max(1, Number(document.getElementById('modalQty').value) || 1);
  addToCart(selectedProduct.id, qty);
  closePanels();
  openCart();
});
document.querySelectorAll('.size-options button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.size-options button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}));
document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);

document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchPanel').classList.add('open');
  setTimeout(() => document.getElementById('globalSearch').focus(), 250);
});
document.getElementById('closeSearch').addEventListener('click', () => document.getElementById('searchPanel').classList.remove('open'));
document.getElementById('globalSearch').addEventListener('input', event => {
  searchTerm = event.target.value.trim();
  renderProducts();
  if (searchTerm) document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('navMenu').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => document.getElementById('navMenu').classList.remove('open')));

document.getElementById('customOrderBtn').addEventListener('click', () => {
  const message = 'مرحبًا، أريد طلب تصميم وتفصيل خاص. أرجو تزويدي بالتفاصيل المطلوبة لبدء الطلب.';
  window.open(`https://wa.me/962790000000?text=${encodeURIComponent(message)}`, '_blank');
});

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  showToast('شكرًا لك، تم الاشتراك بنجاح');
  event.target.reset();
});

window.addEventListener('scroll', () => document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

renderProducts();
renderCart();
