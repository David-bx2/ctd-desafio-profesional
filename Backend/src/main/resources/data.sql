-- Insertar productos
INSERT INTO product (name, description) VALUES 
('Auto Deportivo', 'Un auto rápido y elegante'),
('Camioneta 4x4', 'Ideal para terrenos difíciles'),
('Sedán Ejecutivo', 'Comodidad y estilo para viajes urbanos'),
('Convertible Clásico', 'Perfecto para disfrutar el sol'),
('Auto Familiar', 'Espacioso y seguro para toda la familia'),
('Motocicleta Deportiva', 'Adrenalina y velocidad garantizada'),
('Furgoneta de Carga', 'Gran capacidad de transporte'),
('Auto Eléctrico', 'Eficiencia y cuidado del medio ambiente'),
('Pickup Todo Terreno', 'Potencia para cualquier aventura'),
('Auto Clásico Vintage', 'Estilo retro que nunca pasa de moda');

-- Insertar imágenes asociadas
INSERT INTO product_imageurls (product_id, image_url) VALUES
(1, 'img/deportivo1.jpg'), (1, 'img/deportivo2.jpg'), (1, 'img/deportivo3.jpg'),
(2, 'img/camioneta1.jpg'), (2, 'img/camioneta2.jpg'), (2, 'img/camioneta3.jpg'),
(3, 'img/sedan1.jpg'), (3, 'img/sedan2.jpg'), (3, 'img/sedan3.jpg'),
(4, 'img/convertible1.jpg'), (4, 'img/convertible2.jpg'), (4, 'img/convertible3.jpg'),
(5, 'img/familiar1.jpg'), (5, 'img/familiar2.jpg'), (5, 'img/familiar3.jpg'),
(6, 'img/motocicleta1.jpg'), (6, 'img/motocicleta2.jpg'), (6, 'img/motocicleta3.jpg'),
(7, 'img/furgoneta1.jpg'), (7, 'img/furgoneta2.jpg'), (7, 'img/furgoneta3.jpg'),
(8, 'img/electrico1.jpg'), (8, 'img/electrico2.jpg'), (8, 'img/electrico3.jpg'),
(9, 'img/pickup1.jpg'), (9, 'img/pickup2.jpg'), (9, 'img/pickup3.jpg'),
(10, 'img/clasico1.jpg'), (10, 'img/clasico2.jpg'), (10, 'img/clasico3.jpg');
