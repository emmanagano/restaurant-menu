-- Uling concept site: initial schema.
-- Content tables are readable by anon. Submission tables are insert-only for anon.
-- RLS is on for every table.

-- ---------------------------------------------------------------- content

create table public.images (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  alt text not null,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  source text not null check (source in ('unsplash', 'pexels', 'pixabay', 'wikimedia', 'own')),
  source_url text,
  photographer text,
  license text,
  credit_line text
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort integer not null default 0
);

create table public.dishes (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text not null,
  price_php integer not null check (price_php >= 0),
  tags text[] not null default '{}'
    check (tags <@ array['spicy', 'pork_free', 'vegetarian', 'seafood']),
  is_signature boolean not null default false,
  -- Alt text from the content deck, used until a photo is logged in `images`.
  alt text,
  image_id uuid references public.images (id) on delete set null,
  sort integer not null default 0
);
create index dishes_category_id_idx on public.dishes (category_id);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text not null,
  barangay text not null,
  city text not null,
  region text not null,
  lat double precision,
  lng double precision,
  phone text not null,
  -- { "0": { "open": "10:00", "close": "22:00" }, ... "6": null }, 0 = Sunday, 24-hour.
  -- A close at or before the open time means the next day (see src/lib/hours.ts).
  hours jsonb not null,
  maps_url text,
  parking text,
  feature text,
  image_id uuid references public.images (id) on delete set null
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('catering', 'event', 'gift_card')),
  name text not null,
  description text,
  price_php integer check (price_php >= 0),
  -- "per guest, min 50", "quoted per event"…
  price_note text,
  sort integer not null default 0
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort integer not null default 0
);

-- Sample data only. Reviewers are fictional.
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  source_label text,
  rating integer check (rating between 1 and 5),
  sort integer not null default 0
);

-- ------------------------------------------------------------ submissions

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations (id) on delete restrict,
  date date not null,
  time time not null,
  party_size integer not null check (party_size between 1 and 12),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 5 and 40),
  notes text check (char_length(notes) <= 1000),
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('catering', 'event', 'contact')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (char_length(phone) <= 40),
  event_date date,
  guests integer check (guests > 0),
  -- Venue or branch, depending on the form.
  location text check (char_length(location) <= 200),
  budget text check (char_length(budget) <= 100),
  message text check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

create table public.newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) between 3 and 254),
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------------- RLS

alter table public.images enable row level security;
alter table public.categories enable row level security;
alter table public.dishes enable row level security;
alter table public.locations enable row level security;
alter table public.packages enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.bookings enable row level security;
alter table public.enquiries enable row level security;
alter table public.newsletter enable row level security;

-- Start from nothing, then grant only what each role needs.
revoke all on all tables in schema public from anon, authenticated;

-- Content: select only (images are read for dish photos and the /credits page).
grant select on public.images, public.categories, public.dishes, public.locations,
  public.packages, public.faqs, public.testimonials to anon;

create policy "content is public" on public.images for select to anon using (true);
create policy "content is public" on public.categories for select to anon using (true);
create policy "content is public" on public.dishes for select to anon using (true);
create policy "content is public" on public.locations for select to anon using (true);
create policy "content is public" on public.packages for select to anon using (true);
create policy "content is public" on public.faqs for select to anon using (true);
create policy "content is public" on public.testimonials for select to anon using (true);

-- Submissions: insert only. Server actions must not chain `.select()` after insert.
grant insert on public.bookings, public.enquiries, public.newsletter to anon;

create policy "anyone can book" on public.bookings for insert to anon with check (true);
create policy "anyone can enquire" on public.enquiries for insert to anon with check (true);
create policy "anyone can subscribe" on public.newsletter for insert to anon with check (true);
