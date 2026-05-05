DELETE FROM order_items;
DELETE FROM customer_orders;
DELETE FROM products;

ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE customer_orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;

INSERT INTO products (name, price, category, description, image_url)
VALUES
('Modern Sofa', 899.00, 'Living Room', 'A comfy 3-seat sofa with durable fabric and modern lines.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=60'),

('Leather Recliner', 549.00, 'Living Room', 'A padded leather recliner designed for comfort and relaxation.', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=60'),

('Glass Coffee Table', 229.00, 'Living Room', 'A modern coffee table with a glass top and sleek metal frame.', 'https://images.unsplash.com/photo-1532372320978-9d6c893b1558?auto=format&fit=crop&w=900&q=60'),

('TV Media Console', 349.00, 'Living Room', 'A low-profile media console with storage for electronics and decor.', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=60'),

('Accent Armchair', 299.00, 'Living Room', 'A stylish accent chair that adds comfort and character to any room.', 'https://images.unsplash.com/photo-1567538096631-e0c55bd6374c?auto=format&fit=crop&w=900&q=60'),

('Wooden Dining Table', 699.00, 'Dining', 'Solid wood table that seats 6. Great for family dinners.', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=60'),

('Dining Chair Set', 399.00, 'Dining', 'A matching set of four cushioned dining chairs.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=60'),

('Bar Stool Set', 249.00, 'Dining', 'Two modern bar stools with supportive backs and footrests.', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=60'),

('Sideboard Cabinet', 599.00, 'Dining', 'A spacious sideboard for dishes, linens, and dining essentials.', 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=900&q=60'),

('King Size Bed', 999.00, 'Bedroom', 'Minimal platform bed frame with strong slats and clean design.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60'),

('Queen Bed Frame', 799.00, 'Bedroom', 'An upholstered queen bed frame with a soft padded headboard.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60'),

('Nightstand', 149.00, 'Bedroom', 'A compact wooden nightstand with two drawers for bedside storage.', 'https://images.unsplash.com/photo-1582582494700-7d4f8b763b5d?auto=format&fit=crop&w=900&q=60'),

('Dresser', 649.00, 'Bedroom', 'A six-drawer dresser with a clean modern finish.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60'),

('Wardrobe Closet', 899.00, 'Bedroom', 'A tall wardrobe with hanging space and built-in shelving.', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=60'),

('Office Chair', 199.00, 'Office', 'Ergonomic chair with lumbar support for long study sessions.', 'https://images.unsplash.com/photo-1598300053653-6c7e94baf3ad?auto=format&fit=crop&w=900&q=60'),

('Standing Desk', 499.00, 'Office', 'An adjustable standing desk for a healthier work setup.', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=60'),

('Bookshelf', 179.00, 'Office', 'A five-tier bookshelf for books, storage, and decor.', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=60'),

('Filing Cabinet', 129.00, 'Office', 'A compact filing cabinet for documents and office supplies.', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=60'),

('Storage Bench', 249.00, 'Storage', 'A cushioned bench with hidden storage for entryways or bedrooms.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=60'),

('Shoe Rack', 89.00, 'Storage', 'A simple multi-level shoe rack for organizing entryway footwear.', 'https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?auto=format&fit=crop&w=900&q=60'),

('Outdoor Patio Set', 899.00, 'Outdoor', 'A weather-resistant patio set with seating and a matching table.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=60'),

('Outdoor Lounge Chair', 299.00, 'Outdoor', 'A durable lounge chair for patios, decks, and backyard spaces.', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=60');