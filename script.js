const DEFAULT_SIZE_ROWS = [
  { key: 'A', label: 'محيط الصدر', M: '48', L: '52', XL: '56', '2XL': '60' },
  { key: 'B', label: 'الطول الكامل', M: '150', L: '150', XL: '150', '2XL': '150' },
  { key: 'C', label: 'طول الكم', M: '64', L: '64', XL: '64', '2XL': '64' }
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'فستان وردي كلاسيكي', category: 'women', label: 'نسائي', price: 385, old_price: 445, badge: 'الأكثر طلبًا', is_new: true, image_url: 'assets/products/model-set/dusty-rose.jpg', description: 'فستان طويل بقصة أنيقة وحزام جانبي، مناسب للإطلالات اليومية والمناسبات الهادئة.', active: true, sort_order: 1, color_name:'وردي ترابي', color_hex:'#a95f62' },
  { id: 2, name: 'فستان لافندر مزهر', category: 'women', label: 'نسائي', price: 399, old_price: 469, badge: 'جديد', is_new: true, image_url: 'assets/products/model-set/lavender.jpg', description: 'فستان لافندر ناعم بلمسات زهرية وقصة طويلة محتشمة.', active: true, sort_order: 2, color_name:'لافندر', color_hex:'#a99af4' },
  { id: 3, name: 'عباية زيتي أنيقة', category: 'women', label: 'نسائي', price: 429, old_price: 489, badge: 'مميز', is_new: true, image_url: 'assets/products/model-set/sage.jpg', description: 'إطلالة زيتية هادئة وأنيقة تناسب اليوم والمناسبات.', active: true, sort_order: 3, color_name:'زيتي', color_hex:'#7f8f6c' },
  { id: 4, name: 'فستان سماوي راقٍ', category: 'women', label: 'نسائي', price: 369, old_price: 429, badge: 'حصري', is_new: true, image_url: 'assets/products/model-set/sky-blue.jpg', description: 'فستان سماوي بقصة محتشمة ولون منعش، متاح للتفصيل حسب القياسات.', active: true, sort_order: 4, color_name:'سماوي', color_hex:'#27aee4' },
  { id: 5, name: 'فستان فوشيا للمناسبات', category: 'women', label: 'نسائي', price: 459, old_price: 519, badge: 'مميز', is_new: true, image_url: 'assets/products/model-set/fuchsia.jpg', description: 'لون فوشيا غني وإطلالة ملفتة للمناسبات واللقاءات الخاصة.', active: true, sort_order: 5, color_name:'فوشيا', color_hex:'#c40b68' },
  { id: 6, name: 'فستان نعناعي ناعم', category: 'girls', label: 'بناتي', price: 249, old_price: 299, badge: 'بناتي', is_new: true, image_url: 'assets/products/model-set/mint.jpg', description: 'لون نعناعي هادئ وتصميم محتشم ناعم.', active: true, sort_order: 6, color_name:'نعناعي', color_hex:'#b9dfcf' }
];

