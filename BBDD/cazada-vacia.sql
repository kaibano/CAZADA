-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2018 a las 21:51:54
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
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `ID_Asig` int(11) NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `ID_Clase` int(11) NOT NULL,
  `Tutor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Clase` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
