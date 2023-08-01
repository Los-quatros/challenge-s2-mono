-- USERS --

INSERT INTO "user" ("id", "email", "firstName", "lastName", "password", "roles", "activation_token", "resetPasswordToken", "avatar", "sellerId")
VALUES
  (
    '51b3e54e-1b93-11ea-be56-0242ac120001',
    'admin@admin.fr',
    'Admin',
    'Admin',
    '$2a$10$gzZE/DeoZ36ZamVP6oJEsOmRAl6vOCoQhR99cZuRzobtcfIFPuLPW',
    'admin',
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    '51b3e54e-1b93-11ef-be56-0242ac120002',
    'user@user.fr',
    'User',
    'User',
    '$2a$10$gzZE/DeoZ36ZamVP6oJEsOmRAl6vOCoQhR99cZuRzobtcfIFPuLPW',
    'user',
    NULL,
    NULL,
    NULL,
    NULL
  );

-- CATEGORIES --

INSERT INTO "category" ("id", "name")
VALUES
  (
    '51b3e54e-1b91-11ee-be56-0242ac120034',
    'headphones'
  ),
  (
    '51b3e54e-1b92-11ee-be56-0242ac120034',
    'phones'
  ),
  (
    '51b3e54e-1b90-11ee-be56-0242ac120034',
    'tablets'
  ),
  (
    '51b3e54e-1b94-11ee-be56-0242ac120034',
    'cameras'
  );

-- HEADPHONE PRODUCTS --

INSERT INTO "product" ("id", "label", "price", "quantity", "sellerId", "isActivated", "categoryId", "description")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120002',
    'Casque sans fil Sony WH-1000XM4',
    350,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b91-11ee-be56-0242ac120034',
    'Le casque sans fil Sony WH-1000XM4 offre une expérience audio immersive avec une qualité sonore exceptionnelle. Doté de la technologie de réduction de bruit active, il vous permet de vous plonger dans votre musique préférée sans être dérangé par les bruits extérieurs. Sa batterie longue durée vous offre une écoute sans interruption pendant des heures. De plus, il est doté d"un design confortable et élégant, avec des commandes intuitives pour une utilisation facile.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120003',
    'Casque audio Bose QuietComfort 35 II',
    300,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b91-11ee-be56-0242ac120034',
    'Le casque audio Bose QuietComfort 35 II offre un son exceptionnel et une réduction de bruit de premier ordre. Profitez de votre musique avec une clarté et une précision incroyables, tout en bloquant les bruits indésirables. Avec sa connectivité sans fil Bluetooth, vous pouvez écouter vos morceaux préférés en toute liberté. De plus, il est doté d"un design léger et confortable, idéal pour une utilisation prolongée.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120004',
    'Casque sans fil Apple AirPods Pro',
    250,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b91-11ee-be56-0242ac120034',
    'Les casques sans fil Apple AirPods Pro offrent une expérience audio exceptionnelle avec un son immersif et une réduction de bruit active. Profitez de vos chansons préférées avec une qualité sonore exceptionnelle et une clarté incroyable. Les AirPods Pro sont également résistants à l"eau et à la transpiration, ce qui les rend parfaits pour une utilisation pendant les séances d"entraînement ou les activités sportives. De plus, leur boîtier de recharge offre une autonomie prolongée pour une écoute sans interruption.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120005',
    'Casque gaming SteelSeries Arctis 7',
    150,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b91-11ee-be56-0242ac120034',
    'Le casque gaming SteelSeries Arctis 7 est spécialement conçu pour offrir une expérience de jeu immersive. Avec sa technologie audio de qualité supérieure, il vous plonge au cœur de l"action avec un son clair et détaillé. Son microphone rétractable vous permet de communiquer avec vos coéquipiers sans avoir à retirer le casque. De plus, il est doté d"un design léger et confortable, idéal pour une utilisation prolongée.'
  );

-- PHONE PRODUCTS --

INSERT INTO "product" ("id", "label", "price", "quantity", "sellerId", "isActivated", "categoryId", "description")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120014',
    'Téléphone intelligent Samsung Galaxy S20',
    1000,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b92-11ee-be56-0242ac120034',
    'Le téléphone intelligent Samsung Galaxy S20 vous offre une expérience mobile exceptionnelle avec un écran Infinity-O de 6,2 po et un appareil photo à triple objectif de 64 Mpx. Profitez d"une connectivité 5G ultra-rapide et d"une batterie longue durée pour une utilisation quotidienne sans souci. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120015',
    'Téléphone intelligent Apple iPhone 11 Pro',
    1380,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b92-11ee-be56-0242ac120034',
    'Le téléphone intelligent Apple iPhone 11 Pro offre une expérience mobile exceptionnelle avec un écran Super Retina XDR de 5,8 po et un appareil photo à triple objectif de 12 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce A13 Bionic et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120016',
    'Téléphone intelligent Google Pixel 4',
    1000,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b92-11ee-be56-0242ac120034',
    'Le téléphone intelligent Google Pixel 4 offre une expérience mobile exceptionnelle avec un écran OLED de 5, 7 po et un appareil photo à double objectif de 16 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce Snapdragon 855 et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120017',
    'Téléphone intelligent Samsung Galaxy Note10+',
    1320,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b92-11ee-be56-0242ac120034',
    'Le téléphone intelligent Samsung Galaxy Note10+ vous offre une expérience mobile exceptionnelle avec un écran Infinity-O de 6,8 po et un appareil photo à quadruple objectif de 16 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce Snapdragon 855 et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  );

