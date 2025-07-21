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
Insert vehicle classifications
INSERT INTO classification (classification_id, name, description)
VALUES 
  (1, 'Custom', 'Customized vehicles'),
  (2, 'Sedan', 'Standard passenger cars'),
  (3, 'SUV', 'Sport Utility Vehicles'),
  (4, 'Truck', 'Pickup and heavy-duty trucks');

-- Insert inventory data
INSERT INTO inventory (inventory_id, make, model, year, classification_id, inv_description, inv_image, inv_thumbnail)
VALUES 
  (1, 'GM', 'Hummer', 2020, 3, 'The Hummer has small interiors but great off-road ability.', 'images/hummer.png', 'images/thumb_hummer.png'),
  (2, 'Toyota', 'Tacoma', 2022, 3, 'The Tacoma is a reliable sport truck.', 'images/tacoma.png', 'images/thumb_tacoma.png');

-- Select with join (Query 4)
SELECT make, model, name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id
WHERE name = 'Sport';

-- Update Hummer description (edit "small interiors")
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

-- Update image paths to include /vehicles/
UPDATE inventory
SET inv_image = REPLACE(inv_image, 'images/', 'images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 'images/', 'images/vehicles/');

