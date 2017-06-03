<?php
require_once"AccesoDatos.php";
class comision
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_comision;
 	public $descripcion;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerTodosLasComisiones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select * from comisiones");
		$consulta->execute();			
		$arrCurso= $consulta->fetchAll(PDO::FETCH_CLASS, "comision");	
		return $arrCurso;
	}

		public static function ModificarComision($comision)
	{
		 $sql = 'UPDATE comisiones SET descripcion = :descripcion WHERE id_comision = :id_comision';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_comision',$comision->id_comision, PDO::PARAM_INT);
	    $consulta->bindValue(':descripcion',$comision->descripcion, PDO::PARAM_STR);
	    return $consulta->execute();
	}
	

	 		public static function EliminarComision($comision)
	{
		 $sql = 'delete from comisiones WHERE id_comision = :id_comision';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_comision',$comision->id_comision, PDO::PARAM_INT);
	    return $consulta->execute();
	}

			public static function AltaComision($comision)
	{
		 $sql = 'insert into comisiones (descripcion) values (:descripcion)';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':descripcion',$comision->descripcion, PDO::PARAM_STR);
	    return $consulta->execute();
	}
	
	
 
}