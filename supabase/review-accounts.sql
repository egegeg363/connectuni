-- ConnectUni test university: accounts for the App Store review and for our own tests.
-- Nobody else sees these accounts, and they see nobody else. They log in with a password instead of a code.
--
-- 1. Supabase → Authentication → Users → Add user → Create new user, with "Auto Confirm User" ticked:
--    review@connect-uni.de, test@connect-uni.de and loeschtest@connect-uni.de (password: PRUEFKONTEN.local.md).
-- 2. SQL Editor → paste this file → Run. It is safe to run again, e.g. before each submission: it only adds
--    what is missing and plans new hangouts once the old ones are over.

insert into public.uni_domains (domain, uni_id) values ('connect-uni.de', 'connectuni') on conflict (domain) do nothing;

insert into public.profiles (id, name, birth_year, uni_id, uni_name, uni_short, major, minor, semester, interests, bio, photo_url)
select u.id, p.name, p.birth_year, 'connectuni', 'ConnectUni Test-Uni', 'ConnectUni', p.major, p.minor, p.semester, p.interests, p.bio,
  'https://images.unsplash.com/photo-' || p.photo || '?w=900&h=1125&fit=crop&crop=faces&auto=format&q=80'
from (values
  ('review@connect-uni.de', 'Alex Becker', 2003, 'cs', 'psy', 3, array['coding', 'coffee', 'gaming', 'music'],
   'Informatik im 3. Semester, Psychologie im Nebenfach. Immer für einen Kaffee zu haben ☕', '1507003211169-0a1dd7228f2d'),
  ('test@connect-uni.de', 'Mia Wagner', 2004, 'cs', 'math', 3, array['coffee', 'books', 'running', 'travel'],
   'Info und Mathe. Suche Leute für die Lerngruppe und die Mensa 📚', '1494790108377-be9c29b29330'),
  ('loeschtest@connect-uni.de', 'Jonas Weber', 2002, 'bwl', null, 5, array['football', 'cooking', 'startups'],
   'Testkonto zum Ausprobieren von „Konto löschen“.', '1506794778202-cad84cf45f1d')
) as p (email, name, birth_year, major, minor, semester, interests, bio, photo)
join auth.users u on lower(u.email) = p.email
on conflict (id) do nothing;

-- Something to see right away: a wave and a message from Mia, an invite to her study group and hangouts.
do $$
declare
  alex uuid := (select p.id from public.profiles p join auth.users u on u.id = p.id where lower(u.email) = 'review@connect-uni.de');
  mia uuid := (select p.id from public.profiles p join auth.users u on u.id = p.id where lower(u.email) = 'test@connect-uni.de');
  today timestamp := date_trunc('day', now() at time zone 'Europe/Berlin');
  convo uuid;
  circle uuid;
begin
  if alex is null or mia is null then
    raise exception 'Create review@connect-uni.de and test@connect-uni.de under Authentication → Users first.';
  end if;

  if not exists (select 1 from public.waves where (from_id, to_id) in ((mia, alex), (alex, mia))) then
    insert into public.waves (from_id, to_id) values (mia, alex);
  end if;

  if not exists (
    select 1 from public.conversations c
    join public.conversation_members a on a.conversation_id = c.id and a.user_id = alex
    join public.conversation_members b on b.conversation_id = c.id and b.user_id = mia
    where c.kind = 'dm'
  ) then
    insert into public.conversations (kind) values ('dm') returning id into convo;
    insert into public.conversation_members (conversation_id, user_id) values (convo, alex), (convo, mia);
    insert into public.messages (conversation_id, sender_id, body)
      values (convo, mia, 'Hey Alex! Bist du auch in Info 1? Wollen wir zusammen für die Übungsblätter lernen? 📚');
  end if;

  if not exists (select 1 from public.groups where owner_id = mia) then
    insert into public.groups (owner_id, uni_id, emoji, name, about)
      values (mia, 'connectuni', '💻', 'Info-1-Lerngruppe', 'Übungsblätter zusammen, jeden Donnerstag') returning id into circle;
    insert into public.group_members (group_id, user_id, status, invited_by) values (circle, alex, 'invited', mia);
  end if;

  if not exists (select 1 from public.hangouts where uni_id = 'connectuni' and starts_at > now() + interval '12 hours') then
    insert into public.hangouts (host_id, uni_id, type, title, place, starts_at, max_people) values
      (mia, 'connectuni', 'mensa', 'Mittagessen in der Mensa', 'Mensa', (today + interval '1 day 12 hours 30 minutes') at time zone 'Europe/Berlin', 6),
      (mia, 'connectuni', 'coffee', 'Kaffee nach der Vorlesung', 'Café am Campus', (today + interval '2 days 15 hours') at time zone 'Europe/Berlin', 4),
      (mia, 'connectuni', 'study', 'Zusammen für Analysis lernen', 'Bibliothek', (today + interval '3 days 10 hours') at time zone 'Europe/Berlin', 5);
  end if;
end $$;
