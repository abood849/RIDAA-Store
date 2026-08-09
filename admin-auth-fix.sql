-- RIDAA Admin Auth Fix
-- Run this ONCE in Supabase > SQL Editor for an existing RIDAA installation.
-- It fixes the case where an Auth user existed BEFORE being invited as an admin.

create or replace function public.claim_my_admin_invite()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  my_uid uuid := auth.uid();
  my_email text := auth.jwt() ->> 'email';
  invite_role text;
begin
  if my_uid is null or my_email is null then
    return false;
  end if;

  select i.role into invite_role
  from public.admin_invites i
  where lower(i.email::text)=lower(my_email)
  limit 1;

  if invite_role is null then
    return false;
  end if;

  insert into public.admins(user_id,email,role,active)
  values (my_uid,my_email,invite_role,true)
  on conflict (user_id) do update
    set email=excluded.email, role=excluded.role, active=true;

  delete from public.admin_invites
  where lower(email::text)=lower(my_email);

  return true;
end;
$$;

revoke all on function public.claim_my_admin_invite() from public;
grant execute on function public.claim_my_admin_invite() to authenticated;

-- Keep the original trigger for brand-new Auth users.
create or replace function public.claim_admin_invite()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if exists(select 1 from public.admin_invites i where lower(i.email::text)=lower(new.email)) then
    insert into public.admins(user_id,email,role)
    select new.id,new.email,i.role from public.admin_invites i where lower(i.email::text)=lower(new.email)
    on conflict (user_id) do update set email=excluded.email, role=excluded.role, active=true;
    delete from public.admin_invites where lower(email::text)=lower(new.email);
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_ridaa on auth.users;
create trigger on_auth_user_created_ridaa after insert on auth.users for each row execute procedure public.claim_admin_invite();
