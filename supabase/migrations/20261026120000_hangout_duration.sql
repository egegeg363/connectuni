-- Hangouts are temporary: hosts choose a duration from 30 minutes up to 6 hours.
alter table public.hangouts
  add column if not exists duration_minutes int not null default 30
  check (duration_minutes between 30 and 360 and duration_minutes % 30 = 0);
