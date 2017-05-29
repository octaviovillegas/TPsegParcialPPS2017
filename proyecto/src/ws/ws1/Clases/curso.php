<?php
require_once"AccesoDatos.php";
class Curso
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_curso;
	public $id_comision;
	public $id_usuario;
 	public $descripcion;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerTodosLosCursos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select descripcion from cursos");
		$consulta->execute();			
		$arrCurso= $consulta->fetchAll(PDO::FETCH_CLASS, "Curso");	
		return $arrCurso;
	}
	
 
}