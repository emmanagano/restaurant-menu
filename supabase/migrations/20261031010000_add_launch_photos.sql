-- Launch photos, all from Pexels (free to use under the Pexels License).
-- Alt text describes what is actually in each frame. Safe to run more than once.

insert into public.images (path, alt, width, height, source, source_url, photographer, license, credit_line)
select v.path, v.alt, v.width, v.height, v.source, v.source_url, v.photographer, v.license, v.credit_line
from (
  values
    (
      '/images/hero-desktop.jpg',
      'Marinated meat skewers cooking over smoking charcoal on a grill',
      2400, 1350, 'pexels',
      'https://www.pexels.com/photo/meat-skewers-2233730/',
      'Samer Daboul', 'Pexels License', 'Photo by Samer Daboul on Pexels (cropped)'
    ),
    (
      '/images/hero-mobile.jpg',
      'Close view of marinated meat skewers grilling over smoking charcoal',
      1080, 1350, 'pexels',
      'https://www.pexels.com/photo/meat-skewers-2233730/',
      'Samer Daboul', 'Pexels License', 'Photo by Samer Daboul on Pexels (cropped)'
    ),
    (
      '/images/story.jpg',
      'Skewers and chicken pieces grilling over charcoal on a portable grill in a grassy yard, with smoke rising',
      1800, 1200, 'pexels',
      'https://www.pexels.com/photo/meat-on-grill-in-yard-12932332/',
      'Atlantic Ambience', 'Pexels License', 'Photo by Atlantic Ambience on Pexels (cropped)'
    ),
    (
      '/images/bodega.jpg',
      'Long wooden table set with plates, glasses and lit candles in a dim hall',
      1800, 1200, 'pexels',
      'https://www.pexels.com/photo/banquet-table-with-candles-and-plates-4992827/',
      'Rachel Claire', 'Pexels License', 'Photo by Rachel Claire on Pexels'
    ),
    (
      '/images/embers.jpg',
      'Glowing charcoal embers and small flames in the dark',
      2400, 1350, 'pexels',
      'https://www.pexels.com/photo/fire-over-charcoal-in-darkness-14887408/',
      'Shayne Spencer', 'Pexels License', 'Photo by Shayne Spencer on Pexels (cropped)'
    )
) as v(path, alt, width, height, source, source_url, photographer, license, credit_line)
where not exists (select 1 from public.images i where i.path = v.path);
