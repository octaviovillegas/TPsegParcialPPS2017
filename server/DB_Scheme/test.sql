-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2017 a las 23:26:08
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
  `city` varchar(50) NOT NULL,
  `userid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`addressid`, `street`, `number`, `floor`, `department`, `clarification`, `city`, `userid`) VALUES
(0, 'Calle', '12357184', 'Piso', 'Departamento', 'Aclaración', 'Localidad', 1),
(1, '9 de Julio', '2722', 'PB', '', 'Es un Bar', 'Lanus', 2),
(2, '9 de Julio', '1510', 'PB', 'Local', 'Es un local', 'Lanus', 3),
(12, 'Falsa', '231', 'PB', 'A', 'Aclaración', 'Lanus', 4),
(20, 'Gral. Arias', '1824', '', '', 'Estadio de fútbol', 'Lanús', 12),
(30, 'Av Siempre viva', '743', '', '', '', 'Springfield', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `answerid` bigint(18) NOT NULL,
  `text` text NOT NULL,
  `userid` bigint(18) DEFAULT NULL,
  `questionid` bigint(18) NOT NULL,
  `surveyid` bigint(18) NOT NULL,
  `choosenothing` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `answers`
--

INSERT INTO `answers` (`answerid`, `text`, `userid`, `questionid`, `surveyid`, `choosenothing`) VALUES
(35, 'Es puntual. Es bastante exigente.', 4, 64, 62, 0),
(36, '', 4, 65, 63, 0),
(37, '', 12, 65, 63, 0),
(38, 'Excelente. 100% recomendado, 1link , mega, no virus', 12, 64, 62, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `attendancelistitems`
--

CREATE TABLE `attendancelistitems` (
  `attendancelistitemid` bigint(18) NOT NULL,
  `studentid` bigint(18) NOT NULL,
  `present` tinyint(1) NOT NULL,
  `attendancelistid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `attendancelists`
--

