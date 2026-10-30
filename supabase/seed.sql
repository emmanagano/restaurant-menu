-- Generated from docs/content-deck.md. Edit the deck, then regenerate. Sample data only.

insert into public.categories (name, slug, sort) values
  ('Pulutan & starters', 'pulutan-and-starters', 1),
  ('Over the coals', 'over-the-coals', 2),
  ('Heirloom classics', 'heirloom-classics', 3),
  ('Rice & sides', 'rice-and-sides', 4),
  ('Desserts', 'desserts', 5),
  ('Drinks', 'drinks', 6);

insert into public.dishes (category_id, name, slug, description, price_php, tags, is_signature, alt, sort) values
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Sizzling Sisig', 'sizzling-sisig', 'Pig''s face and ears, grilled, chopped to order, with calamansi, chili and a raw egg cracked on the hot plate', 395, array['spicy']::text[], true, 'Sizzling pork sisig on a cast-iron plate with a raw egg and calamansi', 1),
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Crispy Tofu Sisig', 'crispy-tofu-sisig', 'Our sisig method with crisp tofu and mushrooms', 325, array['vegetarian', 'pork_free', 'spicy']::text[], false, 'Tofu and mushroom sisig on a sizzling plate topped with chili', 2),
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Chicharon Bulaklak', 'chicharon-bulaklak', 'Crisp-fried pork ruffle fat with spiced cane vinegar', 285, array[]::text[], false, 'Golden chicharon bulaklak in a bamboo basket with vinegar dip', 3),
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Tokwa''t Baboy', 'tokwat-baboy', 'Fried tofu and braised pork belly in soy-vinegar with onions', 295, array[]::text[], false, 'Cubes of fried tofu and pork belly in a dark soy-vinegar sauce', 4),
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Ensaladang Pako', 'ensaladang-pako', 'Fiddlehead fern salad with salted egg, tomato and red onion', 245, array['vegetarian', 'pork_free']::text[], false, 'Bright green fiddlehead ferns with salted egg and tomato', 5),
  ((select id from public.categories where slug = 'pulutan-and-starters'), 'Kamaru (for the brave)', 'kamaru', 'Mole crickets sautéed with garlic, tomato and onion, a Kapampangan delicacy', 345, array['pork_free']::text[], false, 'Sautéed mole crickets with tomato and garlic in a clay bowl', 6),
  ((select id from public.categories where slug = 'over-the-coals'), 'Charcoal Pork Belly', 'charcoal-pork-belly', 'Liempo marinated overnight in calamansi and garlic, grilled until the edges blister', 485, array[]::text[], true, 'Charred slices of grilled pork belly on a banana leaf', 1),
  ((select id from public.categories where slug = 'over-the-coals'), 'Pindang Damulag', 'pindang-damulag', 'Cured carabao tapa, sweet and garlicky, grilled and served with fried egg and atchara', 520, array['pork_free']::text[], true, 'Glazed carabao tapa slices with a fried egg and pickled papaya', 2),
  ((select id from public.categories where slug = 'over-the-coals'), 'Inihaw na Pusit', 'inihaw-na-pusit', 'Whole squid stuffed with tomato and onion, grilled and brushed with soy-calamansi', 495, array['pork_free', 'seafood']::text[], false, 'Grilled whole squid sliced open to show tomato and onion filling', 3),
  ((select id from public.categories where slug = 'over-the-coals'), 'Tilapia sa Buro', 'tilapia-sa-buro', 'Grilled river tilapia with buro (fermented rice) and blanched mustasa leaves for wrapping', 445, array['pork_free', 'seafood']::text[], true, 'Grilled tilapia beside a bowl of pink buro and mustard leaves', 4),
  ((select id from public.categories where slug = 'over-the-coals'), 'Chicken Inasal Kapampangan', 'chicken-inasal-kapampangan', 'Half chicken in annatto, lemongrass and vinegar, basted with garlic oil', 425, array['pork_free']::text[], false, 'Half grilled chicken glowing orange with annatto, with garlic rice', 5),
  ((select id from public.categories where slug = 'over-the-coals'), 'Grilled Eggplant & Itlog na Maalat', 'grilled-eggplant-itlog-na-maalat', 'Smoky eggplant with salted egg and tomato', 265, array['vegetarian', 'pork_free']::text[], false, 'Charred eggplant split open with salted egg and tomato', 6),
  ((select id from public.categories where slug = 'over-the-coals'), 'Uling Family Grill', 'uling-family-grill', 'Pork belly, carabao tapa, chicken, squid, eggplant, rice and three sawsawan. Feeds 4–5', 1850, array['seafood']::text[], true, 'A large wooden board piled with grilled meats, squid and rice', 7),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Kare-Kare', 'kare-kare', 'Oxtail and tripe stew in peanut sauce we grind daily, with banana heart, eggplant and string beans; bagoong on the side', 645, array[]::text[], true, 'Oxtail kare-kare in a clay pot with vegetables and shrimp paste', 1),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Bulanglang Kapampangan', 'bulanglang-kapampangan', 'Pork ribs in a guava-soured broth with squash, okra and kangkong', 495, array[]::text[], false, 'Light pink guava broth with pork ribs, squash and greens', 2),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Tidtad', 'tidtad', 'Kapampangan pork blood stew, rich and tangy, with puto on the side', 395, array['spicy']::text[], false, 'Dark pork blood stew in a bowl with white rice cakes beside it', 3),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Morcon', 'morcon', 'Rolled beef stuffed with egg, sausage and pickles, braised in tomato', 595, array[]::text[], false, 'Sliced beef roll showing egg and sausage in tomato sauce', 4),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Bringhe', 'bringhe', 'Coconut-milk sticky rice with turmeric, chicken and peppers, cooked in a banana-leaf-lined pan', 455, array['pork_free']::text[], false, 'Golden turmeric sticky rice with chicken in a banana-leaf-lined pan', 5),
  ((select id from public.categories where slug = 'heirloom-classics'), 'Pinakbet Kapampangan', 'pinakbet-kapampangan', 'Squash, okra, eggplant and bitter melon with a little bagoong', 285, array[]::text[], false, 'Colorful vegetable stew with squash and bitter melon', 6),
  ((select id from public.categories where slug = 'rice-and-sides'), 'Garlic Rice', 'garlic-rice', 'Toasted garlic, day-old rice, as it should be', 75, array['vegetarian', 'pork_free']::text[], false, 'Bowl of garlic fried rice topped with toasted garlic', 1),
  ((select id from public.categories where slug = 'rice-and-sides'), 'Java Rice', 'java-rice', 'Annatto-butter rice', 85, array['vegetarian', 'pork_free']::text[], false, 'Orange-tinted java rice in a bowl', 2),
  ((select id from public.categories where slug = 'rice-and-sides'), 'Atchara', 'atchara', 'House-pickled green papaya', 65, array['vegetarian', 'pork_free']::text[], false, 'Small jar of pickled papaya with carrots and ginger', 3),
  ((select id from public.categories where slug = 'rice-and-sides'), 'Sawsawan Trio', 'sawsawan-trio', 'Spiced cane vinegar, soy-calamansi, and chili-garlic oil', 45, array['vegetarian', 'pork_free', 'spicy']::text[], false, 'Three small dipping sauces in ceramic dishes', 4),
  ((select id from public.categories where slug = 'desserts'), 'Halo-Halo Kapampangan', 'halo-halo-kapampangan', 'The minimalist kind: carabao-milk pastillas, sweet beans, leche flan and finely shaved ice', 245, array['vegetarian', 'pork_free']::text[], true, 'Tall glass of halo-halo with shaved ice, leche flan and beans', 1),
  ((select id from public.categories where slug = 'desserts'), 'Tibok-Tibok', 'tibok-tibok', 'Silky carabao-milk pudding topped with latik', 195, array['vegetarian', 'pork_free']::text[], false, 'White carabao milk pudding squares topped with toasted coconut curds', 2),
  ((select id from public.categories where slug = 'desserts'), 'Sans Rival', 'sans-rival', 'Layers of cashew meringue and French buttercream', 215, array['vegetarian', 'pork_free']::text[], false, 'Slice of sans rival showing cashew meringue and buttercream layers', 3),
  ((select id from public.categories where slug = 'desserts'), 'Turrones de Casoy', 'turrones-de-casoy', 'Cashew marzipan wrapped in wafer paper, a San Fernando heirloom', 165, array['vegetarian', 'pork_free']::text[], false, 'Small wafer-wrapped cashew sweets on a plate', 4),
  ((select id from public.categories where slug = 'drinks'), 'Calamansi Soda', 'calamansi-soda', 'Fresh calamansi, cane syrup, soda', 125, array['vegetarian', 'pork_free']::text[], false, 'Sparkling calamansi soda over ice with a calamansi half', 1),
  ((select id from public.categories where slug = 'drinks'), 'Sago''t Gulaman', 'sagot-gulaman', 'Brown sugar, pandan jelly and tapioca pearls', 115, array['vegetarian', 'pork_free']::text[], false, 'Glass of sago''t gulaman with jelly cubes and tapioca pearls', 2),
  ((select id from public.categories where slug = 'drinks'), 'Tsokolate Batirol', 'tsokolate-batirol', 'Thick hot chocolate from local tablea, whisked tableside', 165, array['vegetarian', 'pork_free']::text[], false, 'Clay pot of thick hot chocolate with a wooden batirol whisk', 3),
  ((select id from public.categories where slug = 'drinks'), 'Lambanog Sour', 'lambanog-sour', 'Coconut spirit, calamansi, egg white, bitters', 295, array['pork_free']::text[], false, 'Frothy coconut-spirit sour in a coupe glass', 4),
  ((select id from public.categories where slug = 'drinks'), 'Uling Pale Ale', 'uling-pale-ale', 'House pale ale brewed with a local partner', 195, array['vegetarian', 'pork_free']::text[], false, 'Pint of golden pale ale on a wooden table', 5);

