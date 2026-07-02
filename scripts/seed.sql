-- Seed Sun Shoot Villas CMS data (run after schema.sql)

INSERT INTO villas (slug, name, description, price_idr, bedrooms, bathrooms, size_m2, images)
VALUES
  (
    'mawar',
    'Villa Mawar',
    'Nestled within the lush Sunshoot Villas Complex on Jl. Bidadari II E, Villa Mawar is a stunning two-storey garden villa just minutes from the heart of Seminyak.',
    1000000,
    2,
    2,
    150,
    ARRAY[
      'https://cf.bstatic.com/xdata/images/hotel/max1280x900/139426334.jpg?k=569d217c470479f965a215fcea4cb500cd01984424776e0550018463d651d567&o=&hp=1'
    ]
  ),
  (
    'jepun',
    'Villa Jepun',
    'Located in the beating heart of Seminyak, Villa Jepun blends modern elegance with traditional Balinese architecture.',
    1400000,
    2,
    3,
    150,
    ARRAY[
      'https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354554.jpg?k=5541438d3715f06575d9cf5298bbf73db085483cebce43802645af39a6bdeb0f&o=&hp=1'
    ]
  ),
  (
    'anggrek',
    'Villa Anggrek',
    'Villa Anggrek is one of Bali''s best kept secrets, offering incredible value without compromising on comfort or style.',
    1200000,
    2,
    4,
    175,
    ARRAY[
      'https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354556.jpg?k=93cc84675b1e46a12d3c9cef4fc88d44a7bc93dc25e98af06b9348e1561eb429&o=&hp=1'
    ]
  ),
  (
    'sandat',
    'Villa Sandat',
    'Situated in Seminyak''s coveted Bidadari area, Villa Sandat is a spacious and beautifully appointed retreat.',
    900000,
    2,
    4,
    190,
    ARRAY[
      'https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354557.jpg?k=61724561fa2ffba6d2d46d436a5d54501d6928005012f4111304e4a31be50362&o=&hp=1'
    ]
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_idr = EXCLUDED.price_idr,
  bedrooms = EXCLUDED.bedrooms,
  bathrooms = EXCLUDED.bathrooms,
  size_m2 = EXCLUDED.size_m2,
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO site_content (key, value) VALUES
  ('home.hero.headline', 'Your Private Balinese Retreat in Seminyak'),
  ('home.hero.subtext', 'Four private pool villas in the heart of Seminyak, Bali'),
  ('about.intro', 'Welcome to Sun Shoot Villas, your private sanctuary on Jl. Bidadari II E.'),
  ('about.body', 'We offer warm Balinese hospitality, private pools, and a personal host to make your stay unforgettable.')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
