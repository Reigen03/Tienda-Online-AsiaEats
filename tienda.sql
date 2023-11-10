-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2023 a las 16:14:03
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idcarrito` varchar(8) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idcarrito`, `dni`, `fecha`) VALUES
('carr276H', '94738276H', '2023-02-17'),
('carr691R', '49358691R', '2023-02-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineacarrito`
--

CREATE TABLE `lineacarrito` (
  `idlineacarrito` int(8) NOT NULL,
  `idprod` int(8) NOT NULL,
  `idcarrito` varchar(8) NOT NULL,
  `cantprod` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lineacarrito`
--

INSERT INTO `lineacarrito` (`idlineacarrito`, `idprod`, `idcarrito`, `cantprod`) VALUES
(68, 26, 'carr691R', 1),
(78, 3, 'carr276H', 4),
(79, 3, 'carr276H', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineapedido`
--

CREATE TABLE `lineapedido` (
  `idlineapedido` varchar(8) NOT NULL,
  `idpedido` varchar(8) NOT NULL,
  `idprod` int(8) NOT NULL,
  `nombreprod` varchar(75) NOT NULL,
  `cantprod` int(10) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idpedido` varchar(8) NOT NULL,
  `fecha` date NOT NULL,
  `dni` varchar(9) NOT NULL,
  `direntrega` varchar(100) NOT NULL,
  `preciototal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idprod` int(8) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `precio` float NOT NULL,
  `img` varchar(35) NOT NULL,
  `descripcion` varchar(350) NOT NULL,
  `categoria` varchar(25) NOT NULL,
  `popular` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idprod`, `nombre`, `precio`, `img`, `descripcion`, `categoria`, `popular`) VALUES
(1, 'Bebida Chupa Chups burbujeante sabor fresa', 1.75, 'BebidaChupaChupsFresa.png', 'Ahora los famosos Chupa Chups en formato bebida, con un dulce sabor fresa y burbujeante.', 'bebida', 0),
(2, 'Fideos ramen SAMYANG sabor pollo picante', 2.5, 'RamenPolloPicante.jpg', 'El ramen coreano mas picante llega a tu casa, y ahora con mas cantidad que antes.', 'alimentacion', 1),
(3, 'Kit Kat sabor fresa', 1.25, 'KitKatFresa.png', 'Los famosos Kit Kat japoneses de sabores llegan para quedarse en occidente.', 'alimentacion', 1),
(4, 'Kit Kat sabor pistacho', 1.25, 'KitKatPistacho.webp', 'Los famosos Kit Kat japoneses de sabores llegan para quedarse en occidente.', 'alimentacion', 0),
(5, 'Bebida Ocean Bomb sabor melocoton | Edicion Chun-Li', 1.65, 'OceanBombMelocoton.png', 'Ocean Bomb regresa con su nueva gama de bebidas refrescantes de Street Fighter.', 'bebida', 0),
(6, 'Fideos ramen NISSIN sabor miso', 2.15, 'RamenMiso.png', 'Deliciosos fideos ramen sabor miso con un suave', 'alimentacion', 1),
(7, 'Pepsi sabor bambu y pomelo', 2, 'PepsiBambuPomelo.jpg', 'La famosa bebida Pepsi trae su nuevo y unico producto desde China: Sabor bambu y pomelo.', 'bebida', 1),
(8, 'Galletas chocobi Shin-Chan sabor chocolate', 3.19, 'GalletasShinChanChoco.png', 'Las galletas favoritas del protagonista de la famosa serie Shin-Chan.', 'alimentacion', 1),
(9, 'Fideos ramen NISSIN sabor Tonkotsu', 2.25, 'RamenTonkotsu.png', 'Fideos ramen sabor Tonkotsu, deliciosos y con mas sabor que nunca.', 'alimentacion', 0),
(10, 'Pocky sabor cookies & cream', 1.99, 'PockyCookies&Cream.png', 'Los famosos Pocky japoneses con su nuevo sabor: Cookies & cream.', 'alimentacion', 0),
(11, 'Vino de arroz chino tradicional', 25.97, 'VinoArrozChino.png', 'Vino tradicional traido desde China, con mas de 2 años de fermentacion y con mucho cuidado y dedicacion en la preparacion.', 'bebida', 0),
(12, 'Ramen XXL sabor ternera | Edicion Pikachu', 7.65, 'RamenTerneraPikachu.png', 'Un gran cuenco de ramen con intenso sabor a ternera, y ahora con tu pokemon favorito.', 'alimentacion', 1),
(13, 'Bebida burbujeante sabor limon | Edicion Pikachu', 1.89, 'BebidaLimon.png', 'Desde Japon vienen las nuevas y refrescantes bebidas de Pokemon. la de Pikachu trae un refrescante sabor limon.', 'bebida', 0),
(14, 'Bebida soda ramune sabor uva', 1.54, 'SodaRamuneUva.webp', 'Son famosisimas en Japon; Las bebidas soda ramune llegan por fin a occidente y hoy con sabor a uva.', 'bebida', 1),
(15, 'Perlas de Tapioca Taiwanesas', 0.89, 'PerlasTapioca.png', 'Para tu te de burbujas necesitaras lo mas importante: las perlas de tapioca.', 'alimentacion', 0),
(16, 'Fideos Ramen XXL Gourmet Golden sabor pollo', 7.89, 'RamenGourmetPollo.png', 'Un gran cuenco de ramen sabor pollo de la mejor calidad de toda Japon.', 'alimentacion', 1),
(17, 'Palomitas sabor mochi de chocolate', 1.35, 'PalomitasMochiChoco.png', 'Palomitas sabor a dulce mochi de chocolate.', 'alimentacion', 1),
(18, 'Mochi sabor cacahuete', 2, 'MochiCacahuete.jpg', 'Mochis sabor cachuete. Calientalos al microondas para mayor disfrute.', 'alimentacion', 1),
(19, 'Spaghetti Coreanos con salsa chajang', 2.1, 'SpaghettiCoreanos.png', 'Spaghetti estilo coreano con salsa chajang y un toque picante.', 'alimentacion', 0),
(20, 'Cola coreana sabor sandía', 0.85, 'ColaCoreanaSandia.png', 'Gaseosa coreana con un dulce aroma a sandía', 'bebida', 0),
(21, 'Cola coreana sabor uva', 0.85, 'ColaCoreanaUva.png', 'Gaseosa coreana con un dulce aroma a uva.', 'bebida', 1),
(22, 'Chocoballs de fresa', 2.5, 'ChocoballFresa.png', 'Bolas de chocolate y fresa rellenas de chocolate crujiente.', 'alimentacion', 0),
(23, 'Pack de snacks japoneses premium', 40.5, 'PackComidaPremium.png', 'Pack de 15 productos japoneses ambientados en series y videojuegos populares.', 'alimentacion', 1),
(24, 'Pack de dulces japoneses Dagashi', 15.25, 'PackDulcesJaponeses.jpg', 'Pack de 20 dulces aleatorios japoneses.', 'alimentacion', 0),
(25, 'Bebida de dulce de arroz', 1.19, 'BebidaRicePunch.png', 'Bebida suave aromatizada con sabor a arroz y un toque dulce.', 'bebida', 1),
(26, 'Soju coreano Chum Churum 360 ml', 0.89, 'SojuCoreano.webp', 'Una bebida destilada nativa de Corea y muy popular en todo el mundo, tradicionalmente hecha con arroz.', 'bebida', 0),
(27, 'Pack de 3 soda Ramune', 4.25, 'SodaRamuneTres.png', 'Mini pack de 3 bebidas soda Ramune. Una de fresa, otra de naranja y otra de melón chino.', 'bebida', 1),
(28, 'Cerveza China TsingTao lata 500 ml', 1.26, 'CervezaChina.webp', 'Cerveza china marca TsingTao. Calidad insuperable.', 'bebida', 1),
(29, 'Sopa de champiñon y bambu', 3.59, 'SopaChampiBambu.jpg', 'Exotica sopa taiwanesa de champiñones y bambu, en lata.', 'alimentacion', 1),
(30, 'Sake japones Tokubetsu 720ml', 10.72, 'SakeJapones.webp', 'Sake tradicional japones con una elaborada fermentacion. Tomalo frio o caliente, como mas te guste.', 'bebida', 1),
(31, 'Bebida gaseosa Calpis sabor leche', 2.15, 'CalpisLeche.jpg', 'Unica en el mundo. Una bebida gaseosa con sabor y textura a leche y un ligero toque a vainilla.', 'bebida', 0),
(32, 'Coca Cola Light sabor fresa', 1.15, 'CocaColaFresa.png', 'La Coca-cola light, tambien llamada diet coke, viene directa de Japon con un delicioso dabor fresa.', 'bebida', 0),
(33, 'Fanta sabor uva 500ml', 2.49, 'FantaUva.jpg', '500ml de pura Fanta con un refrescante sabor a uva.', 'bebida', 1),
(34, 'Pepsi sabor melocoton momo y te oolong', 2.89, 'PepsiMelocotonOolong.webp', 'Disfruta de la edicion mas refrescante de Pepsi, con sabor a Melocoton rosado Momo y te Oolong.', 'bebida', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `administrador` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`dni`, `nombre`, `correo`, `pass`, `administrador`) VALUES
('49358691R', 'Rafa', 'hola@hola.com', 'de9ae9f0b0df2955ca74ef60f03494b3', 0),
('87654321Z', 'Admin', 'jdodjdi@gogo.com', '42844ab59afa89ec3dee7784fe2b05f4', 1),
('94738276H', 'Jose Perales Perez', 'pruebas@gmail.com', '42844ab59afa89ec3dee7784fe2b05f4', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idcarrito`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `lineacarrito`
--
ALTER TABLE `lineacarrito`
  ADD PRIMARY KEY (`idlineacarrito`),
  ADD KEY `idprod` (`idprod`),
  ADD KEY `idcarrito` (`idcarrito`);

--
-- Indices de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD PRIMARY KEY (`idlineapedido`),
  ADD KEY `idpedido` (`idpedido`),
  ADD KEY `idprod` (`idprod`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idpedido`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idprod`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lineacarrito`
--
ALTER TABLE `lineacarrito`
  MODIFY `idlineacarrito` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idprod` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lineacarrito`
--
ALTER TABLE `lineacarrito`
  ADD CONSTRAINT `lineacarrito_ibfk_2` FOREIGN KEY (`idcarrito`) REFERENCES `carrito` (`idcarrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lineacarrito_ibfk_3` FOREIGN KEY (`idprod`) REFERENCES `productos` (`idprod`) ON DELETE CASCADE;

--
-- Filtros para la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD CONSTRAINT `lineapedido_ibfk_2` FOREIGN KEY (`idpedido`) REFERENCES `pedido` (`idpedido`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `lineapedido_ibfk_3` FOREIGN KEY (`idprod`) REFERENCES `productos` (`idprod`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
