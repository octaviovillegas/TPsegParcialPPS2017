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
	    $consulta =$objetoAccesoDato->RetornarConsulta("select c.*, com.descripcion as comision_descripcion from cursos c, comisiones com where c.id_comision = com.id_comision");
		$consulta->execute();			
		$arrCurso= $consulta->fetchAll(PDO::FETCH_CLASS, "Curso");	
		return $arrCurso;
	}
	

	
	public static function AltaCurso($curso)
	{
		 $sql = 'insert into cursos (descripcion, id_comision, id_usuario) values (:descripcion, :id_comision, :id_usuario)';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':descripcion',$curso->descripcion, PDO::PARAM_STR);
	    $consulta->bindValue(':id_comision',$curso->id_comision, PDO::PARAM_INT);
	    $consulta->bindValue(':id_usuario',$curso->id_usuario, PDO::PARAM_INT);
	    return $consulta->execute();
	}
	
		public static function AltaAlumno($alcur)
	{
		 $sql = 'insert into usuarios_cursos (id_usuario, id_curso) values (:id_usuario, :id_curso)';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_curso',$alcur->id_curso, PDO::PARAM_STR);
	    $consulta->bindValue(':id_usuario',$alcur->id_usuario, PDO::PARAM_INT);
	    return $consulta->execute();
	}

	public static function ModificarCurso($curso)
	{
		 $sql = 'UPDATE cursos SET id_comision=:id_comision,id_usuario=:id_usuario,descripcion=:descripcion WHERE id_curso=:id_curso';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':descripcion',$curso->descripcion, PDO::PARAM_STR);
	     $consulta->bindValue(':id_curso',$curso->id_curso, PDO::PARAM_INT);
	    $consulta->bindValue(':id_comision',$curso->id_comision, PDO::PARAM_INT);
	    $consulta->bindValue(':id_usuario',$curso->id_usuario, PDO::PARAM_INT);
	    return $consulta->execute();
	}

	
	public static function EliminarCurso($curso)
	{
		 $sql = 'delete from cursos WHERE id_curso=:id_curso';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	     $consulta->bindValue(':id_curso',$curso->id_curso, PDO::PARAM_INT);
	    return $consulta->execute();
	}

 
}