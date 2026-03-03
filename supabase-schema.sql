-- Tabel RSVP Bukber
create table rsvp_bukber (
  id          bigint generated always as identity primary key,
  nama        text        not null,
  nomor_telp  text        not null,
  ip_address  text,
  created_at  timestamptz default now()
);

-- Tabel Pesan Bukber
create table pesan_bukber (
  id          bigint generated always as identity primary key,
  name        text        not null,
  message     text        not null,
  created_at  timestamptz default now()
);

-- Enable Row Level Security
alter table rsvp_bukber  enable row level security;
alter table pesan_bukber enable row level security;

-- Policy: siapa saja bisa insert (tamu isi form)
create policy "allow insert rsvp"
  on rsvp_bukber for insert
  to anon with check (true);

create policy "allow insert pesan"
  on pesan_bukber for insert
  to anon with check (true);

-- Policy: siapa saja bisa baca pesan (ditampilkan di halaman)
create policy "allow select pesan"
  on pesan_bukber for select
  to anon using (true);

-- Policy: cek duplikat RSVP by IP (select by ip_address)
create policy "allow select rsvp by ip"
  on rsvp_bukber for select
  to anon using (true);
