-- Run once in the Supabase SQL editor after schema.sql, to let the
-- authenticated admin upload testimonial photos/videos from the admin
-- panel (Admin.jsx) directly into the public `images`/`videos` buckets.

create policy "Authenticated upload images/videos" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('images', 'videos'));

create policy "Authenticated update images/videos" on storage.objects
  for update to authenticated
  using (bucket_id in ('images', 'videos'))
  with check (bucket_id in ('images', 'videos'));

create policy "Authenticated delete images/videos" on storage.objects
  for delete to authenticated
  using (bucket_id in ('images', 'videos'));
