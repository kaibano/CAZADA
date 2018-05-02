-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2018 a las 18:10:11
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
  `ID_Clase` int(11) NOT NULL,
  `Padre` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Apellidos` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `Asignaturas` varchar(400) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`ID_Alumno`, `ID_Clase`, `Padre`, `Nombre`, `Apellidos`, `Asignaturas`) VALUES
(5942, 1, '49268543X', 'Jacinto', 'Perez Pacuito', '1 2 3 4 8 9 10 11 12'),
(5943, 1, '49268544X', 'Ramon', 'Casas Martinez', '1 2 3 4 8 9 10 11 12'),
(5944, 1, '49268545X', 'Carlos', 'Ramon Sanchez', '1 2 3 4 8 9 10 11 12'),
(5945, 1, '49268546X', 'Juan', 'Buenavida Pascual', '1 2 3 4 8 9 10 11 12'),
(5946, 1, '49268547X', 'Raul', 'Martin Perez', '1 2 3 4 8 9 10 11 12'),
(5947, 1, '49268548X', 'Ruben', 'Perez Santiago', '1 2 3 4 8 9 10 11 12'),
(5948, 1, '49268549X', 'David', 'Carmelo Blanco', '1 2 3 4 8 9 10 11 12'),
(5949, 1, '49268540X', 'Daniel', 'Carrero Humanes', '1 2 3 4 8 9 10 11 12'),
(5950, 1, '49268550X', 'Fernando', 'Sol Luz', '1 2 3 4 8 9 10 11 12'),
(5951, 1, '49268553X', 'Francisco', 'Felipe Santos', '1 2 3 4 8 9 10 11 12'),
(5952, 1, '49268552X', 'Manuel', 'Carro Gomez', '1 2 3 4 8 9 10 11 12');

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
(1, '74125968H', '1A - ESO'),
(2, '96325481D', '2A - ESO');

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
  `Asignatura` int(11) NOT NULL,
  `Profesor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`Clase`, `Dia`, `Hora`, `Asignatura`, `Profesor`) VALUES
(1, 1, 1, 1, '23569874K'),
(1, 1, 2, 2, '41203587T'),
(1, 1, 3, 3, '74125968H'),
(1, 1, 4, 4, '85246781D'),
(1, 1, 5, 5, '96321548S'),
(1, 1, 6, 8, '96325481D');

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
  `Alumnos` varchar(400) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `padres`
--

INSERT INTO `padres` (`Usuario`, `Password`, `Mail`, `Nombre`, `Apellidos`, `Alumnos`) VALUES
('49268543X', '1234', 'padre1@gmail.com', 'Papa', 'papito papi', '5942'),
('49268544X', '1234', 'padre2@gmail.com', 'Papa', 'papito papi', '5943'),
('49268545X', '1234', 'padre3@gmail.com', 'Papa', 'papito papi', '5944'),
('49268546X', '1234', 'padre4@gmail.com', 'Papa', 'papito papi', '5945'),
('49268547X', '1234', 'padre5@gmail.com', 'Papa', 'papito papi', '5946'),
('49268548X', '1234', 'padre6@gmail.com', 'Papa', 'papito papi', '5947'),
('49268549X', '1234', 'padre7@gmail.com', 'Papa', 'papito papi', '5948'),
('49268540X', '1234', 'padre8@gmail.com', 'Papa', 'papito papi', '5949'),
('49268550X', '1234', 'padre9@gmail.com', 'Papa', 'papito papi', '5950'),
('49268553X', '1234', 'padre10@gmail.com', 'Papa', 'papito papi', '5951'),
('49268552X', '1234', 'padre11@gmail.com', 'Papa', 'papito papi', '5952')
;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Apellidos` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `Tutoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`Usuario`, `Password`, `Mail`, `Nombre`, `Apellidos`, `Tutoria`) VALUES
('23569874K', '1234', 'pro@gmail.com', 'Agustin', 'Hidalgo Ramirez', NULL),
('41203587T', '1234', 'profesora@gmail.com', 'Elena', 'Vazquez Bernal', NULL),
('74125968H', '1234', 'profe@gmail.com', 'Profee', 'Maestro teacher', 1),
('85246781D', '1234', 'teacher@hotmail.com', 'Tomas', 'Linda Soriano', NULL),
('96321548S', '1234', 'profess@gmail.com', 'Paloma', 'Estaban Garrido', NULL),
('96325481D', '1234', 'profe2@gmail.com', 'Manuela', 'Velasco Zorrilla', 2);

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
  ADD PRIMARY KEY (`ID_Alumno`,`ID_Clase`),
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
  ADD PRIMARY KEY (`Clase`,`Hora`),
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
  ADD PRIMARY KEY (`Usuario`);

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
  MODIFY `ID_Clase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`ID_Clase`) REFERENCES `clases` (`ID_Clase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`Padre`) REFERENCES `padres` (`Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`Tutor`) REFERENCES `profesores` (`Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD CONSTRAINT `faltas_ibfk_1` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumnos` (`ID_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `faltas_ibfk_2` FOREIGN KEY (`ID_Asig`) REFERENCES `asignaturas` (`ID_Asig`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`Clase`) REFERENCES `clases` (`ID_Clase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `horarios_ibfk_2` FOREIGN KEY (`Hora`) REFERENCES `horas` (`Hora`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `horarios_ibfk_3` FOREIGN KEY (`Profesor`) REFERENCES `profesores` (`Usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `horarios_ibfk_4` FOREIGN KEY (`Asignatura`) REFERENCES `asignaturas` (`ID_Asig`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`ID_Alumno`,`ID_Clase`) REFERENCES `alumnos` (`ID_Alumno`, `ID_Clase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`ID_Asig`) REFERENCES `asignaturas` (`ID_Asig`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`Tutoria`) REFERENCES `clases` (`ID_Clase`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