const DEFAULT_SETTINGS = {
  store_name: 'RIDAA Store', tagline: 'رداء يليق بكِ', phone: '+212 600 000 000', whatsapp: '212600000000', email: 'hello@ridaastore.com', address: 'المغرب',
  instagram: '#', facebook: '#', tiktok: '#', topbar_one: 'شحن مجاني للطلبات فوق 1000 د.م', topbar_two: 'توصيل داخل المغرب خلال 3–7 أيام',
  hero_eyebrow: 'مجموعة RIDAA الجديدة', hero_title: 'تسوّقي بكل أناقة', hero_accent: 'بتفاصيل تصنع الفرق', hero_subtitle: 'تصاميم محتشمة، أنثوية وعصرية مختارة بعناية لتمنحك حضورًا مميزًا.',
  stat_designs: '+500', stat_years: '12', stat_rating: '4.9', category_intro: 'فساتين وعبايات بتصاميم محتشمة تناسب اليوم والمناسبة.',
  custom_title: 'صمّمي إطلالتك الخاصة', custom_text: 'أرسلي لنا فكرتك أو صورة مرجعية، وحددي اللون والخامة والتفاصيل. نتواصل معك لتأكيد القياسات قبل التنفيذ.',
  story_title: 'نصمم رداءً يعكس أناقتك', story_text: 'في RIDAA نهتم بالقصة والخامة والقصّة قبل كل شيء. هدفنا أن تصلك قطعة جميلة، مريحة، ومصنوعة بتفاصيل تشبهك.',
  footer_description: 'متجر أزياء محتشمة وتصميم وتفصيل حسب الطلب.',
  logo_url: 'assets/logo-light.svg', logo_light_url: 'assets/logo-light.svg', hero_image_url: 'assets/products/model-set/dusty-rose.jpg', custom_image_url: 'assets/products/model-set/sky-blue.jpg', category_women_image_url: 'assets/products/model-set/sage.jpg', category_girls_image_url: 'assets/products/model-set/mint.jpg', category_custom_image_url: 'assets/products/model-set/fuchsia.jpg', story_image_1: 'assets/products/model-set/fuchsia.jpg', story_image_2: 'assets/products/model-set/lavender.jpg', story_image_3: 'assets/products/model-set/mint.jpg',
  women_category_label: 'مجموعة النساء', women_category_title: 'فساتين وعبايات راقية', girls_category_label: 'مجموعة البنات', girls_category_title: 'إطلالات ناعمة للصغيرات', custom_category_label: 'تصميم خاص', custom_category_title: 'قطعة مصنوعة لأجلك',
  testimonial_1_name: 'سارة', testimonial_1_text: 'التفصيل دقيق والخامة جميلة جدًا، والتواصل كان سريعًا وواضحًا.', testimonial_2_name: 'مريم', testimonial_2_text: 'التغليف أنيق والمقاس جاء مضبوطًا. سأكرر الطلب بالتأكيد.', testimonial_3_name: 'هدى', testimonial_3_text: 'أحببت تنسيق الألوان والتفاصيل، والموقع سهل جدًا في الطلب.'
};

let products = [...DEFAULT_PRODUCTS];
let settings = { ...DEFAULT_SETTINGS };
let currentFilter = 'all';
let searchTerm = '';
let selectedProduct = null;
let quickGalleryIndex = 0;
let detailGalleryIndex = 0;
let selectedQuickSize = '';
let selectedDetailSize = '';
let detailHistoryActive = false;
let cart = JSON.parse(localStorage.getItem('ridaa-cart') || '[]');
let supabaseClient = null;

const $ = (id) => document.getElementById(id);
const configured = () => window.RIDAA_SUPABASE && !window.RIDAA_SUPABASE.url.includes('YOUR_PROJECT') && !window.RIDAA_SUPABASE.anonKey.includes('YOUR_');
const safeText = (value='') => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const parseMaybeJSON = (value, fallback) => {
  if (Array.isArray(value) || (value && typeof value === 'object')) return value;
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
};
const unique = arr => [...new Set(arr.filter(Boolean))];

function normalizeProduct(raw) {
  const mainImage = raw.image_url ?? raw.image ?? '';
  const gallery = parseMaybeJSON(raw.gallery_urls, []);
  const sizes = parseMaybeJSON(raw.sizes, ['M','L','XL','2XL']);
  const bullets = parseMaybeJSON(raw.detail_bullets, []);
  const rows = parseMaybeJSON(raw.size_guide_rows, DEFAULT_SIZE_ROWS);
  return {
    ...raw,
    image_url: mainImage,
    gallery_urls: unique([mainImage, ...(Array.isArray(gallery) ? gallery : [])]),
    sizes: Array.isArray(sizes) && sizes.length ? sizes : ['M','L','XL','2XL'],
    detail_bullets: Array.isArray(bullets) ? bullets : [],
    size_guide_rows: Array.isArray(rows) && rows.length ? rows : DEFAULT_SIZE_ROWS,
    color_name: raw.color_name || 'اللون المعروض',
    color_hex: raw.color_hex || '#390e27',
    size_guide_image_url: raw.size_guide_image_url || ''
  };
}

