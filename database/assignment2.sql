CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(50),
  account_password VARCHAR(100)
);

INSERT INTO classification (classification_id, name, description)
VALUES 
  (1, 'Camping', 'Outdoor gear for camping'),
  (2, 'Hiking', 'Gear for hiking'),
  (3, 'Sport', 'Sport and outdoor activities');

Insert into inventory
INSERT INTO inventory (inventory_id, make, model, year, classification_id)
VALUES 
  (1, 'GM', 'Hummer', 2020, 3),
  (2, 'Toyota', 'Tacoma', 2022, 3);

-- SELECT with JOIN
SELECT make, model, name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id;

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

SELECT make, model, name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id
WHERE name = 'Sport';

UPDATE inventory
SET inv_image = REPLACE(inv_image, 'images/', 'images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 'images/', 'images/vehicles/');




