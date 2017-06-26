<?php
require_once "AccesoDatos.php";

class UsuarioRespuestas
{
    public $id_usuario;
    public $id_pregunta;
    public $opcion;

    public static function agregarRespuesta($respuesta) {
        $sql = 'INSERT INTO usuario_respuestas (id_usuario, id_pregunta, opcion)
        VALUES (:id_usuario, :id_pregunta, :opcion)';

        $cnx = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $cnx->RetornarConsulta($sql);
        $consulta->bindValue(':id_usuario', $respuesta->id_usuario, PDO::PARAM_INT);
        $consulta->bindValue(':id_pregunta', $respuesta->id_pregunta, PDO::PARAM_INT);
        $consulta->bindValue(':opcion', $respuesta->opcion, PDO::PARAM_STR);
        $consulta->execute();

        return $cnx->RetornarUltimoIdInsertado();
    }


 


		public static function respuestasDePreguntas()
		{
			   $sql = 'select p.tipo, ur.id_pregunta, p.descripcion, ur.opcion, count(ur.opcion) as cantResp
				from usuario_respuestas ur, preguntas p 
				where
				ur.id_pregunta = p.id_pregunta 
				and  (p.tipo = "checkbox"  || p.tipo = "radio") 
				group by ur.opcion
				order by p.descripcion';

       			$cnx = AccesoDatos::dameUnObjetoAcceso();
       			$consulta = $cnx->RetornarConsulta($sql);
 
        		$consulta->execute();

				$res= $consulta->fetchAll(PDO::FETCH_CLASS, "UsuarioRespuestas");
				return $res;
		}
	    
        public static function encuestasPorCurso() {
        $sql = 'select c.descripcion as curso, count(e.id_encuesta) as cantidad_encuestas 
				from encuestas e, cursos c
				where e.id_curso = c.id_curso
				 group by e.id_curso';

        $cnx = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $cnx->RetornarConsulta($sql);
 
        $consulta->execute();


		$res= $consulta->fetchAll(PDO::FETCH_CLASS, "UsuarioRespuestas");
		return $res;
        
 	   }


 	    public static function alumnosPorCurso() {
        $sql = 'select c.descripcion as curso, count(uc.id_usuario) as cantidad_alumnos
				from cursos c , usuarios_cursos uc
				where c.id_curso=uc.id_curso
				group by c.descripcion';

        $cnx = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $cnx->RetornarConsulta($sql);
 
        $consulta->execute();

        
		$res= $consulta->fetchAll(PDO::FETCH_CLASS, "UsuarioRespuestas");
		return $res;
 	   }


}
