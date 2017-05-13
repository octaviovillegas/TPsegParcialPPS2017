-- -----------------------------------------------------
-- Table `encuestas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encuestas` (
  `id_encuesta` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  `id_curso` INT(11) NOT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  PRIMARY KEY (`id_encuesta`));


-- -----------------------------------------------------
-- Table `preguntas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `preguntas` (
  `id_pregunta` INT NOT NULL AUTO_INCREMENT,
  `id_encuesta` INT NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  INDEX `fk_preguntas_encuestas_idx` (`id_encuesta` ASC));


-- -----------------------------------------------------
-- Table `respuestas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `respuestas` (
  `id_respuesta` INT NOT NULL AUTO_INCREMENT,
  `id_pregunta` INT NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  INDEX `fk_respuestas_preguntas1_idx` (`id_pregunta` ASC));


-- -----------------------------------------------------
-- Table `tipos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipos_usuarios` (
  `id_tipo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_tipo`));


-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `id_tipo` INT NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuarios_tipos_usuarios1_idx` (`id_tipo` ASC));


-- -----------------------------------------------------
-- Table `comisiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comisiones` (
  `id_comision` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_comision`));


-- -----------------------------------------------------
-- Table `cursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` INT NOT NULL AUTO_INCREMENT,
  `id_comision` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_curso`),
  INDEX `fk_cursos_comisiones1_idx` (`id_comision` ASC),
  INDEX `fk_cursos_usuarios1_idx` (`id_usuario` ASC));


-- -----------------------------------------------------
-- Table `encuestas_has_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encuestas_has_usuarios` (
  `encuestas_id_encuesta` INT NOT NULL,
  `usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`encuestas_id_encuesta`, `usuarios_id_usuario`),
  INDEX `fk_encuestas_has_usuarios_usuarios1_idx` (`usuarios_id_usuario` ASC),
  INDEX `fk_encuestas_has_usuarios_encuestas1_idx` (`encuestas_id_encuesta` ASC));
