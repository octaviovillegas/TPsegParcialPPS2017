<?php
require_once "AccesoDatos.php";
require_once "tipos_usuarios.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $usuario;
	public $clave;
	public $id_tipo;
	public $nombre;
	public $tipo_usuario;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function Getid_usuario()
	{
		return $this->id_usuario;
	}
	public function GetNombre_usuario()
	{
		return $this->usuario;
	}
	public function GetPass_usuario()
	{
		return $this->clave;
	}
	public function Getrol()
	{
		return $this->id_tipo;
	}

	public function Getnombre()
	{
		return $this->nombre;
	}

	public function Setnombre($parametro)
	{
		 $this->nombre = $parametro;
	}

	public function Setid_usuario($parametro)
	{
		 $this->id_usuario = $parametro;
	}
	public function SetNombre_usuario($parametro)
	{
		$this->usuario = $parametro;
	}
	public function SetPass_usuario($parametro)
	{
		$this->clave = $parametro;
	}
	public function Setrol($parametro)
	{
		 $this->id_tipo = $parametro;
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
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario u  join rol r on u.id_tipo = r.id_tipo where u.usuario =:usuario");
		$consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Usuario');
		return $personaBuscada;

	}

	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT u.id_usuario, t.descripcion tipo_usuario, u.nombre, u.usuario, u.clave, u.id_tipo FROM usuarios u, tipos_usuarios t where u.id_tipo=t.id_tipo");
		$consulta->execute();
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
		return $arrEmpleado;
	}

public static function TraerTodosLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario usu JOIN rol ro ON usu.id_tipo=ro.id_tipo WHERE usu.id_tipo = 3");
		$consulta->execute();
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
		return $arrEmpleado;
	}

		public static function TraerIdTipo($tipo)
	{
		$dato = json_decode(json_encode($tipo));
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_tipo FROM tipos_usuarios WHERE descripcion = :tipo");
		$consulta->bindValue(':tipo', $dato->tipo, PDO::PARAM_STR);
		$consulta->execute();
		$tipobusc= $consulta->fetchObject('tipos_usuarios');
		return $tipobusc;

	}


public static function TraerClientesEmpleados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario usu JOIN rol ro ON usu.id_tipo=ro.id_tipo WHERE (usu.id_tipo = 3 XOR usu.id_tipo = 2)");
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
	    $sql = 'UPDATE usuarios SET usuario = :usuario, nombre = :nombre, clave = :clave, id_tipo = :id_tipo WHERE id_usuario = :id_usuario';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
	    $consulta->bindValue(':usuario',$usuario->usuario, PDO::PARAM_STR);
	    $consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
	    $consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
	    $consulta->bindValue(':id_tipo', $usuario->id_tipo, PDO::PARAM_INT);
	    return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertar($persona)
	{


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();


		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (usuario,clave,id_tipo)values(:usuario,:clave,:id_tipo)");
		$consulta->bindValue(':usuario',$persona->usuario, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':id_tipo', $persona->id_tipo, PDO::PARAM_INT);

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