CREATE TABLE `attendancelists` (
  `attendancelistid` bigint(18) NOT NULL,
  `classid` bigint(18) NOT NULL,
  `creationdate` date NOT NULL,
  `ownerid` bigint(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classes`
--

CREATE TABLE `classes` (
  `classid` bigint(18) NOT NULL,
  `divisionid` bigint(18) NOT NULL,
  `subjectid` bigint(18) NOT NULL,
  `classroomid` bigint(18) NOT NULL,
  `teacherid` bigint(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`classid`, `divisionid`, `subjectid`, `classroomid`, `teacherid`) VALUES
(1, 1, 4, 1, 2),
(2, 1, 5, 6, 22),
(3, 1, 6, 7, 22),
(4, 1, 7, 8, 22),
(5, 2, 4, 1, 2),
(6, 2, 5, 6, 22),
(7, 2, 6, 7, 22),
(8, 2, 7, 8, 22),
(9, 3, 4, 1, 22),
(10, 3, 5, 6, 22),
(11, 3, 6, 7, 22),
(12, 3, 7, 8, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classrooms`
--

CREATE TABLE `classrooms` (
  `classroomid` bigint(18) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `classrooms`
--

INSERT INTO `classrooms` (`classroomid`, `name`) VALUES
(1, '100'),
(2, '101'),
(3, '102'),
(4, '103'),
(5, '200'),
(6, '201'),
(7, '202'),
(8, '300'),
(9, '301'),
(10, '302');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisions`
--

CREATE TABLE `divisions` (
  `divisionid` bigint(18) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `divisions`
--

INSERT INTO `divisions` (`divisionid`, `name`) VALUES
(1, '1 A'),
(2, '1 B'),
(3, '1 C'),
(4, '2 A'),
(5, '2 B'),
(6, '2 C'),
(7, '3 A'),
(8, '3 B'),
(9, '3 C'),
(10, '4 A'),
(11, '4 B'),
(12, '4 C');

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
(63, 'Matemática', 0, 65),
(64, 'Estadística', 0, 65);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `optionsbyanswer`
--

CREATE TABLE `optionsbyanswer` (
  `optionsbyanswerid` bigint(18) NOT NULL,
  `optionid` bigint(18) NOT NULL,
  `answerid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `optionsbyanswer`
--

INSERT INTO `optionsbyanswer` (`optionsbyanswerid`, `optionid`, `answerid`) VALUES
(29, 63, 36),
(30, 63, 37);

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
(9, 3, 1),
(10, 7, 1),
(11, 8, 4),
(12, 4, 3);

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
(64, '¿Qué te parece R. Fonte como profesor?', 62),
(65, '¿Qué materia te resultó más difícil?', 63);

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
-- Estructura de tabla para la tabla `studentsbyclass`
--

CREATE TABLE `studentsbyclass` (
  `studentsbyclassid` bigint(18) NOT NULL,
  `studentid` bigint(18) NOT NULL,
  `classid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `studentsbyclass`
--

INSERT INTO `studentsbyclass` (`studentsbyclassid`, `studentid`, `classid`) VALUES
(2, 12, 1),
(3, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--

CREATE TABLE `subjects` (
  `subjectid` bigint(18) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`subjectid`, `name`) VALUES
(1, 'Introducción a la Programación'),
(2, 'Lectura Comprensiva'),
(3, 'Matemática Inicial'),
(4, 'Matemática'),
(5, 'Sistema de Procesamiento de Datos'),
(6, 'Programación I'),
(7, 'Laboratorio de Computación I'),
(8, 'Arquitectura y Sistemas Operativos'),
(9, 'Estadística'),
(10, 'Inglés II'),
(11, 'Programación II'),
(12, 'Laboratorio de Computación II'),
(13, 'Metodología de la Investigación'),
(14, 'Elementos de la Investigación Operativa'),
(15, 'Programación III'),
(16, 'Laboratorio de Computación III'),
(17, 'Organización Contable de la Empresa'),
(18, 'Organización Empresarial'),
(19, 'Diseño y Administración de Base de Datos'),
(20, 'Laboratorio de Computación IV'),
(21, 'Legislación'),
(22, 'Metodología de Sistemas I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE `surveys` (
  `surveyid` bigint(18) NOT NULL,
  `title` text NOT NULL,
  `creationdate` date NOT NULL,
  `enddate` date NOT NULL,
  `ownerid` bigint(20) DEFAULT NULL,
  `waseliminated` tinyint(1) NOT NULL DEFAULT '0',
  `surveytypeid` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `surveys`
--

INSERT INTO `surveys` (`surveyid`, `title`, `creationdate`, `enddate`, `ownerid`, `waseliminated`, `surveytypeid`) VALUES
(62, 'Opinión sobre el profesor', '2017-06-23', '2017-07-31', 2, 0, 1),
(63, 'Dificultad de la materia', '2017-06-23', '2017-08-24', 2, 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveytype`
--

CREATE TABLE `surveytype` (
  `surveytypeid` bigint(18) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `surveytype`
--

INSERT INTO `surveytype` (`surveytypeid`, `name`, `description`) VALUES
(1, 'FreeAnswer', 'El usuario ingresa la respuesta por medio de un textarea.'),
(2, 'Radiobuttons1Correct2Graphics', 'La respuesta es por medio de opciones predefinidas y sólo se puede seleccionar una. Se utilizan radiobuttons. Existe una respuesta correcta'),
(3, 'Radiobuttons1Graphic', 'La respuesta es por medio de opciones predefinidas y sólo se puede seleccionar una. No existe respuesta correcta, ya que se busca obtener la tendencia de opinión.'),
(4, 'Checkboxes1GraphicChooseNothing', 'La respuesta es por medio de opciones predefinidas y se puede seleccionar todas o ninguna. No hay respuesta correcta.'),
(5, 'CheckboxesCorrects2GraphicsChooseNothing', 'La respuesta es por medio de opciones predefinidas y se puede seleccionar todas o ninguna. Exite 1 o varias respuestas correctas, incluso la opción correcta podría llegar a ser no seleccionar ninguna.');

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
  `filenumber` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userid`, `username`, `email`, `password`, `rolid`, `firstname`, `lastname`, `filenumber`) VALUES
(1, 'EjemploAdministrator', 'admin@admin.com', '123456', 1, 'Ejemplo', 'Administrador', 111111),
(2, 'RFonte', 'ruben@fonte.com', '123456', 2, 'Rubén', 'Fonte', 2222),
(3, 'EjemploAdministrative', 'administrative@administrative.com', '123456', 3, 'Ejemplo', 'Administrativo', 0),
(4, 'NicoCabrera', 'nicolascabrera@yahoo.com.ar', '123456', 4, 'Nicolás', 'Cabrera', 35468),
(12, 'feden91', 'feden@feden.com', '123456', 4, 'Federico', 'Nuñez', 100321),
(22, 'O. Villegas', 'ocatavio@villegas.com', '123456', 2, 'Octavio', 'Villegas', 935442);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`addressid`),
  ADD KEY `userid` (`userid`);

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answerid`),
  ADD KEY `surveyid` (`surveyid`),
  ADD KEY `userid` (`userid`);

--
-- Indices de la tabla `attendancelistitems`
--
ALTER TABLE `attendancelistitems`
  ADD PRIMARY KEY (`attendancelistitemid`),
  ADD KEY `attendancelistid` (`attendancelistid`),
  ADD KEY `studentid` (`studentid`),
  ADD KEY `studentid_2` (`studentid`);

--
-- Indices de la tabla `attendancelists`
--
ALTER TABLE `attendancelists`
  ADD PRIMARY KEY (`attendancelistid`),
  ADD KEY `classid` (`classid`),
  ADD KEY `ownerid` (`ownerid`);

--
-- Indices de la tabla `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`classid`),
  ADD KEY `teacherid` (`teacherid`);

--
-- Indices de la tabla `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`classroomid`);

--
-- Indices de la tabla `divisions`
--
ALTER TABLE `divisions`
  ADD PRIMARY KEY (`divisionid`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`optionid`),
  ADD KEY `questionid` (`questionid`);

--
-- Indices de la tabla `optionsbyanswer`
--
ALTER TABLE `optionsbyanswer`
  ADD PRIMARY KEY (`optionsbyanswerid`),
  ADD KEY `optionid` (`optionid`),
  ADD KEY `answerid` (`answerid`);

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
-- Indices de la tabla `studentsbyclass`
--
ALTER TABLE `studentsbyclass`
  ADD PRIMARY KEY (`studentsbyclassid`),
  ADD KEY `classid` (`classid`),
  ADD KEY `studentid` (`studentid`);

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subjectid`);

--
-- Indices de la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`surveyid`),
  ADD KEY `ownerid` (`ownerid`),
  ADD KEY `surveytypeid` (`surveytypeid`);

--
-- Indices de la tabla `surveytype`
--
ALTER TABLE `surveytype`
  ADD PRIMARY KEY (`surveytypeid`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `rolid` (`rolid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `addressid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `answerid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `attendancelistitems`
--
ALTER TABLE `attendancelistitems`
  MODIFY `attendancelistitemid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `attendancelists`
--
ALTER TABLE `attendancelists`
  MODIFY `attendancelistid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `classid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `classroomid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `divisions`
--
ALTER TABLE `divisions`
  MODIFY `divisionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options`
  MODIFY `optionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT de la tabla `optionsbyanswer`
--
ALTER TABLE `optionsbyanswer`
  MODIFY `optionsbyanswerid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permissionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `permissionsbyrol`
--
ALTER TABLE `permissionsbyrol`
  MODIFY `permissionbyrolid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `questionid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT de la tabla `studentsbyclass`
--
ALTER TABLE `studentsbyclass`
  MODIFY `studentsbyclassid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subjectid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `surveys`
--
ALTER TABLE `surveys`
  MODIFY `surveyid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `surveytype`
--
ALTER TABLE `surveytype`
  MODIFY `surveytypeid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userid` bigint(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `attendancelistitems`
--
ALTER TABLE `attendancelistitems`
  ADD CONSTRAINT `attendancelistitems_ibfk_1` FOREIGN KEY (`attendancelistid`) REFERENCES `attendancelists` (`attendancelistid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelistitems_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `attendancelists`
--
ALTER TABLE `attendancelists`
  ADD CONSTRAINT `attendancelists_ibfk_1` FOREIGN KEY (`classid`) REFERENCES `classes` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelists_ibfk_2` FOREIGN KEY (`ownerid`) REFERENCES `users` (`userid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `users` (`userid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`questionid`) REFERENCES `questions` (`questionid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `optionsbyanswer`
--
ALTER TABLE `optionsbyanswer`
  ADD CONSTRAINT `optionsbyanswer_ibfk_1` FOREIGN KEY (`optionid`) REFERENCES `options` (`optionid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `optionsbyanswer_ibfk_2` FOREIGN KEY (`answerid`) REFERENCES `answers` (`answerid`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `studentsbyclass`
--
ALTER TABLE `studentsbyclass`
  ADD CONSTRAINT `studentsbyclass_ibfk_1` FOREIGN KEY (`classid`) REFERENCES `classes` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentsbyclass_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `users` (`userid`) ON DELETE SET NULL,
  ADD CONSTRAINT `surveys_ibfk_2` FOREIGN KEY (`surveytypeid`) REFERENCES `surveytype` (`surveytypeid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolid`) REFERENCES `roles` (`rolid`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
