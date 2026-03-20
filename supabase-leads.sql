
create table if not exists public.consulting_leads (
    id uuid default gen_random_uuid() primary key,
    contact_info text not null,
    bottleneck_type text not null,
    business_desc text,
    status text default 'pending' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