async function initBackend() {
  if (!configured() || !window.supabase) {
    products = DEFAULT_PRODUCTS.map(normalizeProduct);
    return;
  }
  try {
    supabaseClient = window.supabase.createClient(window.RIDAA_SUPABASE.url, window.RIDAA_SUPABASE.anonKey);
    const [{ data: productRows, error: pErr }, { data: settingRow, error: sErr }] = await Promise.all([
      supabaseClient.from('products').select('*').eq('active', true).order('sort_order', { ascending: true }),
      supabaseClient.from('store_settings').select('data').eq('id', 1).maybeSingle()
    ]);
    if (!pErr && productRows?.length) products = productRows.map(normalizeProduct);
    else products = DEFAULT_PRODUCTS.map(normalizeProduct);
    if (!sErr && settingRow?.data) settings = { ...settings, ...settingRow.data };
  } catch (e) {
    console.warn('RIDAA backend unavailable; using bundled data.', e);
    products = DEFAULT_PRODUCTS.map(normalizeProduct);
  }
}

function applySettings() {
  const map = {
    brandName:'store_name', brandTagline:'tagline', topbarOne:'topbar_one', topbarTwo:'topbar_two', heroEyebrow:'hero_eyebrow', heroTitle:'hero_title', heroAccent:'hero_accent', heroSubtitle:'hero_subtitle',
    statDesigns:'stat_designs', statYears:'stat_years', statRating:'stat_rating', categoryIntro:'category_intro', customTitle:'custom_title', customText:'custom_text', storyTitle:'story_title', storyText:'story_text', footerDescription:'footer_description', addressText:'address', womenCategoryLabel:'women_category_label', womenCategoryTitle:'women_category_title', girlsCategoryLabel:'girls_category_label', girlsCategoryTitle:'girls_category_title', customCategoryLabel:'custom_category_label', customCategoryTitle:'custom_category_title', testimonial1Name:'testimonial_1_name', testimonial1Text:'testimonial_1_text', testimonial2Name:'testimonial_2_name', testimonial2Text:'testimonial_2_text', testimonial3Name:'testimonial_3_name', testimonial3Text:'testimonial_3_text'
  };
  Object.entries(map).forEach(([id,key]) => { if ($(id)) $(id).textContent = settings[key] ?? ''; });
  if ($('phoneLink')) { $('phoneLink').textContent = settings.phone; $('phoneLink').href = `tel:${String(settings.phone).replace(/\s/g,'')}`; }
  if ($('emailLink')) { $('emailLink').textContent = settings.email; $('emailLink').href = `mailto:${settings.email}`; }
  ['instagram','facebook','tiktok'].forEach(k => { const el=$(k+'Link'); if(el) el.href=settings[k]||'#'; });
  if ($('headerLogo')) $('headerLogo').src = settings.logo_light_url || settings.logo_url || 'assets/logo-light.svg';
  if ($('footerLogo')) $('footerLogo').src = settings.logo_light_url || settings.logo_url || 'assets/logo-light.svg';
  if ($('heroImage')) $('heroImage').style.backgroundImage = `linear-gradient(to top, rgba(36,26,22,.12), transparent 46%), url('${settings.hero_image_url || 'assets/products/model-set/dusty-rose.jpg'}')`;
  if ($('customImage')) $('customImage').style.backgroundImage = `url('${settings.custom_image_url || 'assets/products/model-set/sky-blue.jpg'}')`;
  const sectionImages = [
    ['.category-card.women', settings.category_women_image_url], ['.category-card.girls', settings.category_girls_image_url], ['.category-card.custom', settings.category_custom_image_url],
    ['.story-mosaic div:nth-child(1)', settings.story_image_1], ['.story-mosaic div:nth-child(2)', settings.story_image_2], ['.story-mosaic div:nth-child(3)', settings.story_image_3]
  ];
  sectionImages.forEach(([sel,url])=>{const el=document.querySelector(sel);if(el&&url)el.style.backgroundImage=`url('${url}')`;});
  const featured = products.find(p => p.active !== false) || products[0];
  if (featured) { $('featuredName').textContent=featured.name; $('featuredPrice').textContent=`ابتداءً من ${featured.price} د.م`; }
}

const eyeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/></svg>`;
const cartIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 8H6.2"/><path d="M10 20h.01M17 20h.01"/></svg>`;

function renderProducts() {
  const sortValue = $('sortSelect').value;
  let list = products.filter(p => p.active !== false).filter(product => {
    const matchesFilter = currentFilter === 'all' || product.category === currentFilter || (currentFilter === 'new' && (product.is_new ?? product.isNew));
    const label = product.label || '';
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || product.name.toLowerCase().includes(term) || label.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
  if (sortValue === 'low') list.sort((a,b)=>Number(a.price)-Number(b.price));
  if (sortValue === 'high') list.sort((a,b)=>Number(b.price)-Number(a.price));
  $('productGrid').innerHTML = list.length ? list.map(product => {
    const oldPrice=product.old_price ?? product.oldPrice;
    const img = product.image_url || product.gallery_urls?.[0] || '';
    return `
      <article class="product-card reveal visible" data-product-id="${product.id}">
        <div class="product-media" role="button" tabindex="0" aria-label="عرض تفاصيل ${safeText(product.name)}" onclick="openProductDetail(${product.id})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProductDetail(${product.id})}">
          <img class="product-photo" src="${safeText(img)}" alt="${safeText(product.name)}" loading="lazy">
          ${product.badge?`<span class="product-badge">${safeText(product.badge)}</span>`:''}
          <div class="product-hover-actions" onclick="event.stopPropagation()">
            <button class="hover-action quick-view-action" onclick="openQuickView(${product.id})" aria-label="عرض سريع">
              <span class="action-text">عرض سريع</span><span class="action-icon">${eyeIcon}</span>
            </button>
            <button class="hover-action quick-shop-action" onclick="quickShop(${product.id})" aria-label="إضافة سريعة إلى السلة">
              <span class="action-text">تسوق سريع</span><span class="action-icon">${cartIcon}</span>
            </button>
          </div>
          <span class="image-open-hint">انقري للصورة للتفاصيل</span>
        </div>
        <div class="product-info">
          <span class="product-category">${safeText(product.label||'')}</span>
          <h3>${safeText(product.name)}</h3>
          <div class="product-bottom"><div class="price"><strong>${product.price} د.م</strong>${oldPrice?`<del>${oldPrice} د.م</del>`:''}</div><button class="add-cart" onclick="quickShop(${product.id})" aria-label="إضافة إلى السلة">+</button></div>
        </div>
      </article>`;
  }).join('') : '<p class="empty-products">لا توجد منتجات مطابقة.</p>';
}

function productGallery(product) {
  return unique([product.image_url, ...(product.gallery_urls || [])]);
}

function setQuickImage(index) {
  if (!selectedProduct) return;
  const gallery = productGallery(selectedProduct);
  if (!gallery.length) return;
  quickGalleryIndex = (index + gallery.length) % gallery.length;
  $('quickMainImage').src = gallery[quickGalleryIndex];
  $('quickImageCounter').textContent = `${quickGalleryIndex + 1} / ${gallery.length}`;
  $('quickPrev').disabled = $('quickNext').disabled = gallery.length < 2;
  $('quickDots').innerHTML = gallery.map((_,i)=>`<button class="gallery-dot ${i===quickGalleryIndex?'active':''}" onclick="setQuickImage(${i})" aria-label="الصورة ${i+1}"></button>`).join('');
}

function renderSizeButtons(containerId, product, selected, handlerName) {
  const el = $(containerId);
  const sizes = product.sizes || ['M','L','XL','2XL'];
  el.innerHTML = sizes.map(size => `<button class="${size===selected?'active':''}" onclick="${handlerName}('${safeText(size)}')">${safeText(size)}</button>`).join('');
}

window.selectQuickSize = size => { selectedQuickSize=size; renderSizeButtons('quickSizes',selectedProduct,size,'selectQuickSize'); };
window.selectDetailSize = size => { selectedDetailSize=size; renderSizeButtons('detailSizes',selectedProduct,size,'selectDetailSize'); };
window.setQuickImage = setQuickImage;

function openQuickView(id) {
  selectedProduct = products.find(p => Number(p.id) === Number(id));
  if(!selectedProduct) return;
  selectedProduct = normalizeProduct(selectedProduct);
  quickGalleryIndex = 0;
  selectedQuickSize = selectedProduct.sizes?.[0] || '';
  $('modalCategory').textContent=selectedProduct.label||'';
  $('modalTitle').textContent=selectedProduct.name;
  $('modalPrice').innerHTML = `<strong>${selectedProduct.price} د.م</strong>${selectedProduct.old_price?`<del>${selectedProduct.old_price} د.م</del>`:''}`;
  $('modalDescription').textContent=selectedProduct.description ?? selectedProduct.desc ?? '';
  $('quickColorName').textContent=selectedProduct.color_name || '';
  $('quickColorSwatch').style.background=selectedProduct.color_hex || '#390e27';
  $('modalQty').value=1;
  renderSizeButtons('quickSizes', selectedProduct, selectedQuickSize, 'selectQuickSize');
  setQuickImage(0);
  $('productModal').classList.add('show');
  $('overlay').classList.add('show');
  document.body.style.overflow='hidden';
}

function quickShop(id) {
  const product = products.find(p=>Number(p.id)===Number(id));
  if (!product) return;
  const size = normalizeProduct(product).sizes?.[0] || '';
  addToCart(id,1,size);
}

function renderDetailBullets(product) {
  const bullets = product.detail_bullets?.length ? product.detail_bullets : [product.description || 'تصميم محتشم بخامة مريحة وتفاصيل دقيقة.'];
  $('detailBullets').innerHTML = bullets.map(x=>`<li>${safeText(x)}</li>`).join('');
}

function setDetailImage(index) {
  if (!selectedProduct) return;
  const gallery = productGallery(selectedProduct);
  if (!gallery.length) return;
  detailGalleryIndex = (index + gallery.length) % gallery.length;
  const url = gallery[detailGalleryIndex];
  $('detailMainImage').src=url;
  $('detailMainImage').alt=selectedProduct.name;
  $('zoomResult').style.backgroundImage=`url("${url.replace(/"/g,'\\"')}")`;
  $('detailThumbs').innerHTML=gallery.map((img,i)=>`<button class="detail-thumb ${i===detailGalleryIndex?'active':''}" onclick="setDetailImage(${i})"><img src="${safeText(img)}" alt="زاوية ${i+1}"></button>`).join('');
  $('detailPrev').disabled = $('detailNext').disabled = gallery.length < 2;
}
window.setDetailImage = setDetailImage;

function buildSizeGuide(product) {
  const rows = product.size_guide_rows?.length ? product.size_guide_rows : DEFAULT_SIZE_ROWS;
  const sizes = product.sizes?.length ? product.sizes : ['M','L','XL','2XL'];
  const head = sizes.map(s=>`<th>${safeText(s)}</th>`).join('');
  const body = rows.map(row=>`<tr><th><b class="measure-key">${safeText(row.key || '')}</b><span>${safeText(row.label || '')}</span></th>${sizes.map(s=>`<td>${safeText(row[s] ?? '—')}</td>`).join('')}</tr>`).join('');
  $('sizeGuideTable').innerHTML = `<thead><tr><th class="measure-head">القياس</th>${head}</tr></thead><tbody>${body}</tbody>`;
  const guide = $('sizeGuideImage');
  if (product.size_guide_image_url) {
    guide.src = product.size_guide_image_url;
    guide.closest('.size-guide-visual').classList.remove('placeholder');
  } else {
    guide.removeAttribute('src');
    guide.closest('.size-guide-visual').classList.add('placeholder');
  }
}

function openProductDetail(id) {
  selectedProduct = products.find(p => Number(p.id) === Number(id));
  if (!selectedProduct) return;
  selectedProduct = normalizeProduct(selectedProduct);
  selectedDetailSize = selectedProduct.sizes?.[0] || '';
  detailGalleryIndex=0;
  $('detailCategory').textContent = selectedProduct.label || '';
  $('detailTitle').textContent = selectedProduct.name;
  $('detailPrice').innerHTML = `<strong>${selectedProduct.price} د.م</strong>${selectedProduct.old_price?`<del>${selectedProduct.old_price} د.م</del>`:''}`;
  $('detailDescription').textContent = selectedProduct.description || '';
  $('detailColorName').textContent = selectedProduct.color_name || 'اللون المعروض';
  $('detailColorSwatch').style.background = selectedProduct.color_hex || '#390e27';
  $('detailQty').value = 1;
  renderDetailBullets(selectedProduct);
  renderSizeButtons('detailSizes', selectedProduct, selectedDetailSize, 'selectDetailSize');
  buildSizeGuide(selectedProduct);
  setDetailImage(0);
  $('productDetail').classList.add('show');
  $('overlay').classList.add('show');
  document.body.style.overflow='hidden';
  if (!detailHistoryActive) {
    history.pushState({ ridaaProductDetail: true, productId: Number(selectedProduct.id) }, '', `#product-${selectedProduct.id}`);
    detailHistoryActive = true;
  }
  setTimeout(()=> $('detailClose').focus(),80);
}
window.openProductDetail = openProductDetail;
window.openQuickView = openQuickView;
window.quickShop = quickShop;

function closeQuickView(){ $('productModal').classList.remove('show'); }
function finishProductDetailClose(){
  $('productDetail').classList.remove('show');
  $('zoomResult').classList.remove('show');
  $('zoomLens').classList.remove('show');
  detailHistoryActive = false;
  if (!$('productModal').classList.contains('show') && !$('cartDrawer').classList.contains('open')) $('overlay').classList.remove('show');
  document.body.style.overflow = ($('productModal').classList.contains('show') || $('cartDrawer').classList.contains('open')) ? 'hidden' : '';
}
function closeProductDetail(fromHistory=false){
  const isOpen = $('productDetail').classList.contains('show');
  if (!isOpen) return;
  if (!fromHistory && detailHistoryActive && history.state?.ridaaProductDetail) {
    history.back();
    return;
  }
  finishProductDetailClose();
}
function closePanels(){
  $('cartDrawer').classList.remove('open');
  closeQuickView();
  if ($('productDetail').classList.contains('show')) { closeProductDetail(); return; }
  $('overlay').classList.remove('show');
  document.body.style.overflow='';
}

function addToCart(id,qty=1,size=''){
  const p=products.find(x=>Number(x.id)===Number(id));
  if(!p) return;
  const normalized=normalizeProduct(p);
  const chosenSize=size || normalized.sizes?.[0] || '';
  const ex=cart.find(x=>Number(x.id)===Number(id) && (x.size||'')===chosenSize);
  if(ex) ex.qty+=qty; else cart.push({id,qty,size:chosenSize});
  saveCart(); showToast('تمت إضافة المنتج إلى السلة');
}
window.addToCart = addToCart;
function updateQty(id,size,change){ const i=cart.find(x=>Number(x.id)===Number(id)&&(x.size||'')===(size||'')); if(!i)return; i.qty+=change; if(i.qty<=0) cart=cart.filter(x=>!(Number(x.id)===Number(id)&&(x.size||'')===(size||''))); saveCart(); }
window.updateQty=updateQty;
function removeItem(id,size){ cart=cart.filter(x=>!(Number(x.id)===Number(id)&&(x.size||'')===(size||''))); saveCart(); }
window.removeItem=removeItem;
function saveCart(){ localStorage.setItem('ridaa-cart',JSON.stringify(cart)); renderCart(); }
function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0); $('cartCount').textContent=count; $('cartSubtitle').textContent=`${count} منتجات`; $('cartEmpty').style.display=cart.length?'none':'block'; $('cartFooter').style.display=cart.length?'block':'none'; $('cartItems').style.display=cart.length?'block':'none'; let total=0;
  $('cartItems').innerHTML=cart.map(item=>{ const p=products.find(x=>Number(x.id)===Number(item.id)); if(!p)return''; total+=Number(p.price)*item.qty; const sizeArg=JSON.stringify(item.size||'').replace(/"/g,'&quot;'); return `<div class="cart-item"><div class="cart-item-img" style="background-image:url('${p.image_url ?? p.image}')"></div><div><h4>${safeText(p.name)}</h4><small>${p.price} د.م${item.size?` · ${safeText(item.size)}`:''}</small><div class="cart-item-actions"><button onclick="updateQty(${p.id},${sizeArg},1)">+</button><span>${item.qty}</span><button onclick="updateQty(${p.id},${sizeArg},-1)">−</button></div></div><button class="remove-item" onclick="removeItem(${p.id},${sizeArg})">حذف</button></div>`; }).join('');
  $('cartTotal').textContent=`${total} د.م`;
}
function showToast(msg){ $('toast').textContent=msg; $('toast').classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2200); }
function openCart(){ $('cartDrawer').classList.add('open'); $('overlay').classList.add('show'); document.body.style.overflow='hidden'; }
function checkoutWhatsApp(){ if(!cart.length)return; const lines=cart.map(i=>{const p=products.find(x=>Number(x.id)===Number(i.id)); return `• ${p.name}${i.size?` — مقاس ${i.size}`:''} × ${i.qty} — ${Number(p.price)*i.qty} د.م`;}); const total=cart.reduce((s,i)=>{const p=products.find(x=>Number(x.id)===Number(i.id));return s+Number(p.price)*i.qty;},0); const message=`مرحبًا، أريد تأكيد الطلب التالي:\n\n${lines.join('\n')}\n\nالمجموع: ${total} د.م\n\nالاسم:\nالمدينة:\nرقم الهاتف:`; window.open(`https://wa.me/${String(settings.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent(message)}`,'_blank'); }

function changeQty(inputId,delta){ const input=$(inputId); input.value=Math.max(1,(Number(input.value)||1)+delta); }
window.changeQty=changeQty;

function bindZoom() {
  const stage=$('detailZoomStage'), lens=$('zoomLens'), result=$('zoomResult'), img=$('detailMainImage');
  if(!stage) return;
  const hide=()=>{lens.classList.remove('show');result.classList.remove('show');};
  stage.addEventListener('pointerleave',hide);
  stage.addEventListener('pointermove',e=>{
    if(window.matchMedia('(max-width: 900px)').matches) return hide();
    const rect=stage.getBoundingClientRect();
    let x=e.clientX-rect.left, y=e.clientY-rect.top;
    if(x<0||y<0||x>rect.width||y>rect.height) return hide();
    const lw=lens.offsetWidth/2, lh=lens.offsetHeight/2;
    x=Math.max(lw,Math.min(x,rect.width-lw)); y=Math.max(lh,Math.min(y,rect.height-lh));
    lens.style.left=`${x-lw}px`; lens.style.top=`${y-lh}px`;
    const px=x/rect.width*100, py=y/rect.height*100;
    result.style.backgroundImage=`url("${img.src.replace(/"/g,'\\"')}")`;
    result.style.backgroundPosition=`${px}% ${py}%`;
    lens.classList.add('show'); result.classList.add('show');
  });
}

function bindUI(){
  document.querySelectorAll('.filter-tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;renderProducts();}));
  document.querySelectorAll('[data-filter-link]').forEach(card=>card.addEventListener('click',()=>{currentFilter=card.dataset.filterLink;document.querySelectorAll('.filter-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.filter===currentFilter));renderProducts();$('products').scrollIntoView({behavior:'smooth'});}));
  document.querySelectorAll('[data-scroll]').forEach(card=>card.addEventListener('click',()=>document.querySelector(card.dataset.scroll).scrollIntoView({behavior:'smooth'})));
  $('sortSelect').addEventListener('change',renderProducts);
  $('cartToggle').addEventListener('click',openCart); $('closeCart').addEventListener('click',closePanels); $('overlay').addEventListener('click',closePanels);
  $('modalClose').addEventListener('click',closePanels); $('detailClose').addEventListener('click',()=>closeProductDetail()); $('detailBack').addEventListener('click',()=>closeProductDetail());
  $('quickPrev').addEventListener('click',()=>setQuickImage(quickGalleryIndex-1)); $('quickNext').addEventListener('click',()=>setQuickImage(quickGalleryIndex+1));
  $('detailPrev').addEventListener('click',()=>setDetailImage(detailGalleryIndex-1)); $('detailNext').addEventListener('click',()=>setDetailImage(detailGalleryIndex+1));
  $('modalAdd').addEventListener('click',()=>{const qty=Math.max(1,Number($('modalQty').value)||1);addToCart(selectedProduct.id,qty,selectedQuickSize);closePanels();openCart();});
  $('detailAdd').addEventListener('click',()=>{const qty=Math.max(1,Number($('detailQty').value)||1);addToCart(selectedProduct.id,qty,selectedDetailSize);closePanels();openCart();});
  $('openFullDetails').addEventListener('click',()=>{const id=selectedProduct?.id;closeQuickView();if(id)openProductDetail(id);});
  $('checkoutBtn').addEventListener('click',checkoutWhatsApp);
  $('searchToggle').addEventListener('click',()=>{$('searchPanel').classList.add('open');setTimeout(()=>$('globalSearch').focus(),200);}); $('closeSearch').addEventListener('click',()=>$('searchPanel').classList.remove('open')); $('globalSearch').addEventListener('input',e=>{searchTerm=e.target.value.trim();renderProducts();});
  $('menuToggle').addEventListener('click',()=>$('navMenu').classList.toggle('open')); document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>$('navMenu').classList.remove('open')));
  $('customOrderBtn').addEventListener('click',()=>{const msg='مرحبًا RIDAA، أريد طلب تصميم وتفصيل خاص.';window.open(`https://wa.me/${String(settings.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`,'_blank');});
  $('newsletterForm').addEventListener('submit',e=>{e.preventDefault();showToast('شكرًا لكِ، تم الاشتراك');e.target.reset();});
  window.addEventListener('scroll',()=>$('header').classList.toggle('scrolled',window.scrollY>20));
  window.addEventListener('popstate',()=>{ if ($('productDetail').classList.contains('show')) closeProductDetail(true); });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanels();if($('productModal').classList.contains('show')){if(e.key==='ArrowLeft')setQuickImage(quickGalleryIndex+1);if(e.key==='ArrowRight')setQuickImage(quickGalleryIndex-1);}else if($('productDetail').classList.contains('show')){if(e.key==='ArrowLeft')setDetailImage(detailGalleryIndex+1);if(e.key==='ArrowRight')setDetailImage(detailGalleryIndex-1);}});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  bindZoom();
}

(async function(){ await initBackend(); applySettings(); renderProducts(); renderCart(); bindUI(); })();
