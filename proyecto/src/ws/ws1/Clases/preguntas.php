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
	
 
}
