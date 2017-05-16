<?php
require_once "AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre_usuario;
	public $pass_usuario;
	public $id_rol;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function Getid_usuario()
	{
		return $this->id_usuario;
	}
	public function GetNombre_usuario()
	{
		return $this->nombre_usuario;
	}
	public function GetPass_usuario()
	{
		return $this->pass_usuario;
	}
	public function Getrol()
	{
		return $this->id_rol;
	}
	
	public function Setid_usuario($parametro)
	{
		 $this->id_usuario = $parametro;
	}
	public function SetNombre_usuario($parametro)
	{
		$this->nombre_usuario = $parametro;
	}
	public function SetPass_usuario($parametro)
	{
		$this->pass_usuario = $parametro;
	}
	public function Setrol($parametro)
	{
		 $this->id_rol = $parametro;
	}
	

	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Persona::TraerUnaPersona($dni);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->dni = $dni;
			$this->foto = $obj->foto;
			
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->apellido."-".$this->nombre."-".$this->dni."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($usuario) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario u  join rol r on u.id_rol = r.id_rol where u.nombre_usuario =:nombre_usuario");
		$consulta->bindValue(':nombre_usuario', $usuario, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Usuario');
		return $personaBuscada;	
					
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario usu JOIN rol ro ON usu.id_rol=ro.id_rol WHERE 1");
		$consulta->execute();			
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrEmpleado;
	}
public static function TraerTodosLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario usu JOIN rol ro ON usu.id_rol=ro.id_rol WHERE usu.id_rol = 3");
		$consulta->execute();			
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrEmpleado;
	}	
public static function TraerClientesEmpleados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario usu JOIN rol ro ON usu.id_rol=ro.id_rol WHERE (usu.id_rol = 3 XOR usu.id_rol = 2)");
		$consulta->execute();			
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrEmpleado;
	}	



	public static function BorrarUsuario($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("delete 
				from usuario 				
				WHERE id_usuario=:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarUsuario($usuario)
	{
		var_dump($usuario);
		if($usuario->descripcion_rol == "ADMINISTRADOR")
		{
			$usuario->id_rol = 1;
		}else if($usuario->descripcion_rol == "CLIENTE")
		{
			$usuario->id_rol = 3;
		}if($usuario->descripcion_rol == "ENCARGADO")
		{
			$usuario->id_rol = 4;
		}if($usuario->descripcion_rol == "EMPLEADO")
		{
			$usuario->id_rol = 2;
		}

	
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update usuario 
				set nombre_usuario=:nombre_usuario,
				pass_usuario=:pass_usuario,
				id_rol=:id_rol
				WHERE id_usuario=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$usuario->id_usuario, PDO::PARAM_INT);
			$consulta->bindValue(':nombre_usuario',$usuario->nombre_usuario, PDO::PARAM_STR);
			$consulta->bindValue(':pass_usuario', $usuario->pass_usuario, PDO::PARAM_STR);
			$consulta->bindValue(':id_rol', $usuario->id_rol, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertar($persona)
	{
		
	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

	
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (nombre_usuario,pass_usuario,id_rol)values(:nombre_usuario,:pass_usuario,:id_rol)");
		$consulta->bindValue(':nombre_usuario',$persona->nombre_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':pass_usuario', $persona->pass_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':id_rol', $persona->id_rol, PDO::PARAM_INT);

		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerPersonasTest()
	{
		$arrayDePersonas=array();

		$persona = new stdClass();
		$persona->id = "4";
		$persona->nombre = "rogelio";
		$persona->apellido = "agua";
		$persona->dni = "333333";
		$persona->foto = "333333.jpg";

		//$objetJson = json_encode($persona);
		//echo $objetJson;
		$persona2 = new stdClass();
		$persona2->id = "5";
		$persona2->nombre = "Bañera";
		$persona2->apellido = "giratoria";
		$persona2->dni = "222222";
		$persona2->foto = "222222.jpg";

		$persona3 = new stdClass();
		$persona3->id = "6";
		$persona3->nombre = "Julieta";
		$persona3->apellido = "Roberto";
		$persona3->dni = "888888";
		$persona3->foto = "888888.jpg";

		$arrayDePersonas[]=$persona;
		$arrayDePersonas[]=$persona2;
		$arrayDePersonas[]=$persona3;
		 
		

		return  $arrayDePersonas;
				
	}	


}
