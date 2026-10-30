-- Dish photos from Wikimedia Commons, with the attribution each license requires.
-- Alt text describes what is in each frame, which can differ from the dish it stands in for.
-- Also links each photo to its dish. Safe to run more than once.

insert into public.images (path, alt, width, height, source, source_url, photographer, license, credit_line)
select v.path, v.alt, v.width, v.height, v.source, v.source_url, v.photographer, v.license, v.credit_line
from (
  values
    (
      '/images/dish-sisig.jpg',
      'Sisig on a cast-iron plate topped with an egg, red onion rings, green chilies, calamansi halves and crispy pork bits',
      1200, 1200, 'wikimedia',
      'https://commons.wikimedia.org/wiki/File:Sizzling_Sisig.jpg',
      'Ej Afable', 'CC BY-SA 4.0',
      '"Sizzling Sisig" by Ej Afable, CC BY-SA 4.0, via Wikimedia Commons (cropped)'
    ),
    (
      '/images/dish-kare.jpg',
      'Oxtail pieces and greens in a creamy orange peanut sauce in a white bowl',
      1200, 1200, 'wikimedia',
      'https://commons.wikimedia.org/wiki/File:Kare-kare_oxtail_stew_1.jpg',
      'takaokun', 'CC BY 2.0',
      '"Kare-kare oxtail stew" by takaokun, CC BY 2.0, via Wikimedia Commons (cropped)'
    ),
    (
      '/images/dish-halo.jpg',
      'Glass of shaved ice heaped with diced fruit, sweet corn, green jelly and a slice of purple yam',
      1200, 1200, 'wikimedia',
      'https://commons.wikimedia.org/wiki/File:Famous_Halo-Halo_from_the_Philippines.jpg',
      'Elmer B. Domingo', 'CC BY-SA 4.0',
      '"Famous Halo-Halo from the Philippines" by Elmer B. Domingo, CC BY-SA 4.0, via Wikimedia Commons (cropped)'
    ),
    (
      '/images/dish-fish.jpg',
      'Two grilled whole fish on a steel platter with sliced carrot and a red vegetable rose as garnish',
      1200, 1200, 'wikimedia',
      'https://commons.wikimedia.org/wiki/File:Plated_grilled_fish.jpg',
      'pompi', 'CC0',
      '"Plated grilled fish" by pompi, CC0, via Wikimedia Commons (cropped)'
    )
) as v(path, alt, width, height, source, source_url, photographer, license, credit_line)
where not exists (select 1 from public.images i where i.path = v.path);

update public.dishes as d
set image_id = i.id
from public.images as i
join (
  values
    ('sizzling-sisig', '/images/dish-sisig.jpg'),
    ('kare-kare', '/images/dish-kare.jpg'),
    ('halo-halo-kapampangan', '/images/dish-halo.jpg'),
    ('tilapia-sa-buro', '/images/dish-fish.jpg')
) as m(slug, path) on m.path = i.path
where d.slug = m.slug;
