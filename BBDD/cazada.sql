-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2018 a las 13:11:52
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cazada`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `Usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`Usuario`, `Password`, `Mail`) VALUES
('Admin1', '1234', 'admin1@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `ID_Alumno` int(5) NOT NULL,
  `ID_Clase` int(11) DEFAULT NULL,
  `Padre` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Apellidos` varchar(80) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`ID_Alumno`, `ID_Clase`, `Padre`, `Nombre`, `Apellidos`) VALUES
(1, 1, '49268543X', 'Jacinto', 'Perez Pacuito'),
(2, 1, '49268544X', 'Ramon', 'Casas Martinez'),
(3, 1, '49268545X', 'Carlos', 'Ramon Sanchez'),
(4, 1, '49268546X', 'Juan', 'Buenavida Pascual'),
(5, 1, '49268547X', 'Raul', 'Martin Perez'),
(6, 1, '49268548X', 'Ruben', 'Perez Santiago'),
(7, 1, '49268549X', 'David', 'Carmelo Blanco'),
(8, 1, '49268540X', 'Daniel', 'Carrero Humanes'),
(9, 1, '49268550X', 'Fernando', 'Sol Luz'),
(10, 1, '49268553X', 'Francisco', 'Felipe Santos'),
(11, 2, '49268552X', 'Manuel', 'Carro Gomez'),
(12, 2, '23456270A', 'Perico', 'Gomez Sierra'),
(13, 2, '23456271A', 'Miguel', 'Diaz Moreno'),
(14, 2, '23456272A', 'Laura', 'Diaz Cordobes'),
(15, 2, '23456273A', 'Paula', 'Garcia Conde'),
(16, 2, '23456274A', 'Daniel', 'Media Gonzalez'),
(17, 2, '23456275A', 'Laura', 'Sierra Gomez'),
(18, 2, '23456276A', 'Rafael', 'Leon Pasas'),
(19, 2, '23456277A', 'Manuel', 'Pulido Martin'),
(20, 2, '23456278A', 'Dafne', 'Zamora Serrano'),
(21, 3, '12345670B', 'Maria', 'Parreno Gonzalez'),
(22, 3, '12345671B', 'Silvia', 'Mora Parra'),
(23, 3, '12345672B', 'Juan Luis', 'Guerra Pozo'),
(24, 3, '12345673B', 'Victor', 'Pozo Rosa'),
(25, 3, '12345674B', 'Sergio', 'Aguero Moran'),
(26, 3, '12345675B', 'Pablo', 'Lucas Mora'),
(27, 3, '12345676B', 'Natalia', 'Sierra Zamora'),
(28, 3, '12345677B', 'Francisco', 'Gomez Martin'),
(29, 3, '12345678B', 'Francisca', 'Parra Gonzalez'),
(30, 3, '12345679B', 'Cesar', 'Rubio Pino'),
(31, 4, '48902341C', 'Paula', 'Monte Pino'),
(32, 4, '48902342C', 'Sara', 'Segovia Leon'),
(33, 4, '48902343C', 'Paula', 'Cintas Gomez'),
(34, 4, '48902344C', 'Sergio', 'Gil Gil'),
(35, 4, '48902345C', 'Alvaro', 'Gonzalez Moreira'),
(36, 4, '48902346C', 'Ruben', 'Martinez Higado'),
(37, 4, '48902347C', 'Jose Manuel', 'Moreno Garcia'),
(38, 4, '48902348C', 'David', 'Fernandez Lloreda'),
(39, 4, '48902349C', 'Esther', 'Fernandez Toro'),
(40, 4, '48902340C', 'Ivan', 'Alonso Vidal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `ID_Asig` int(11) NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`ID_Asig`, `Nombre`) VALUES
(1, 'Lengua y Literatura'),
(2, 'Matematicas'),
(3, 'Educacion fisica'),
(4, 'Ciencias sociales'),
(5, 'Ciencias naturales'),
(6, 'Fisica'),
(7, 'Quimica'),
(8, 'Musica'),
(9, 'Educacion plastica'),
(10, 'Ingles'),
(11, 'Frances'),
(12, 'Religion/Estudio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `ID_Clase` int(11) NOT NULL,
  `Tutor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Clase` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`ID_Clase`, `Tutor`, `Clase`) VALUES
(1, '00000003A', '1A - ESO'),
(2, '00000006A', '2A - ESO'),
(3, '00000009A', '3A - ESO'),
(4, '00000012A', '4A - ESO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faltas`
--

CREATE TABLE `faltas` (
  `ID_Alumno` int(5) NOT NULL,
  `ID_Asig` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `faltas`
--

INSERT INTO `faltas` (`ID_Alumno`, `ID_Asig`, `Fecha`, `Hora`) VALUES
(5942, 2, '2018-04-05', 1),
(5942, 11, '2018-04-08', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `Clase` int(11) NOT NULL,
  `Dia` int(1) NOT NULL,
  `Hora` int(1) NOT NULL,
  `Asignatura` int(11) DEFAULT NULL,
  `Profesor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`Clase`, `Dia`, `Hora`, `Asignatura`, `Profesor`) VALUES
(1, 1, 1, 1, '00000001A'),
(1, 1, 2, 2, '00000002A'),
(1, 1, 3, 3, '00000009A'),
(1, 1, 4, 4, '00000004A'),
(1, 1, 5, 5, '00000011A'),
(1, 1, 6, 6, '00000006A'),
(1, 2, 1, 1, '00000001A'),
(1, 2, 2, 3, '00000009A'),
(1, 2, 3, 4, '00000004A'),
(1, 2, 4, 5, '00000011A'),
(1, 2, 5, 6, '00000006A'),
(1, 2, 6, 2, '00000002A'),
(1, 3, 1, 1, '00000001A'),
(1, 3, 2, 4, '00000004A'),
(1, 3, 3, 5, '00000011A'),
(1, 3, 4, 6, '00000006A'),
(1, 3, 5, 2, '00000002A'),
(1, 3, 6, 3, '00000009A'),
(1, 4, 1, 1, '00000001A'),
(1, 4, 2, 5, '00000011A'),
(1, 4, 3, 6, '00000006A'),
(1, 4, 4, 2, '00000002A'),
(1, 4, 5, 3, '00000009A'),
(1, 4, 6, 4, '00000004A'),
(1, 5, 1, 1, '00000001A'),
(1, 5, 2, 6, '00000006A'),
(1, 5, 3, 2, '00000002A'),
(1, 5, 4, 3, '00000009A'),
(1, 5, 5, 4, '00000004A'),
(1, 5, 6, 5, '00000011A'),
(2, 1, 1, 1, '00000007A'),
(2, 1, 2, 2, '00000003A'),
(2, 1, 3, 3, '00000003A'),
(2, 1, 4, 4, '00000010A'),
(2, 1, 5, 5, '00000005A'),
(2, 1, 6, 6, '00000002A'),
(2, 2, 1, 2, '00000002A'),
(2, 2, 2, 3, '00000003A'),
(2, 2, 3, 4, '00000010A'),
(2, 2, 4, 5, '00000005A'),
(2, 2, 5, 6, '00000010A'),
(2, 2, 6, 1, '00000007A'),
(2, 3, 1, 3, '00000003A'),
(2, 3, 2, 4, '00000010A'),
(2, 3, 3, 5, '00000005A'),
(2, 3, 4, 6, '00000011A'),
(2, 3, 5, 1, '00000001A'),
(2, 3, 6, 2, '00000008A'),
(2, 4, 1, 4, '00000010A'),
(2, 4, 2, 5, '00000005A'),
(2, 4, 3, 6, '00000012A'),
(2, 4, 4, 1, '00000007A'),
(2, 4, 5, 2, '00000006A'),
(2, 4, 6, 3, '00000003A'),
(2, 5, 1, 5, '00000005A'),
(2, 5, 2, 6, '00000004A'),
(2, 5, 3, 1, '00000007A'),
(2, 5, 4, 2, '00000007A'),
(2, 5, 5, 3, '00000001A'),
(2, 5, 6, 4, '00000008A'),
(3, 1, 1, 2, '00000008A'),
(3, 1, 2, 3, '00000009A'),
(3, 1, 3, 4, '00000004A'),
(3, 1, 4, 5, '00000011A'),
(3, 1, 5, 6, '00000012A'),
(3, 1, 6, 1, '00000001A'),
(3, 2, 1, 3, '00000009A'),
(3, 2, 2, 4, '00000004A'),
(3, 2, 3, 5, '00000011A'),
(3, 2, 4, 6, '00000012A'),
(3, 2, 5, 1, '00000001A'),
(3, 2, 6, 2, '00000008A'),
(3, 3, 1, 4, '00000004A'),
(3, 3, 2, 5, '00000011A'),
(3, 3, 3, 6, '00000012A'),
(3, 3, 4, 1, '00000001A'),
(3, 3, 5, 2, '00000008A'),
(3, 3, 6, 3, '00000004A'),
(3, 4, 1, 5, '00000011A'),
(3, 4, 2, 6, '00000012A'),
(3, 4, 3, 1, '00000001A'),
(3, 4, 4, 2, '00000008A'),
(3, 4, 5, 3, '00000001A'),
(3, 4, 6, 4, '00000008A'),
(3, 5, 1, 6, '00000012A'),
(3, 5, 2, 1, '00000001A'),
(3, 5, 3, 2, '00000008A'),
(3, 5, 4, 3, '00000012A'),
(3, 5, 5, 4, '00000009A'),
(3, 5, 6, 5, '00000007A'),
(4, 1, 1, 3, '00000003A'),
(4, 1, 2, 4, '00000010A'),
(4, 1, 3, 5, '00000005A'),
(4, 1, 4, 6, '00000012A'),
(4, 1, 5, 1, '00000007A'),
(4, 1, 6, 2, '00000008A'),
(4, 2, 1, 4, '00000010A'),
(4, 2, 2, 5, '00000005A'),
(4, 2, 3, 6, '00000012A'),
(4, 2, 4, 1, '00000007A'),
(4, 2, 5, 2, '00000008A'),
(4, 2, 6, 3, '00000003A'),
(4, 3, 1, 5, '00000005A'),
(4, 3, 2, 6, '00000012A'),
(4, 3, 3, 1, '00000007A'),
(4, 3, 4, 2, '00000008A'),
(4, 3, 5, 3, '00000003A'),
(4, 3, 6, 4, '00000010A'),
(4, 4, 1, 6, '00000012A'),
(4, 4, 2, 1, '00000007A'),
(4, 4, 3, 2, '00000008A'),
(4, 4, 4, 3, '00000003A'),
(4, 4, 5, 4, '00000010A'),
(4, 4, 6, 5, '00000005A'),
(4, 5, 1, 1, '00000007A'),
(4, 5, 2, 2, '00000008A'),
(4, 5, 3, 3, '00000003A'),
(4, 5, 4, 4, '00000010A'),
(4, 5, 5, 5, '00000005A'),
(4, 5, 6, 6, '00000012A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas`
--

CREATE TABLE `horas` (
  `Hora` int(1) NOT NULL,
  `Start` time NOT NULL,
  `End` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `horas`
--

INSERT INTO `horas` (`Hora`, `Start`, `End`) VALUES
(1, '08:30:00', '09:20:00'),
(2, '09:25:00', '10:15:00'),
(3, '10:20:00', '11:10:00'),
(4, '11:35:00', '12:25:00'),
(5, '12:30:00', '13:20:00'),
(6, '13:25:00', '14:15:00'),
(7, '14:20:00', '15:10:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `ID_Alumno` int(5) NOT NULL,
  `ID_Clase` int(11) NOT NULL,
  `ID_Asig` int(11) NOT NULL,
  `Nota` double DEFAULT NULL,
  `Evaluacion` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`ID_Alumno`, `ID_Clase`, `ID_Asig`, `Nota`, `Evaluacion`) VALUES
(5942, 1, 1, 7, 1),
(5942, 1, 2, 3.7, 1),
(5942, 1, 3, 4.8, 1),
(5942, 1, 4, 5.4, 1),
(5942, 1, 10, 9.8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `padres`
--

CREATE TABLE `padres` (
  `Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Apellidos` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `Alumnos` varchar(8) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `padres`
--

INSERT INTO `padres` (`Usuario`, `Password`, `Mail`, `Nombre`, `Apellidos`, `Alumnos`) VALUES
('49268543X', '1234', 'padre1@gmail.com', 'Papa', 'papito papi', '1'),
('49268553X', '1234', 'padre10@gmail.com', 'Papa', 'papito papi', '10'),
('49268552X', '1234', 'padre11@gmail.com', 'Papa', 'papito papi', '11'),
('23456270A', '1234', 'padre12@gmail.com', 'Papa', 'papito papi', '12'),
('23456271A', '1234', 'padre13@gmail.com', 'Papa', 'papito papi', '13'),
('23456272A', '1234', 'padre14@gmail.com', 'Papa', 'papito papi', '14'),
('23456273A', '1234', 'padre15@gmail.com', 'Papa', 'papito papi', '15'),
('23456274A', '1234', 'padre16@gmail.com', 'Papa', 'papito papi', '16'),
('23456275A', '1234', 'padre17@gmail.com', 'Papa', 'papito papi', '17'),
('23456276A', '1234', 'padre18@gmail.com', 'Papa', 'papito papi', '18'),
('23456277A', '1234', 'padre19@gmail.com', 'Papa', 'papito papi', '19'),
('49268544X', '1234', 'padre2@gmail.com', 'Papa', 'papito papi', '2'),
('23456278A', '1234', 'padre20@gmail.com', 'Papa', 'papito papi', '20'),
('12345670B', '1234', 'padre21@gmail.com', 'Papa', 'papito papi', '21'),
('12345671B', '1234', 'padre22@gmail.com', 'Papa', 'papito papi', '22'),
('12345672B', '1234', 'padre23@gmail.com', 'Papa', 'papito papi', '23'),
('12345673B', '1234', 'padre24@gmail.com', 'Papa', 'papito papi', '24'),
('12345674B', '1234', 'padre25@gmail.com', 'Papa', 'papito papi', '25'),
('12345675B', '1234', 'padre26@gmail.com', 'Papa', 'papito papi', '26'),
('12345676B', '1234', 'padre27@gmail.com', 'Papa', 'papito papi', '27'),
('12345677B', '1234', 'padre28@gmail.com', 'Papa', 'papito papi', '28'),
('12345678B', '1234', 'padre29@gmail.com', 'Papa', 'papito papi', '29'),
('49268545X', '1234', 'padre3@gmail.com', 'Papa', 'papito papi', '3'),
('12345679B', '1234', 'padre30@gmail.com', 'Papa', 'papito papi', '30'),
('48902341C', '1234', 'padre31@gmail.com', 'Papa', 'papito papi', '31'),
('48902342C', '1234', 'padre32@gmail.com', 'Papa', 'papito papi', '32'),
('48902343C', '1234', 'padre33@gmail.com', 'Papa', 'papito papi', '33'),
('48902344C', '1234', 'padre34@gmail.com', 'Papa', 'papito papi', '34'),
('48902345C', '1234', 'padre35@gmail.com', 'Papa', 'papito papi', '35'),
('48902346C', '1234', 'padre36@gmail.com', 'Papa', 'papito papi', '36'),
('48902347C', '1234', 'padre37@gmail.com', 'Papa', 'papito papi', '37'),
('48902348C', '1234', 'padre38@gmail.com', 'Papa', 'papito papi', '38'),
('48902349C', '1234', 'padre39@gmail.com', 'Papa', 'papito papi', '39'),
('49268546X', '1234', 'padre4@gmail.com', 'Papa', 'papito papi', '4'),
('48902340C', '1234', 'padre40@gmail.com', 'Papa', 'papito papi', '40'),
('49268547X', '1234', 'padre5@gmail.com', 'Papa', 'papito papi', '5'),
('49268548X', '1234', 'padre6@gmail.com', 'Papa', 'papito papi', '6'),
('49268549X', '1234', 'padre7@gmail.com', 'Papa', 'papito papi', '7'),
('49268540X', '1234', 'padre8@gmail.com', 'Papa', 'papito papi', '8'),
('49268550X', '1234', 'padre9@gmail.com', 'Papa', 'papito papi', '9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Tutoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`Usuario`, `Password`, `Mail`, `Nombre`, `Tutoria`) VALUES
('00000001A', '1234', 'profe1@gmail.com', 'Agustin Hidalgo Ramirez', NULL),
('00000002A', '1234', 'profe2@gmail.com', 'Elena Vazquez Bernal', NULL),
('00000003A', '1234', 'profe3@gmail.com', 'Manuel Elias Perez', 1),
('00000004A', '1234', 'profe4@hotmail.com', 'Tomas Linda Soriano', NULL),
('00000005A', '1234', 'profe5@gmail.com', 'Paloma Estaban Garrido', NULL),
('00000006A', '1234', 'profe6@gmail.com', 'Manuela Velasco Zorrilla', 2),
('00000007A', '1234', 'profe7@gmail.com', 'Claudio Romero De Torres', NULL),
('00000008A', '1234', 'profe8@gmail.com', 'Ilenia Gonzalez Martinez', NULL),
('00000009A', '1234', 'profe9@gmail.com', 'Jose Ponze De Leon', 3),
('00000010A', '1234', 'profe10@hotmail.com', 'Mari Toldo Ramirez', NULL),
('00000011A', '1234', 'profe11@gmail.com', 'Juan Perez De Dios', NULL),
('00000012A', '1234', 'profe12@gmail.com', 'Aitor Ortega Perez', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`Usuario`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`ID_Alumno`),
  ADD KEY `ID_Clase` (`ID_Clase`),
  ADD KEY `Padre` (`Padre`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`ID_Asig`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`ID_Clase`),
  ADD KEY `Tutor` (`Tutor`);

--
-- Indices de la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD PRIMARY KEY (`ID_Alumno`,`ID_Asig`,`Fecha`),
  ADD KEY `ID_Asig` (`ID_Asig`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`Clase`,`Dia`,`Hora`),
  ADD KEY `Hora` (`Hora`),
  ADD KEY `Profesor` (`Profesor`),
  ADD KEY `Asignatura` (`Asignatura`);

--
-- Indices de la tabla `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`Hora`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`ID_Alumno`,`ID_Clase`,`ID_Asig`),
  ADD KEY `ID_Asig` (`ID_Asig`);

--
-- Indices de la tabla `padres`
--
ALTER TABLE `padres`
  ADD PRIMARY KEY (`Alumnos`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`Usuario`),
  ADD KEY `Tutoria` (`Tutoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  MODIFY `ID_Asig` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `ID_Clase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