-- TODO(content): lat, lng and maps_url. Pin a public landmark, never a real business.
insert into public.locations (name, slug, address, barangay, city, region, phone, hours, parking, feature) values
  ('Uling Downtown', 'downtown', '18 Kalye Baga, Sto. Rosario, City of San Fernando, Pampanga 2000', 'Sto. Rosario', 'City of San Fernando', 'Pampanga', '+63 900 000 0001', '{"0": {"open": "10:00", "close": "22:00"}, "1": {"open": "11:00", "close": "22:00"}, "2": {"open": "11:00", "close": "22:00"}, "3": {"open": "11:00", "close": "22:00"}, "4": {"open": "11:00", "close": "22:00"}, "5": {"open": "11:00", "close": "00:00"}, "6": {"open": "11:00", "close": "00:00"}}'::jsonb, 'Street parking and a pay lot 50 m away', 'Original dining room, Bodega event room'),
  ('Uling Dolores', 'dolores', 'Unit 4, Plaza Uling, Dolores, City of San Fernando, Pampanga 2000', 'Dolores', 'City of San Fernando', 'Pampanga', '+63 900 000 0002', '{"0": {"open": "10:00", "close": "22:00"}, "1": {"open": "10:00", "close": "22:00"}, "2": {"open": "10:00", "close": "22:00"}, "3": {"open": "10:00", "close": "22:00"}, "4": {"open": "10:00", "close": "22:00"}, "5": {"open": "10:00", "close": "22:00"}, "6": {"open": "10:00", "close": "22:00"}}'::jsonb, '30 free spaces', 'Family-friendly, takeaway and pasalubong counter');

