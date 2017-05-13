-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 13-05-2017 a las 20:09:38
-- Versión del servidor: 5.1.68-community
-- Versión de PHP: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `facultad_parcial2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE IF NOT EXISTS `comisiones` (
  `id_comision` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id_comision`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_comision` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `descripcion` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE IF NOT EXISTS `encuestas` (
  `id_encuesta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  `id_curso` int(11) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id_encuesta`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas_usuarios`
--

CREATE TABLE IF NOT EXISTS `encuestas_usuarios` (
  `encuestas_id_encuesta` int(11) NOT NULL,
  `usuarios_id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`encuestas_id_encuesta`,`usuarios_id_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE IF NOT EXISTS `preguntas` (
  `id_pregunta` int(11) NOT NULL AUTO_INCREMENT,
  `id_encuesta` int(11) NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id_pregunta`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE IF NOT EXISTS `respuestas` (
  `id_respuesta` int(11) NOT NULL AUTO_INCREMENT,
  `id_pregunta` int(11) NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  `tipo` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id_respuesta`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_usuarios`
--

CREATE TABLE IF NOT EXISTS `tipos_usuarios` (
  `id_tipo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `tipos_usuarios`
--

INSERT INTO `tipos_usuarios` (`id_tipo`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Administrativo'),
(3, 'Alumno'),
(4, 'Profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_tipos_usuarios1_idx` (`id_tipo`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_tipo`, `nombre`) VALUES
(1, 1, 'Administrador'),
(2, 2, 'Administrativo'),
(3, 3, 'Alumno'),
(4, 4, 'Profesor');
