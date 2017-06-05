-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2017 a las 07:55:51
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `addressid` bigint(18) NOT NULL,
  `street` text NOT NULL,
  `number` varchar(50) NOT NULL,
  `floor` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `clarification` text NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`addressid`, `street`, `number`, `floor`, `department`, `clarification`, `city`) VALUES
(0, 'Calle', '12357184', 'Piso', 'Departamento', 'Aclaración', 'Localidad'),
(1, '9 de Julio', '2722', 'PB', '', 'Es un Bar', 'Lanus'),
(2, '9 de Julio', '1510', 'PB', 'Local', 'Es un local', 'Lanus'),
(12, 'Falsa', '231', 'PB', 'A', 'Aclaración', 'Lanus');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `options`
--

CREATE TABLE `options` (
  `optionid` bigint(18) NOT NULL,
  `text` text NOT NULL,
  `isright` tinyint(1) NOT NULL,
  `questionid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `options`
--

INSERT INTO `options` (`optionid`, `text`, `isright`, `questionid`) VALUES
(13, 'Soy el texto de una opción correcta', 1, 52),
(14, 'Soy el texto de una opción incorrecta', 0, 52),
(15, 'Soy el texto de una opción correcta', 1, 53),
(16, 'Soy el texto de una opción correcta', 1, 53),
(17, 'Soy el texto de una opción correcta', 1, 54),
(18, 'Soy el texto de una opción incorrecta', 0, 54),
(19, 'Soy el texto de una opción correcta', 1, 55),
(20, 'Soy el texto de una opción incorrecta', 0, 55),
(21, 'Soy el texto de una opción correcta', 1, 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `permissionid` bigint(18) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`permissionid`, `description`) VALUES
(1, 'Gestionar profesor'),
(2, 'Gestionar administrativo'),
(3, 'Gestionar usuarios'),
(4, 'Gestionar encuestas'),
(5, 'Ver encuestas'),
(6, 'Tomar asistencia'),
(7, 'Ver estadísticas'),
(8, 'Ver faltas y asistencias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissionsbyrol`
--

CREATE TABLE `permissionsbyrol` (
  `permissionbyrolid` bigint(18) NOT NULL,
  `permissionid` bigint(18) NOT NULL,
  `rolid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permissionsbyrol`
--

INSERT INTO `permissionsbyrol` (`permissionbyrolid`, `permissionid`, `rolid`) VALUES
(1, 4, 2),
(2, 6, 2),
(3, 7, 2),
(4, 5, 4),
(5, 6, 3),
(6, 3, 3),
(7, 2, 1),
(8, 1, 1),
(9, 3, 1),
(10, 7, 1),
(11, 8, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `questionid` bigint(18) NOT NULL,
  `text` text NOT NULL,
  `surveyid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`questionid`, `text`, `surveyid`) VALUES
(52, '¿Una pregunta?', 50),
(53, '¿Una pregunta?', 51),
(54, '¿Una pregunta?', 52),
(55, '¿Una pregunta?', 53);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rolid` bigint(18) NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rolid`, `code`) VALUES
(1, 'Administrator'),
(2, 'Teacher'),
(3, 'Administrative'),
(4, 'Student');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE `surveys` (
  `surveyid` bigint(18) NOT NULL,
  `title` text NOT NULL,
  `creationdate` date NOT NULL,
  `enddate` date NOT NULL,
  `ownerid` bigint(20) NOT NULL,
  `waseliminated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `surveys`
--

INSERT INTO `surveys` (`surveyid`, `title`, `creationdate`, `enddate`, `ownerid`, `waseliminated`) VALUES
(50, 'Titulo de la encuesta', '2017-05-02', '2017-06-01', 3, 0),
(51, 'Titulo de la encuesta', '2017-06-02', '2030-08-04', 2, 0),
(52, 'Titulo de la encuesta', '2017-06-02', '0000-00-00', 1, 0),
(53, 'Titulo de la encuesta', '2017-06-02', '2030-08-04', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userid` bigint(18) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `rolid` bigint(18) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `addressid` bigint(18) NOT NULL,
  `filenumber` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userid`, `username`, `email`, `password`, `rolid`, `firstname`, `lastname`, `addressid`, `filenumber`) VALUES
(1, 'EjemploAdministrator', 'admin@admin.com', '123456', 1, 'Ejemplo', 'Administrador', 0, 111111),
(2, 'EjemploTeacher', 'teacher@teacher.com', '123456', 2, 'Ejemplo', 'Profesor', 1, 2222),
(3, 'EjemploAdministrative', 'administrative@administrative.com', '123456', 3, 'Ejemplo', 'Administrativo', 2, 0),
(4, 'EjemploStudent', 'student@student.com', '123456', 4, 'Ejemplo', 'Alumno', 12, 35468);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`addressid`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`optionid`),
  ADD KEY `questionid` (`questionid`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permissionid`);

--
-- Indices de la tabla `permissionsbyrol`
--
ALTER TABLE `permissionsbyrol`
  ADD PRIMARY KEY (`permissionbyrolid`),
  ADD KEY `permissionid` (`permissionid`),
  ADD KEY `rolid` (`rolid`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questionid`),
  ADD KEY `surveyid` (`surveyid`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rolid`);

--
-- Indices de la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`surveyid`),
  ADD KEY `ownerid` (`ownerid`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `rolid` (`rolid`),
  ADD KEY `addressid` (`addressid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `addressid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options`
  MODIFY `optionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permissionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `permissionsbyrol`
--
ALTER TABLE `permissionsbyrol`
  MODIFY `permissionbyrolid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `questionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de la tabla `surveys`
--
ALTER TABLE `surveys`
  MODIFY `surveyid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`questionid`) REFERENCES `questions` (`questionid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permissionsbyrol`
--
ALTER TABLE `permissionsbyrol`
  ADD CONSTRAINT `permissionsbyrol_ibfk_1` FOREIGN KEY (`rolid`) REFERENCES `roles` (`rolid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permissionsbyrol_ibfk_2` FOREIGN KEY (`permissionid`) REFERENCES `permissions` (`permissionid`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`surveyid`) REFERENCES `surveys` (`surveyid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `users` (`userid`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolid`) REFERENCES `roles` (`rolid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`addressid`) REFERENCES `addresses` (`addressid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
