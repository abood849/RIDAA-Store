-- RIDAA Store V5 upgrade
-- Safe to run on the existing RIDAA Supabase project.
-- Adds advanced gallery, colors, product details and editable size guides.

alter table public.products add column if not exists gallery_urls jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists color_name text;
alter table public.products add column if not exists color_hex text not null default '#390e27';
alter table public.products add column if not exists sizes jsonb not null default '["M","L","XL","2XL"]'::jsonb;
alter table public.products add column if not exists detail_bullets jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists size_guide_image_url text;
alter table public.products add column if not exists size_guide_rows jsonb not null default '[
  {"key":"A","label":"محيط الصدر","M":"48","L":"52","XL":"56","2XL":"60"},
  {"key":"B","label":"الطول الكامل","M":"150","L":"150","XL":"150","2XL":"150"},
  {"key":"C","label":"طول الكم","M":"64","L":"64","XL":"64","2XL":"64"}
]'::jsonb;

-- Give existing catalog sensible defaults without changing current images/prices.
update public.products
set sizes='["M","L","XL","2XL"]'::jsonb
where sizes is null or jsonb_array_length(sizes)=0;

update public.products
set size_guide_rows='[
  {"key":"A","label":"محيط الصدر","M":"48","L":"52","XL":"56","2XL":"60"},
  {"key":"B","label":"الطول الكامل","M":"150","L":"150","XL":"150","2XL":"150"},
  {"key":"C","label":"طول الكم","M":"64","L":"64","XL":"64","2XL":"64"}
]'::jsonb
where size_guide_rows is null or jsonb_array_length(size_guide_rows)=0;

-- RLS remains exactly as configured in V4. Existing admin policies cover the new columns automatically.
