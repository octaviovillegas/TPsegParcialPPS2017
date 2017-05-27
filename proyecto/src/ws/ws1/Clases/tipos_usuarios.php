<?php
require_once "AccesoDatos.php";
class tipos_usuarios
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	 
	public $id_tipo;
	public $descripcion;
 

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
 
 
	public function getIdTipo()
	{
		return $this->id_tipo;
	}

	public function Getnombre()
	{
		return $this->descripcion;
	}

	

	public function SetIdTipo($parametro)
	{
		 $this->id_tipo = $parametro;

	}	public function Setrol($parametro)
	{
		 $this->descripcion = $parametro;
	}



//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct()
	{
		 
	}

//--------------------------------------------------------------------------------//
//--TOSTRING
  	public function ToString()
	{
		return $id_tipo + $descripcion;
	  	 
	}
//--------------------------------------------------------------------------------//



}
