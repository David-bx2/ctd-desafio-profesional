INSERT INTO category ( name) VALUES
( 'Sedán'),
( 'SUV'),
( 'Deportivo'),
( 'Eléctrico'),
( 'Pickup'),
( 'Familiar'),
( 'Motocicleta'),
( 'Furgoneta'),
( 'Convertible'),
( 'Clásico');

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


INSERT INTO users (id, admin, email, first_name, last_name, password)
VALUES (1, TRUE, 'jose@mail.com', 'Jose', 'Fernandez', '$2a$10$SGah9jcYTNSsJd5hI315hegkfHl6zPNfYQdgaOb6K6F8vXKx1H0aC'),
(2, false, 'juan@mail.com', 'Juan', 'Pérez', '$2a$10$abcdefghijABCDEFGHIJabcdefghijABCDEFGHIJabcdefghijABCD'), -- contraseña encriptada
(3, true, 'ana@mail.com', 'Ana', 'López', '$2a$10$abcdefghijABCDEFGHIJabcdefghijABCDEFGHIJabcdefghijABCD'),
(4, false, 'mario@mail.com', 'Mario', 'Gómez', '$2a$10$abcdefghijABCDEFGHIJabcdefghijABCDEFGHIJabcdefghijABCD');

INSERT INTO feature ( name, icon, detalle) VALUES
( 'GPS', 'img/icon1.jpg', 'Ubicación en tiempo real'),
( 'Bluetooth', 'img/icon2.jpg', 'Conexión a dispositivos móviles'),
( 'Aire acondicionado', 'img/icon3.jpg', 'Climatización automática');


INSERT INTO booking (start_date, end_date, product_id) VALUES
('2025-04-10', '2025-04-12', 1),
('2025-04-15', '2025-04-18', 2),
('2025-04-20', '2025-04-22', 3),
('2025-04-25', '2025-04-27', 4),
('2025-04-13', '2025-04-14', 5),
('2025-04-17', '2025-04-19', 6),
('2025-04-22', '2025-04-24', 7),
('2025-04-28', '2025-04-30', 8),
('2025-04-10', '2025-04-11', 9),
('2025-04-18', '2025-04-20', 10);

INSERT INTO review (rating, comment, date, user_id, product_id) VALUES
(5, 'Excelente auto, muy cómodo y rápido.', '2025-03-25', 1, 1),
(4, 'Buena experiencia general, aunque algo ruidoso.', '2025-03-24', 2, 1),
(3, 'Regular, esperaba más.', '2025-03-23', 1, 2),
(4, 'Buen auto para la ciudad, muy económico.', '2025-03-22', 2, 2),
(5, 'Perfecto para viajes largos. Muy recomendable.', '2025-03-21', 1, 3),
(2, 'Tuvo problemas con la batería.', '2025-03-20', 2, 3),
(5, '¡Me encantó! Volvería a rentarlo.', '2025-03-19', 1, 4),
(4, 'Cómodo y funcional. Todo bien.', '2025-03-18', 2, 4),
(3, 'Auto básico, cumple con lo necesario.', '2025-03-17', 1, 5),
(5, 'Perfecto para la familia. Espacioso.', '2025-03-16', 2, 5),
(4, 'Ideal para viajes en pareja.', '2025-03-15', 1, 6),
(3, 'Bonita moto, aunque un poco incómoda.', '2025-03-14', 2, 6),
(5, 'Gran capacidad de carga, útil para mudanzas.', '2025-03-13', 1, 7),
(4, 'Funcional y confiable.', '2025-03-12', 2, 7),
(5, 'Silencioso y ecológico. Gran experiencia.', '2025-03-11', 1, 8),
(4, 'El futuro del transporte.', '2025-03-10', 2, 8),
(3, 'Rendimiento aceptable fuera de carretera.', '2025-03-09', 1, 9),
(4, 'Robusto y potente.', '2025-03-08', 2, 9),
(5, 'Una joya clásica, ¡me encantó!', '2025-03-07', 1, 10),
(5, 'Viaje en el tiempo con estilo.', '2025-03-06', 2, 10),
(4, NULL, '2025-03-05', 1, 1),
(5, '', '2025-03-04', 2, 2),
(3, NULL, '2025-03-03', 1, 3),
(4, '', '2025-03-02', 2, 4),
(5, NULL, '2025-03-01', 1, 5),
(2, '', '2025-02-21', 2, 6),
(4, NULL, '2025-02-28', 1, 7),
(3, '', '2025-02-27', 2, 8),
(5, NULL, '2025-02-26', 1, 9),
(4, '', '2025-02-25', 2, 10);
