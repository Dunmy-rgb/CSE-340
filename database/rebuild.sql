-- Create account table
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(50),
  account_password VARCHAR(100)
);

-- Create classification table
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description TEXT
);

-- Create inventory table
CREATE TABLE inventory (
  inventory_id SERIAL PRIMARY KEY,
  make VARCHAR(50),
  model VARCHAR(50),
  year INT,
  classification_id INT REFERENCES classification(classification_id),
  inv_description TEXT,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255)
);


INSERT INTO account (firstname, lastname, email, account_password, account_type)
VALUES ('Tony', 'Stark', 'tony@starkindustries.com', 'superSecure123', 'Admin');

-- Insert classification data
INSERT INTO classification (classification_id, name, description)
VALUES 
  (1, 'Custom', 'Customized vehicles'),
  (2, 'Sedan', 'Standard passenger cars'),
  (3, 'SUV', 'Sport Utility Vehicles'),
  (4, 'Truck', 'Pickup and heavy-duty trucks')
ON CONFLICT (classification_id) DO NOTHING;

-- Insert inventory data
INSERT INTO inventory (inventory_id, make, model, year, classification_id, inv_description, inv_image, inv_thumbnail, inv_price)
VALUES 
  (1, 'GM', 'Hummer', 2020, 3, 'The Hummer has small interiors but great off-road ability.', '/images/vehicles/hummer.jpg', '/images/vehicles/hummer-tn.jpg', 32000.00),
  (2, 'Toyota', 'Tacoma', 2022, 3, 'The Tacoma is a reliable sport truck.', '/images/vehicles/toyota-tacoma.jpg', '/images/vehicles/toyota-tacoma-tn.jpg', 28000.00),
  (3, 'Subaru', 'DoggoWagon', 2025, 1, 'A spacious, fur-friendly vehicle designed for adventurous dogs and their humans.', '/images/vehicles/dog-car.jpg', '/images/vehicles/dog-car-tn.jpg', 25000.00),
  (4, 'Lamborghini', 'Adventador', 2023, 1, 'A luxury supercar with aggressive styling and a V12 engine.', '/images/vehicles/adventador.jpg', '/images/vehicles/adventador-tn.jpg', 400000.00),
  (5, 'Aeromobil', 'Aerocar', 2025, 1, 'A futuristic flying car combining road and air travel.', '/images/vehicles/aerocar.jpg', '/images/vehicles/aerocar-tn.jpg', 800000.00),
  (6, 'Wayne Enterprises', 'Batmobile', 2023, 1, 'A high-tech crime-fighting vehicle with unmatched performance.', '/images/vehicles/batmobile.jpg', '/images/vehicles/batmobile-tn.jpg', 1000000.00),
  (7, 'Chevrolet', 'Camaro', 2022, 1, 'A classic American muscle car customized for ultimate performance.', '/images/vehicles/camaro.jpg', '/images/vehicles/camaro-tn.jpg', 37000.00),
  (8, 'Ford', 'Crown Victoria', 2011, 2,
  'A classic full-size sedan with a powerful V8 engine, popular with law enforcement and taxi fleets.',
  '/images/vehicles/crwn-vic.jpg',
  '/images/vehicles/crwn-vic-tn.jpg', 19000.00),
  (9, 'Ford', 'Model T', 1927, 1,
  'The Ford Model T is regarded as the first affordable automobile, revolutionizing transportation in America.',
  '/images/vehicles/model-t.jpg',
  '/images/vehicles/model-t-tn.jpg', 5000.00),
  (10, 'Mechanix', 'Service Sedan', 2024, 2,
  'A durable sedan designed for mobile mechanics with built-in tool compartments and rugged performance.',
  '/images/vehicles/mechanic.jpg',
  '/images/vehicles/mechanic-tn.jpg', 27000.00),
  (11, 'Jeep', 'Wrangler', 2023, 4,
  'A rugged SUV built for adventure, with off-road capabilities and a classic design.',
  '/images/vehicles/wrangler.jpg',
  '/images/vehicles/wrangler-tn.jpg', 35000.00),
  (12, 'Grave Digger', 'Monster Truck', 2024, 4,
  'A powerful, oversized truck designed for extreme stunts and off-road dominance.',
  '/images/vehicles/monster-truck.jpg',
  '/images/vehicles/monster-truck-tn.jpg', 120000.00);


-- Select with join (Query 4)
SELECT make, model, name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id
WHERE name = 'SUV';

-- Update Hummer description (edit "small interiors")
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

-- Update image paths to include /vehicles/
UPDATE inventory
SET inv_image = REPLACE(inv_image, 'images/', 'images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 'images/', 'images/vehicles/');






