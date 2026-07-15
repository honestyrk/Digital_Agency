-- Run once in the Supabase SQL editor after schema.sql, to let the
-- authenticated admin manage content that's otherwise public-read-only.
-- Create the admin account first under Authentication -> Users -> Add user.

create policy "Authenticated manage projects" on public.projects
  for all to authenticated using (true) with check (true);

create policy "Authenticated manage testimonials" on public.testimonials
  for all to authenticated using (true) with check (true);