-- TABLET PRODUCTS --

INSERT INTO "product" ("id", "label", "price", "quantity", "sellerId", "isActivated", "categoryId", "description")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120024',
    'Tablette Apple iPad Pro 11 po 64 Go',
    1000,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b90-11ee-be56-0242ac120034',
    'La tablette Apple iPad Pro 11 po 64 Go offre une expérience mobile exceptionnelle avec un écran Liquid Retina de 11 po et un appareil photo de 12 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce A12X Bionic et à la batterie longue durée. De plus, elle est dotée d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120025',
    'Tablette Samsung Galaxy Tab S6 10,5 po 128 Go',
    1000,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b90-11ee-be56-0242ac120034',
    'La tablette Samsung Galaxy Tab S6 10,5 po 128 Go offre une expérience mobile exceptionnelle avec un écran Super AMOLED de 10,5 po et un appareil photo à double objectif de 13 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce Snapdragon 855 et à la batterie longue durée. De plus, elle est dotée d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120026',
    'Tablette Apple iPad 10,2 po 32 Go',
    430,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b90-11ee-be56-0242ac120034',
    'La tablette Apple iPad 10,2 po 32 Go offre une expérience mobile exceptionnelle avec un écran Retina de 10,2 po et un appareil photo de 8 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce A10 Fusion et à la batterie longue durée. De plus, elle est dotée d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120027',
    'Tablette Samsung Galaxy Tab A 10,1 po 32 Go',
    300,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b90-11ee-be56-0242ac120034',
    'La tablette Samsung Galaxy Tab A 10,1 po 32 Go offre une expérience mobile exceptionnelle avec un écran WUXGA de 10,1 po et un appareil photo de 8 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce Exynos 7904 et à la batterie longue durée. De plus, elle est dotée d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  );

-- CAMERAS PRODUCTS --

INSERT INTO "product" ("id", "label", "price", "quantity", "sellerId", "isActivated", "categoryId", "description")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120034',
    'Appareil photo sans miroir Sony Alpha a7 III avec objectif 28-70 mm',
    2100,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b94-11ee-be56-0242ac120034',
    'L"appareil photo sans miroir Sony Alpha a7 III avec objectif 28-70 mm offre une expérience mobile exceptionnelle avec un écran LCD de 3 po et un appareil photo de 24,2 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce BIONZ X et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120035',
    'Appareil photo sans miroir Sony Alpha a7R IV avec objectif 24-105 mm',
    5100,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b94-11ee-be56-0242ac120034',
    'L"appareil photo sans miroir Sony Alpha a7R IV avec objectif 24-105 mm offre une expérience mobile exceptionnelle avec un écran LCD de 3 po et un appareil photo de 61 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce BIONZ X et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120036',
    'Appareil photo sans miroir Sony Alpha a7R III avec objectif 24-70 mm',
    4500,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b94-11ee-be56-0242ac120034',
    'L"appareil photo sans miroir Sony Alpha a7R III avec objectif 24-70 mm offre une expérience mobile exceptionnelle avec un écran LCD de 3 po et un appareil photo de 42,4 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce BIONZ X et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120037',
    'Appareil photo sans miroir Sony Alpha a7 II avec objectif 28-70 mm',
    1100,
    5,
    NULL,
    TRUE,
    '51b3e54e-1b94-11ee-be56-0242ac120034',
    'L"appareil photo sans miroir Sony Alpha a7 II avec objectif 28-70 mm offre une expérience mobile exceptionnelle avec un écran LCD de 3 po et un appareil photo de 24,3 Mpx. Profitez d"une performance fluide et d"une autonomie prolongée grâce à la puce BIONZ X et à la batterie longue durée. De plus, il est doté d"un design élégant et durable qui résiste à l"eau et à la poussière.'
  );

-- CARRIERS --

INSERT INTO "carriers" ("id", "name", "fees", "isActive")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120029',
    'standard',
    2,
    TRUE
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120030',
    'free',
    0,
    TRUE
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120031',
    'express',
    5,
    TRUE
  );

-- ADDRESSES --

INSERT INTO "address" ("id", "state", "zip", "country", "user_id", "city", "street")
VALUES
  (
    '51b3e54e-1b93-11ee-be56-0242ac120032',
    TRUE,
    '92100',
    'France',
    '51b3e54e-1b93-11ef-be56-0242ac120002',
    'Boulogne-Billancourt',
    '6 rue de billancourt'
  ),
  (
    '51b3e54e-1b93-11ee-be56-0242ac120033',
    TRUE,
    '77000',
    'France',
    '51b3e54e-1b93-11ef-be56-0242ac120002',
    'Montréal',
    '1234 rue de la rue'
  );