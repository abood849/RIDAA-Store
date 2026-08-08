const DEFAULT_PRODUCTS = [
  { id: 1, name: 'فستان وردي كلاسيكي', category: 'women', label: 'نسائي', price: 385, old_price: 445, badge: 'الأكثر طلبًا', is_new: true, image_url: 'assets/products/model-set/dusty-rose.jpg', description: 'فستان طويل بقصة أنيقة وحزام جانبي، مناسب للإطلالات اليومية والمناسبات الهادئة.', active: true, sort_order: 1 },
  { id: 2, name: 'فستان لافندر مزهر', category: 'women', label: 'نسائي', price: 399, old_price: 469, badge: 'جديد', is_new: true, image_url: 'assets/products/model-set/lavender.jpg', description: 'فستان لافندر ناعم بلمسات زهرية وقصة طويلة محتشمة.', active: true, sort_order: 2 },
  { id: 3, name: 'عباية زيتي أنيقة', category: 'women', label: 'نسائي', price: 429, old_price: 489, badge: 'مميز', is_new: true, image_url: 'assets/products/model-set/sage.jpg', description: 'إطلالة زيتية هادئة وأنيقة تناسب اليوم والمناسبات.', active: true, sort_order: 3 },
  { id: 4, name: 'فستان سماوي راقٍ', category: 'women', label: 'نسائي', price: 369, old_price: 429, badge: 'حصري', is_new: true, image_url: 'assets/products/model-set/sky-blue.jpg', description: 'فستان سماوي بقصة محتشمة ولون منعش، متاح للتفصيل حسب القياسات.', active: true, sort_order: 4 },
  { id: 5, name: 'فستان فوشيا للمناسبات', category: 'women', label: 'نسائي', price: 459, old_price: 519, badge: 'مميز', is_new: true, image_url: 'assets/products/model-set/fuchsia.jpg', description: 'لون فوشيا غني وإطلالة ملفتة للمناسبات واللقاءات الخاصة.', active: true, sort_order: 5 },
  { id: 6, name: 'فستان نعناعي ناعم', category: 'girls', label: 'بناتي', price: 249, old_price: 299, badge: 'بناتي', is_new: true, image_url: 'assets/products/model-set/mint.jpg', description: 'لون نعناعي هادئ وتصميم محتشم ناعم.', active: true, sort_order: 6 }
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
let cart = JSON.parse(localStorage.getItem('ridaa-cart') || '[]');
let supabaseClient = null;

const $ = (id) => document.getElementById(id);
const configured = () => window.RIDAA_SUPABASE && !window.RIDAA_SUPABASE.url.includes('YOUR_PROJECT') && !window.RIDAA_SUPABASE.anonKey.includes('YOUR_');

async function initBackend() {
  if (!configured() || !window.supabase) return;
  try {
    supabaseClient = window.supabase.createClient(window.RIDAA_SUPABASE.url, window.RIDAA_SUPABASE.anonKey);
    const [{ data: productRows, error: pErr }, { data: settingRow, error: sErr }] = await Promise.all([
      supabaseClient.from('products').select('*').eq('active', true).order('sort_order', { ascending: true }),
      supabaseClient.from('store_settings').select('data').eq('id', 1).maybeSingle()
    ]);
    if (!pErr && productRows?.length) products = productRows;
    if (!sErr && settingRow?.data) settings = { ...settings, ...settingRow.data };
  } catch (e) { console.warn('RIDAA backend unavailable; using bundled data.', e); }
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

function renderProducts() {
  const sortValue = $('sortSelect').value;
  let list = products.filter(p => p.active !== false).filter(product => {
    const matchesFilter = currentFilter === 'all' || product.category === currentFilter || (currentFilter === 'new' && (product.is_new ?? product.isNew));
    const label = product.label || '';
    const matchesSearch = product.name.includes(searchTerm) || label.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });
  if (sortValue === 'low') list.sort((a,b)=>Number(a.price)-Number(b.price));
  if (sortValue === 'high') list.sort((a,b)=>Number(b.price)-Number(a.price));
  $('productGrid').innerHTML = list.length ? list.map(product => {
    const oldPrice=product.old_price ?? product.oldPrice;
    return `<article class="product-card reveal visible"><div class="product-image" style="background-image:url('${product.image_url ?? product.image}')">${product.badge?`<span class="product-badge">${product.badge}</span>`:''}<button class="quick-view" onclick="openProduct(${product.id})">عرض سريع</button></div><div class="product-info"><span class="product-category">${product.label||''}</span><h3>${product.name}</h3><div class="product-bottom"><div class="price"><strong>${product.price} د.م</strong>${oldPrice?`<del>${oldPrice} د.م</del>`:''}</div><button class="add-cart" onclick="addToCart(${product.id},1)">+</button></div></div></article>`;
  }).join('') : '<p class="empty-products">لا توجد منتجات مطابقة.</p>';
}

function openProduct(id) {
  selectedProduct = products.find(p => Number(p.id) === Number(id)); if(!selectedProduct) return;
  $('modalImage').style.backgroundImage=`url('${selectedProduct.image_url ?? selectedProduct.image}')`;
  $('modalCategory').textContent=selectedProduct.label||''; $('modalTitle').textContent=selectedProduct.name; $('modalPrice').textContent=`${selectedProduct.price} د.م`; $('modalDescription').textContent=selectedProduct.description ?? selectedProduct.desc ?? '';
  $('modalQty').value=1; $('productModal').classList.add('show'); $('overlay').classList.add('show'); document.body.style.overflow='hidden';
}
function closePanels(){ $('cartDrawer').classList.remove('open'); $('productModal').classList.remove('show'); $('overlay').classList.remove('show'); document.body.style.overflow=''; }
function addToCart(id,qty=1){ const ex=cart.find(x=>Number(x.id)===Number(id)); if(ex) ex.qty+=qty; else cart.push({id,qty}); saveCart(); showToast('تمت إضافة المنتج إلى السلة'); }
function updateQty(id,change){ const i=cart.find(x=>Number(x.id)===Number(id)); if(!i)return; i.qty+=change; if(i.qty<=0) cart=cart.filter(x=>Number(x.id)!==Number(id)); saveCart(); }
function removeItem(id){ cart=cart.filter(x=>Number(x.id)!==Number(id)); saveCart(); }
function saveCart(){ localStorage.setItem('ridaa-cart',JSON.stringify(cart)); renderCart(); }
function renderCart(){ const count=cart.reduce((s,i)=>s+i.qty,0); $('cartCount').textContent=count; $('cartSubtitle').textContent=`${count} منتجات`; $('cartEmpty').style.display=cart.length?'none':'block'; $('cartFooter').style.display=cart.length?'block':'none'; $('cartItems').style.display=cart.length?'block':'none'; let total=0; $('cartItems').innerHTML=cart.map(item=>{ const p=products.find(x=>Number(x.id)===Number(item.id)); if(!p)return''; total+=Number(p.price)*item.qty; return `<div class="cart-item"><div class="cart-item-img" style="background-image:url('${p.image_url ?? p.image}')"></div><div><h4>${p.name}</h4><small>${p.price} د.م</small><div class="cart-item-actions"><button onclick="updateQty(${p.id},1)">+</button><span>${item.qty}</span><button onclick="updateQty(${p.id},-1)">−</button></div></div><button class="remove-item" onclick="removeItem(${p.id})">حذف</button></div>`; }).join(''); $('cartTotal').textContent=`${total} د.م`; }
function showToast(msg){ $('toast').textContent=msg; $('toast').classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2200); }
function openCart(){ $('cartDrawer').classList.add('open'); $('overlay').classList.add('show'); document.body.style.overflow='hidden'; }
function checkoutWhatsApp(){ if(!cart.length)return; const lines=cart.map(i=>{const p=products.find(x=>Number(x.id)===Number(i.id)); return `• ${p.name} × ${i.qty} — ${Number(p.price)*i.qty} د.م`;}); const total=cart.reduce((s,i)=>{const p=products.find(x=>Number(x.id)===Number(i.id));return s+Number(p.price)*i.qty;},0); const message=`مرحبًا، أريد تأكيد الطلب التالي:\n\n${lines.join('\n')}\n\nالمجموع: ${total} د.م\n\nالاسم:\nالمدينة:\nرقم الهاتف:`; window.open(`https://wa.me/${String(settings.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent(message)}`,'_blank'); }

function bindUI(){
  document.querySelectorAll('.filter-tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;renderProducts();}));
  document.querySelectorAll('[data-filter-link]').forEach(card=>card.addEventListener('click',()=>{currentFilter=card.dataset.filterLink;document.querySelectorAll('.filter-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.filter===currentFilter));renderProducts();$('products').scrollIntoView({behavior:'smooth'});}));
  document.querySelectorAll('[data-scroll]').forEach(card=>card.addEventListener('click',()=>document.querySelector(card.dataset.scroll).scrollIntoView({behavior:'smooth'})));
  $('sortSelect').addEventListener('change',renderProducts); $('cartToggle').addEventListener('click',openCart); $('closeCart').addEventListener('click',closePanels); $('modalClose').addEventListener('click',closePanels); $('overlay').addEventListener('click',closePanels);
  $('modalAdd').addEventListener('click',()=>{const qty=Math.max(1,Number($('modalQty').value)||1);addToCart(selectedProduct.id,qty);closePanels();openCart();});
  document.querySelectorAll('.size-options button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.size-options button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
  $('checkoutBtn').addEventListener('click',checkoutWhatsApp);
  $('searchToggle').addEventListener('click',()=>{$('searchPanel').classList.add('open');setTimeout(()=>$('globalSearch').focus(),200);}); $('closeSearch').addEventListener('click',()=>$('searchPanel').classList.remove('open')); $('globalSearch').addEventListener('input',e=>{searchTerm=e.target.value.trim();renderProducts();});
  $('menuToggle').addEventListener('click',()=>$('navMenu').classList.toggle('open')); document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>$('navMenu').classList.remove('open')));
  $('customOrderBtn').addEventListener('click',()=>{const msg='مرحبًا RIDAA، أريد طلب تصميم وتفصيل خاص.';window.open(`https://wa.me/${String(settings.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`,'_blank');});
  $('newsletterForm').addEventListener('submit',e=>{e.preventDefault();showToast('شكرًا لكِ، تم الاشتراك');e.target.reset();});
  window.addEventListener('scroll',()=>$('header').classList.toggle('scrolled',window.scrollY>20));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

(async function(){ await initBackend(); applySettings(); renderProducts(); renderCart(); bindUI(); })();
