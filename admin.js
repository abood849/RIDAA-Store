let sb = null;
let currentUser = null;
let currentAdmin = null;
let storeSettings = {};
let adminProducts = [];

const $ = id => document.getElementById(id);
const isConfigured = () => window.RIDAA_SUPABASE && !window.RIDAA_SUPABASE.url.includes('YOUR_PROJECT') && !window.RIDAA_SUPABASE.anonKey.includes('YOUR_');
const toast = message => { const t=$('toast'); t.textContent=message; t.classList.add('show'); clearTimeout(window.__ridaaToast); window.__ridaaToast=setTimeout(()=>t.classList.remove('show'),2300); };
const msg = (message,ok=false) => { $('authMsg').textContent=message; $('authMsg').style.color=ok?'#16835b':'#a22538'; };
const parseMaybeJSON = (value,fallback=[]) => {
  if (Array.isArray(value) || (value && typeof value==='object')) return value;
  if (typeof value!=='string' || !value.trim()) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
};
const lines = value => String(value||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
const allowedBrandTypes = new Set(['image/svg+xml','image/png','image/webp','image/x-icon','image/vnd.microsoft.icon']);
const previewObjectUrl = (img,file) => { if(!img||!file)return; const old=img.dataset.objectUrl; if(old) URL.revokeObjectURL(old); const url=URL.createObjectURL(file); img.dataset.objectUrl=url; img.src=url; };
const validateBrandFile = (file,kind='logo') => {
  if(!file) return;
  const ext=(file.name.split('.').pop()||'').toLowerCase();
  const allowedExt = kind==='favicon' ? ['svg','png','webp','ico'] : ['svg','png','webp'];
  if(!allowedExt.includes(ext) || (file.type && !allowedBrandTypes.has(file.type))) throw new Error(`صيغة ملف ${kind==='favicon'?'الأيقونة':'الشعار'} غير مدعومة`);
  if(file.size > 5*1024*1024) throw new Error('حجم الملف يجب أن يكون أقل من 5MB');
};
const DEFAULT_ROWS = [
  {key:'A',label:'محيط الصدر',M:'48',L:'52',XL:'56','2XL':'60'},
  {key:'B',label:'الطول الكامل',M:'150',L:'150',XL:'150','2XL':'150'},
  {key:'C',label:'طول الكم',M:'64',L:'64',XL:'64','2XL':'64'}
];

async function init(){
  if(!isConfigured() || !window.supabase){ $('setupNotice').classList.remove('hidden'); msg('اربط Supabase أولًا حسب ملف README_ADMIN_SETUP.md'); return; }
  sb=window.supabase.createClient(window.RIDAA_SUPABASE.url,window.RIDAA_SUPABASE.anonKey);
  await loadPublicBranding();
  const {data:{session}}=await sb.auth.getSession();
  if(session) await enterAdmin(session.user);
  bind();
}

function bind(){
  $('loginForm').addEventListener('submit',login);
  $('signupForm').addEventListener('submit',signup);
  $('showSignup').onclick=()=>{ $('loginForm').classList.add('hidden'); $('showSignup').classList.add('hidden'); $('signupForm').classList.remove('hidden'); };
  $('showLogin').onclick=()=>{ $('signupForm').classList.add('hidden'); $('loginForm').classList.remove('hidden'); $('showSignup').classList.remove('hidden'); };
  $('logoutBtn').onclick=async()=>{ await sb.auth.signOut(); location.reload(); };
  document.querySelectorAll('.sidebar nav button').forEach(b=>b.onclick=()=>switchView(b.dataset.view,b));
  $('addProductBtn').onclick=()=>openProductEditor();
  $('closeProductDialog').onclick=$('cancelProduct').onclick=()=> $('productDialog').close();
  $('productForm').addEventListener('submit',saveProduct);
  $('settingsForm').addEventListener('submit',saveSettings);
  $('contentForm').addEventListener('submit',saveSettings);
  $('mediaUpload').addEventListener('change',uploadMedia);
  $('inviteForm').addEventListener('submit',inviteAdmin);
  $('brandLogoFile').addEventListener('change',e=>{ const file=e.target.files[0]; if(!file)return; try{validateBrandFile(file,'logo');previewObjectUrl($('brandLogoPreview'),file);}catch(err){toast(err.message);e.target.value='';} });
  $('faviconFile').addEventListener('change',e=>{ const file=e.target.files[0]; if(!file)return; try{validateBrandFile(file,'favicon');previewObjectUrl($('faviconPreview'),file);}catch(err){toast(err.message);e.target.value='';} });
  const logoUrlInput=$('settingsForm').elements.logo_url; if(logoUrlInput) logoUrlInput.addEventListener('input',()=>{ if(logoUrlInput.value.trim()) $('brandLogoPreview').src=logoUrlInput.value.trim(); });
  const faviconUrlInput=$('settingsForm').elements.favicon_url; if(faviconUrlInput) faviconUrlInput.addEventListener('input',()=>{ if(faviconUrlInput.value.trim()) $('faviconPreview').src=faviconUrlInput.value.trim(); });
}

async function login(e){
  e.preventDefault(); msg('جارٍ تسجيل الدخول...',true);
  const {data,error}=await sb.auth.signInWithPassword({email:$('loginEmail').value.trim(),password:$('loginPassword').value});
  if(error) return msg(error.message);
  await enterAdmin(data.user);
}

async function signup(e){
  e.preventDefault(); msg('جارٍ إنشاء الحساب...',true);
  const {data,error}=await sb.auth.signUp({email:$('signupEmail').value.trim(),password:$('signupPassword').value});
  if(error) return msg(error.message);
  if(data.user) msg('تم إنشاء الحساب. إذا كان تأكيد البريد مفعّلًا، افتح رسالة التأكيد ثم سجّل الدخول.',true);
}

async function enterAdmin(user){
  const {data,error}=await sb.from('admins').select('*').eq('user_id',user.id).eq('active',true).maybeSingle();
  if(error||!data){ await sb.auth.signOut(); return msg('هذا الحساب ليس لديه صلاحية إدارة. يجب أن يكون البريد ضمن دعوات المدراء.'); }
  currentUser=user; currentAdmin=data;
  $('authScreen').classList.add('hidden'); $('adminApp').classList.remove('hidden');
  $('welcomeText').textContent=`مرحبًا، ${data.email}`; $('roleBadge').textContent=data.role==='super_admin'?'Super Admin':'Admin';
  if(data.role!=='super_admin') $('adminsNav').classList.add('hidden');
  await refreshAll();
}

function switchView(v,btn){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active-view')); $('view-'+v).classList.add('active-view');
  document.querySelectorAll('.sidebar nav button').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
  const names={overview:'لوحة التحكم',products:'المنتجات',settings:'معلومات المتجر',content:'محتوى الصفحة',media:'الصور والوسائط',admins:'المدراء والصلاحيات'};
  $('viewTitle').textContent=names[v]; if(v==='media')loadMedia(); if(v==='admins')loadAdmins();
}

async function refreshAll(){ await Promise.all([loadProducts(),loadSettings()]); if(currentAdmin.role==='super_admin') await loadAdmins(); await loadMedia(); $('statProducts').textContent=adminProducts.length; }

async function loadProducts(){
  const {data,error}=await sb.from('products').select('*').order('sort_order',{ascending:true});
  if(error) return toast(error.message);
  adminProducts=data||[];
  $('productsTable').innerHTML=adminProducts.map(p=>{
    const gallery=parseMaybeJSON(p.gallery_urls,[]);
    return `<tr><td><img class="thumb" src="${p.image_url||gallery[0]||''}"></td><td><b>${p.name}</b><br><small>${gallery.length?`${gallery.length} صور إضافية`:''}</small></td><td>${p.label||p.category}</td><td>${p.price} د.م</td><td><span class="pill ${p.active?'on':'off'}">${p.active?'ظاهر':'مخفي'}</span></td><td><div class="actions"><button onclick="editProduct(${p.id})">تعديل</button><button class="danger" onclick="deleteProduct(${p.id})">حذف</button></div></td></tr>`;
  }).join('');
  $('statProducts').textContent=adminProducts.length;
}

function setMeasureRow(f,prefix,row){
  const normalized=row||{};
  f.elements[`measure_${prefix}_key`].value=normalized.key||prefix.toUpperCase();
  f.elements[`measure_${prefix}_label`].value=normalized.label||'';
  f.elements[`measure_${prefix}_m`].value=normalized.M||'';
  f.elements[`measure_${prefix}_l`].value=normalized.L||'';
  f.elements[`measure_${prefix}_xl`].value=normalized.XL||'';
  f.elements[`measure_${prefix}_2xl`].value=normalized['2XL']||'';
}

function openProductEditor(p={}){
  const f=$('productForm'); f.reset();
  const gallery=parseMaybeJSON(p.gallery_urls,[]);
  const sizes=parseMaybeJSON(p.sizes,['M','L','XL','2XL']);
  const bullets=parseMaybeJSON(p.detail_bullets,[]);
  const rows=parseMaybeJSON(p.size_guide_rows,DEFAULT_ROWS);
  f.elements.id.value=p.id||'';
  f.elements.name.value=p.name||'';
  f.elements.category.value=p.category||'women';
  f.elements.label.value=p.label||'نسائي';
  f.elements.price.value=p.price||'';
  f.elements.old_price.value=p.old_price||'';
  f.elements.badge.value=p.badge||'';
  f.elements.sort_order.value=p.sort_order||0;
  f.elements.is_new.checked=!!p.is_new;
  f.elements.active.checked=p.active!==false;
  f.elements.image_url.value=p.image_url||'';
  f.elements.gallery_urls.value=gallery.join('\n');
  f.elements.description.value=p.description||'';
  f.elements.detail_bullets.value=bullets.join('\n');
  f.elements.color_name.value=p.color_name||'';
  f.elements.color_hex.value=p.color_hex||'#390e27';
  f.elements.sizes.value=sizes.join(', ');
  f.elements.size_guide_image_url.value=p.size_guide_image_url||'';
  setMeasureRow(f,'a',rows[0]||DEFAULT_ROWS[0]); setMeasureRow(f,'b',rows[1]||DEFAULT_ROWS[1]); setMeasureRow(f,'c',rows[2]||DEFAULT_ROWS[2]);
  $('productImageFile').value=''; $('productGalleryFiles').value=''; $('sizeGuideImageFile').value='';
  $('productDialogTitle').textContent=p.id?'تعديل المنتج':'إضافة منتج';
  $('productDialog').showModal();
}

window.editProduct=id=>openProductEditor(adminProducts.find(p=>Number(p.id)===Number(id)));
window.deleteProduct=async id=>{
  if(!confirm('حذف هذا المنتج نهائيًا؟'))return;
  const {error}=await sb.from('products').delete().eq('id',id);
  if(error)return toast(error.message); toast('تم حذف المنتج'); loadProducts();
};

function readMeasureRows(f){
  return ['a','b','c'].map(prefix=>({
    key:f.elements[`measure_${prefix}_key`].value.trim(),
    label:f.elements[`measure_${prefix}_label`].value.trim(),
    M:f.elements[`measure_${prefix}_m`].value.trim(),
    L:f.elements[`measure_${prefix}_l`].value.trim(),
    XL:f.elements[`measure_${prefix}_xl`].value.trim(),
    '2XL':f.elements[`measure_${prefix}_2xl`].value.trim()
  }));
}

async function saveProduct(e){
  e.preventDefault();
  const f=e.target;
  const submit=f.querySelector('button[type="submit"]'); submit.disabled=true; submit.textContent='جارٍ الحفظ...';
  try {
    let image=f.elements.image_url.value.trim();
    const mainFile=$('productImageFile').files[0];
    if(mainFile) image=await uploadOne(mainFile,'main');

    let gallery=lines(f.elements.gallery_urls.value);
    const galleryFiles=[...$('productGalleryFiles').files];
    if(galleryFiles.length){ const uploaded=await uploadMany(galleryFiles,'gallery'); gallery=[...gallery,...uploaded]; }
    gallery=[...new Set(gallery.filter(Boolean).filter(x=>x!==image))];

    let guideImage=f.elements.size_guide_image_url.value.trim();
    const guideFile=$('sizeGuideImageFile').files[0];
    if(guideFile) guideImage=await uploadOne(guideFile,'guides');

    const payload={
      name:f.elements.name.value.trim(), category:f.elements.category.value, label:f.elements.label.value.trim(),
      price:Number(f.elements.price.value), old_price:f.elements.old_price.value?Number(f.elements.old_price.value):null,
      badge:f.elements.badge.value.trim()||null, sort_order:Number(f.elements.sort_order.value)||0,
      is_new:f.elements.is_new.checked, active:f.elements.active.checked, image_url:image,
      description:f.elements.description.value.trim(), detail_bullets:lines(f.elements.detail_bullets.value),
      gallery_urls:gallery, color_name:f.elements.color_name.value.trim(), color_hex:f.elements.color_hex.value||'#390e27',
      sizes:String(f.elements.sizes.value||'').split(',').map(x=>x.trim()).filter(Boolean),
      size_guide_image_url:guideImage, size_guide_rows:readMeasureRows(f), updated_at:new Date().toISOString()
    };

    let error;
    if(f.elements.id.value) ({error}=await sb.from('products').update(payload).eq('id',f.elements.id.value));
    else ({error}=await sb.from('products').insert(payload));
    if(error) throw error;
    $('productDialog').close(); toast('تم حفظ المنتج وكل تفاصيله'); await loadProducts();
  } catch(err){ toast(err.message||'تعذر حفظ المنتج'); }
  finally { submit.disabled=false; submit.textContent='حفظ كل التعديلات'; }
}

async function uploadOne(file,folder='media'){
  const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
  const path=`${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const {error}=await sb.storage.from('product-images').upload(path,file,{upsert:false,cacheControl:'3600'});
  if(error) throw error;
  return sb.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}

async function uploadMany(files,folder='gallery'){
  const urls=[];
  for(const file of files) urls.push(await uploadOne(file,folder));
  return urls;
}

async function loadPublicBranding(){
  try{
    const {data}=await sb.from('store_settings').select('data').eq('id',1).maybeSingle();
    const d=data?.data||{};
    const logo=d.logo_url||d.logo_light_url||'assets/logo.svg';
    const fav=d.favicon_url||d.logo_url||'assets/logo.svg';
    if($('adminAuthLogo')) $('adminAuthLogo').src=logo;
    if($('adminSidebarLogo')) $('adminSidebarLogo').src=logo;
    if($('adminFavicon')) $('adminFavicon').href=fav;
  }catch(e){}
}

async function loadSettings(){
  const {data,error}=await sb.from('store_settings').select('data').eq('id',1).maybeSingle();
  if(error)return toast(error.message); storeSettings=data?.data||{};
  [$('settingsForm'),$('contentForm')].forEach(form=>{ [...form.elements].forEach(el=>{
    if(!el.name) return;
    let value=storeSettings[el.name];
    if(el.name==='logo_url' && !value) value=storeSettings.logo_light_url;
    if(el.type==='checkbox') el.checked = value === true || String(value)==='true';
    else if(value!==undefined && value!==null) el.value=value;
  }); });
  renderBrandingPreview();
}
function renderBrandingPreview(){
  const logo=storeSettings.logo_url||storeSettings.logo_light_url||'assets/logo-light.svg';
  const fav=storeSettings.favicon_url||storeSettings.logo_url||'assets/logo.svg';
  if($('brandLogoPreview')&&!$('brandLogoFile').files.length) $('brandLogoPreview').src=logo;
  if($('faviconPreview')&&!$('faviconFile').files.length) $('faviconPreview').src=fav;
  if($('adminSidebarLogo')) $('adminSidebarLogo').src=logo;
  if($('adminAuthLogo')) $('adminAuthLogo').src=logo;
  if($('adminFavicon')) $('adminFavicon').href=fav;
}
async function saveSettings(e){
  e.preventDefault();
  const form=e.target; const submit=form.querySelector('button[type="submit"]');
  if(submit){submit.disabled=true;submit.textContent='جارٍ الحفظ...';}
  try{
    const patch={};
    [...form.elements].forEach(el=>{if(el.name)patch[el.name]=el.type==='checkbox'?el.checked:el.value});
    if(form.id==='settingsForm'){
      const logoFile=$('brandLogoFile').files[0];
      const faviconFile=$('faviconFile').files[0];
      if(logoFile){ validateBrandFile(logoFile,'logo'); const url=await uploadOne(logoFile,'branding/logo'); patch.logo_url=url; patch.logo_light_url=url; }
      else if(patch.logo_url) patch.logo_light_url=patch.logo_url;
      if(faviconFile){ validateBrandFile(faviconFile,'favicon'); patch.favicon_url=await uploadOne(faviconFile,'branding/favicon'); }
    }
    const merged={...storeSettings,...patch};
    const {error}=await sb.from('store_settings').upsert({id:1,data:merged,updated_at:new Date().toISOString()});
    if(error) throw error;
    storeSettings=merged;
    if(form.id==='settingsForm'){ $('brandLogoFile').value=''; $('faviconFile').value=''; renderBrandingPreview(); }
    toast('تم حفظ التعديلات والهوية البصرية');
  }catch(err){ toast(err.message||'تعذر حفظ التعديلات'); }
  finally{ if(submit){submit.disabled=false;submit.textContent=form.id==='settingsForm'?'حفظ معلومات المتجر والهوية':'حفظ محتوى الصفحة';} }
}

async function listStorageRecursive(prefix=''){
  const {data,error}=await sb.storage.from('product-images').list(prefix,{limit:200,sortBy:{column:'created_at',order:'desc'}});
  if(error) throw error;
  const files=[];
  for(const item of data||[]){
    const path=prefix?`${prefix}/${item.name}`:item.name;
    if(item.id) files.push({name:path,created_at:item.created_at});
    else if(!item.name.startsWith('.')) files.push(...await listStorageRecursive(path));
  }
  return files;
}

async function loadMedia(){
  try{
    const files=await listStorageRecursive('');
    $('statMedia').textContent=files.length;
    $('mediaGrid').innerHTML=files.map(f=>{const url=sb.storage.from('product-images').getPublicUrl(f.name).data.publicUrl;return `<div class="media-card" title="انقر على الصورة لنسخ الرابط"><img src="${url}" onclick="copyMediaUrl('${encodeURIComponent(url)}')"><button onclick="deleteMedia('${encodeURIComponent(f.name)}')">×</button></div>`}).join('')||'<p>لا توجد صور مرفوعة بعد.</p>';
  }catch(error){ $('mediaGrid').innerHTML='<p>تعذر قراءة مخزن الصور.</p>'; }
}
async function uploadMedia(e){
  for(const file of [...e.target.files]){ try{await uploadOne(file,'media')}catch(err){toast(err.message);break} }
  e.target.value=''; toast('تم رفع الصور'); loadMedia();
}
window.copyMediaUrl=async enc=>{const url=decodeURIComponent(enc);await navigator.clipboard.writeText(url);toast('تم نسخ رابط الصورة');};
window.deleteMedia=async enc=>{const name=decodeURIComponent(enc);if(!confirm('حذف الصورة من المخزن؟'))return;const {error}=await sb.storage.from('product-images').remove([name]);if(error)return toast(error.message);toast('تم حذف الصورة');loadMedia();};

async function loadAdmins(){
  if(currentAdmin?.role!=='super_admin')return;
  const [{data:a},{data:i}]=await Promise.all([sb.from('admins').select('*').order('created_at'),sb.from('admin_invites').select('*').order('created_at',{ascending:false})]);
  $('statAdmins').textContent=(a||[]).length;
  $('adminsList').innerHTML=(a||[]).map(x=>`<div class="list-row"><div><b>${x.email}</b><br><small>${x.role}</small></div>${x.user_id===currentUser.id?'<span>أنت</span>':`<button onclick="removeAdmin('${x.user_id}')">حذف</button>`}</div>`).join('');
  $('invitesList').innerHTML=(i||[]).map(x=>`<div class="list-row"><div><b>${x.email}</b><br><small>${x.role}</small></div><button onclick="removeInvite('${encodeURIComponent(x.email)}')">إلغاء الدعوة</button></div>`).join('')||'<p>لا توجد دعوات معلقة.</p>';
}
async function inviteAdmin(e){e.preventDefault();if(currentAdmin.role!=='super_admin')return;const payload={email:$('inviteEmail').value.trim().toLowerCase(),role:$('inviteRole').value,invited_by:currentUser.id};const {error}=await sb.from('admin_invites').upsert(payload);if(error)return toast(error.message);$('inviteEmail').value='';toast('تمت إضافة دعوة المدير');loadAdmins();}
window.removeInvite=async enc=>{await sb.from('admin_invites').delete().eq('email',decodeURIComponent(enc));loadAdmins();};
window.removeAdmin=async id=>{if(!confirm('إزالة صلاحية هذا المدير؟'))return;await sb.from('admins').delete().eq('user_id',id);loadAdmins();};

init();
