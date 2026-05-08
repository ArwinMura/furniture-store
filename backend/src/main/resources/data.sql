DELETE FROM order_items;
DELETE FROM customer_orders;
DELETE FROM products;

ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE customer_orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;

INSERT INTO products (name, price, category, description, image_url)
VALUES

-- Living Room
('Modern Sofa', 899.00, 'Living Room', 'A comfy 3-seat sofa with durable fabric and modern lines.', '/images/products/modern-sofa.jpg'),
('Leather Recliner', 549.00, 'Living Room', 'A padded leather recliner designed for comfort and relaxation.', '/images/products/leather-recliner.jpg'),
('Glass Coffee Table', 229.00, 'Living Room', 'A modern coffee table with a glass top and sleek metal frame.', '/images/products/glass-coffee-table.jpg'),
('TV Media Console', 349.00, 'Living Room', 'A low-profile media console with storage for electronics and decor.', '/images/products/tv-media-console.jpg'),
('Accent Armchair', 299.00, 'Living Room', 'A stylish accent chair that adds comfort and character to any room.', '/images/products/accent-armchair.jpg'),

-- Dining
('Wooden Dining Table', 699.00, 'Dining', 'Solid wood table that seats 6. Great for family dinners.', '/images/products/wooden-dining-table.jpg'),
('Dining Chair Set', 399.00, 'Dining', 'A matching set of four cushioned dining chairs.', '/images/products/dining-chair-set.jpg'),
('Bar Stool Set', 249.00, 'Dining', 'Two modern bar stools with supportive backs and footrests.', '/images/products/bar-stool-set.jpg'),
('Sideboard Cabinet', 599.00, 'Dining', 'A spacious sideboard for dishes, linens, and dining essentials.', '/images/products/sideboard-cabinet.jpg'),

-- Bedroom
('King Size Bed', 999.00, 'Bedroom', 'Minimal platform bed frame with strong slats and clean design.', '/images/products/king-size-bed.jpg'),
('Queen Bed Frame', 799.00, 'Bedroom', 'An upholstered queen bed frame with a soft padded headboard.', '/images/products/queen-bed-frame.jpg'),
('Nightstand', 149.00, 'Bedroom', 'A compact wooden nightstand with two drawers for bedside storage.', '/images/products/nightstand.jpg'),
('Dresser', 649.00, 'Bedroom', 'A six-drawer dresser with a clean modern finish.', '/images/products/dresser.jpg'),
('Wardrobe Closet', 899.00, 'Bedroom', 'A tall wardrobe with hanging space and built-in shelving.', '/images/products/wardrobe-closet.jpg'),

-- Office
('Office Chair', 199.00, 'Office', 'Ergonomic chair with lumbar support for long study sessions.', '/images/products/office-chair.jpg'),
('Standing Desk', 499.00, 'Office', 'An adjustable standing desk for a healthier work setup.', '/images/products/standing-desk.jpg'),
('Bookshelf', 179.00, 'Office', 'A five-tier bookshelf for books, storage, and decor.', '/images/products/bookshelf.jpg'),
('Filing Cabinet', 129.00, 'Office', 'A compact filing cabinet for documents and office supplies.', '/images/products/filing-cabinet.jpg'),

-- Storage
('Storage Bench', 249.00, 'Storage', 'A cushioned bench with hidden storage for entryways or bedrooms.', '/images/products/storage-bench.jpg'),
('Shoe Rack', 89.00, 'Storage', 'A simple multi-level shoe rack for organizing entryway footwear.', '/images/products/shoe-rack.jpg'),

-- Outdoor
('Outdoor Patio Set', 899.00, 'Outdoor', 'A weather-resistant patio set with seating and a matching table.', '/images/products/outdoor-patio-set.jpg'),
('Outdoor Lounge Chair', 299.00, 'Outdoor', 'A durable lounge chair for patios, decks, and backyard spaces.', '/images/products/outdoor-lounge-chair.jpg');