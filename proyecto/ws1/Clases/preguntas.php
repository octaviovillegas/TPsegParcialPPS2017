<?php
require_once"AccesoDatos.php";
class Pregunta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $pregunta;
	public $opcion1;
	public $opcion2;
	public $opcion3;
	public $opcion4;
	public $tipo;
	public $id_encuesta;


//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function InsertarPregunta($pregunta)
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta("insert into preguntas
		(id_encuesta,descripcion,opcion1,opcion2,opcion3,opcion4,tipo)
		VALUES (:id_encuesta,:pregunta,:opcion1,:opcion2,:opcion3,:opcion4,:tipo)");
		$consulta->bindValue(':id_encuesta',$pregunta->idEncuesta, PDO::PARAM_INT);
		$consulta->bindValue(':pregunta',$pregunta->pregunta, PDO::PARAM_STR);
		$consulta->bindValue(':opcion1',$pregunta->opcion1, PDO::PARAM_STR);
		$consulta->bindValue(':opcion2',$pregunta->opcion2, PDO::PARAM_STR);
		$consulta->bindValue(':opcion3',$pregunta->opcion3, PDO::PARAM_STR);
		$consulta->bindValue(':opcion4',$pregunta->opcion4, PDO::PARAM_STR);
		$consulta->bindValue(':tipo',$pregunta->tipo, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}

	public static function traerPreguntasByIdEncuesta($id_encuesta) {
		$cnx = AccesoDatos::dameUnObjetoAcceso();

        $sql = 'SELECT * FROM preguntas WHERE id_encuesta = :id_encuesta';

		$consulta = $cnx->RetornarConsulta($sql);

        $consulta->bindValue(':id_encuesta', $id_encuesta, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_CLASS, "Pregunta");
	}

	public static function eliminarPregunta ($id_pregunta) {

		// Elimino las respuestas de usuario de la pregunta id_pregunta.
		$sql = 'DELETE FROM usuario_respuestas WHERE id_pregunta = :id_pregunta';
		$cnx = AccesoDatos::dameUnObjetoAcceso();
		$consulta = $cnx->RetornarConsulta($sql);
		$cnx = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id_pregunta', $id_pregunta, PDO::PARAM_INT);
		$consulta->execute();

		$sql = 'DELETE FROM preguntas WHERE id_pregunta = :id_pregunta';

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta($sql);
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id_pregunta', $id_pregunta, PDO::PARAM_INT);

		return $consulta->execute();
	}


}