insert into public.packages (type, name, description, price_php, price_note, sort) values
  ('catering', 'Barkada Bilao', 'Pancit, pork belly, lumpia, sisig, rice for 20', 6500, null, 1),
  ('catering', 'Fiesta Spread', '6 mains, 2 sides, rice, halo-halo station, service staff', 850, 'per guest, min 50', 2),
  ('catering', 'Office Lunch Boxes', 'Rice meal, side, dessert, boxed and labeled', 320, 'per box, min 20', 3),
  ('event', 'Salu-Salo Set', 'Family-style feast for 15–30', 1200, 'from, per guest', 1),
  ('event', 'Chef''s Table', '8-course tasting with Chef Migo for up to 12', 3500, 'per guest', 2),
  ('event', 'Full Buyout', 'The whole Downtown dining room, up to 120 guests', null, 'quoted per event', 3),
  ('gift_card', '₱1,000', null, 1000, null, 1),
  ('gift_card', '₱2,500', null, 2500, null, 2),
  ('gift_card', '₱5,000', null, 5000, null, 3);

insert into public.faqs (question, answer, sort) values
  ('Do you take walk-ins?', 'Yes, but weekends fill fast. Booking guarantees a table.', 1),
  ('Is there parking?', 'Downtown has street parking and a pay lot nearby; Dolores has 30 free spaces.', 2),
  ('Do you have vegetarian or pork-free dishes?', 'Yes. Look for the V and PF tags on the menu.', 3),
  ('Can you handle allergies?', 'Tell us when you book. Our kitchen uses peanuts, shellfish and pork, so we can''t guarantee zero cross-contact.', 4),
  ('Are kids welcome?', 'Always. We have high chairs and a small kids'' plate.', 5),
  ('Can I bring my own cake or wine?', 'Cakes are free to bring; corkage is ₱500 per bottle.', 6),
  ('How big a group can you seat?', 'Up to 12 with a regular booking; larger groups go through private events.', 7),
  ('What''s your cancellation policy?', 'Please cancel at least 4 hours ahead so we can offer the table to someone else.', 8),
  ('Do you deliver?', 'We do pick-up and pasalubong orders; catering covers all of Pampanga.', 9),
  ('Is Uling a real restaurant?', 'Not yet! Uling is a design and development concept by Emma Nagano.', 10);

-- TODO(content): the deck gives no star rating per review, so rating stays null.
insert into public.testimonials (quote, author, source_label, sort) values
  ('The sisig was still crackling when it hit the table. My Kapampangan dad approved, which never happens.', 'Bea R.', 'Angeles', 1),
  ('We booked the Bodega room for my lola''s 80th. Forty people, zero stress, and the kare-kare ran out first.', 'Paolo M.', 'Mexico, Pampanga', 2),
  ('Ordered the tilapia sa buro on a dare. Now I crave it every week.', 'Janelle T.', 'Manila', 3),
  ('Best halo-halo outside Guagua, and the carabao-milk tibok-tibok is unreal.', 'Ken S.', 'San Fernando', 4),
  ('Our office lunch boxes arrived on time, labeled, and still warm. Ordering again.', 'Carla D.', 'Clark', 5),
  ('Loud, warm, generous. Felt like Sunday lunch at a tita''s house, but with craft beer.', 'Marco L.', 'Tarlac', 6);
