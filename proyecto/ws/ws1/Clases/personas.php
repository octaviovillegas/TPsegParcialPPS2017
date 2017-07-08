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
	public $imagen;
	public $estilo;
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

	public function Getestilo()
	{
		return $this->estilo;
	}

	public function Setestilo($parametro)
	{
		 $this->estilo = $parametro;
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

	public static function TraerUnUsuarioPorUsuarioYClave($usuario, $clave)
	{
		$sql = 'SELECT u.*, t.descripcion tipo_usuario FROM usuarios u
			INNER JOIN tipos_usuarios t ON (u.id_tipo = t.id_tipo)
			WHERE usuario = :usuario AND clave = :clave';

		$cnx = AccesoDatos::dameUnObjetoAcceso();

		$consulta = $cnx->RetornarConsulta($sql);
		$consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
		$consulta->execute();

		return $consulta->fetchObject('Usuario');
	}

	public static function TraerUnUsuarioPorUsuario($usuario)
	{
		$sql = 'SELECT u.*, t.descripcion tipo_usuario FROM usuarios u
			INNER JOIN tipos_usuarios t ON (u.id_tipo = t.id_tipo)
			WHERE usuario = :usuario';

		$cnx = AccesoDatos::dameUnObjetoAcceso();

		$consulta = $cnx->RetornarConsulta($sql);
		$consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
		$consulta->execute();

		return $consulta->fetchObject('Usuario');
	}

	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT u.id_usuario, t.descripcion tipo_usuario, u.nombre, u.usuario, u.clave, u.id_tipo, u.imagen FROM usuarios u, tipos_usuarios t where u.id_tipo=t.id_tipo");
		$consulta->execute();
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
		return $arrEmpleado;
	}

	public static function TraerElEstilo($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("select estilo from usuarios WHERE id_usuario = :id_usuario");
		$consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
		$consulta->execute();
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
		return $arrEmpleado;
	}

	public static function traerConfMiEstilo($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("select e.* from usuarios u , estilos e WHERE e.estilo = u.estilo and u.id_usuario = :id_usuario");
		$consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
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
		public static function TraerIdTipo2($tipo)
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_tipo FROM tipos_usuarios WHERE descripcion = :tipo");
		$consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);
		$consulta->execute();
		$tipobusc= $consulta->fetchObject('tipos_usuarios');
		return $tipobusc;

	}

			public static function TraerUltimoID()
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT nombre FROM  estilos order by estilo desc LIMIT 0 , 1");

		$consulta->execute();
		 $tipobusc= $consulta->fetchObject('Usuario');

		return $tipobusc;

	}

	public static function TodosMisEstilos($usuario)
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM  estilos where id_usuario = :id_usuario");
		$consulta->bindValue(':id_usuario', $usuario->id_usuario, PDO::PARAM_INT);
		$consulta->execute();
		 $res= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
 
		return $res;


	}



	public static function GuardarMiEstilo($usuario)
	{
	     $sql = 'INSERT INTO estilos (nombre, rutaFondo, rutaIcono, codigocolor1, estilopropio,id_usuario) VALUES(:nombre, :rutaFondo, :rutaIcono, :codigocolor1, 1, :id_usuario)';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
	    $consulta->bindValue(':rutaFondo',$usuario->rutaFondo, PDO::PARAM_STR);
	    $consulta->bindValue(':rutaIcono', $usuario->rutaIcono, PDO::PARAM_STR);
	    $consulta->bindValue(':codigocolor1', $usuario->codigocolor1, PDO::PARAM_STR);
	     $consulta->bindValue(':id_usuario', $usuario->id_usuario, PDO::PARAM_INT);
	    

	    return $consulta->execute();
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



	public static function EliminarUsuario($id_usuario)
	{
	    $sql = 'DELETE FROM usuarios WHERE id_usuario = :id_usuario';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_usuario',$id_usuario, PDO::PARAM_INT);
	    return $consulta->execute();
	}

	public static function ModificarUsuario($usuario)
	{
	    $sql = 'UPDATE usuarios SET usuario = :usuario, nombre = :nombre, clave = :clave, id_tipo = :id_tipo, imagen = :imagen WHERE id_usuario = :id_usuario';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
	    $consulta->bindValue(':usuario',$usuario->usuario, PDO::PARAM_STR);
	    $consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
	    $consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
	    $consulta->bindValue(':id_tipo', $usuario->id_tipo, PDO::PARAM_INT);

		if (isset($usuario->imagen)) {
			$consulta->bindValue(':imagen', $usuario->imagen, PDO::PARAM_STR);
		} else {
			$consulta->bindValue(':imagen', '', PDO::PARAM_STR);

		}

	    return $consulta->execute();
	}


	public static function ModificarEstilo($usuario)
	{
	    $sql = 'UPDATE usuarios SET estilo = (select estilo from estilos where nombre = :nombre) WHERE id_usuario = :id_usuario';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta->bindValue(':nombre', $usuario->estilo, PDO::PARAM_STR);
	    $consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
		 
	    return $consulta->execute();
	}



	public static function AltaUsuario($usuario)
	{
	    $sql = 'INSERT INTO usuarios (id_tipo, nombre, usuario, clave, imagen, estilo) VALUES(:id_tipo, :nombre, :usuario,  :clave, :imagen, 1)';

	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta($sql);
	    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	   //$consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
	    $consulta->bindValue(':usuario',$usuario->usuario, PDO::PARAM_STR);
	    $consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
	    $consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
	    $consulta->bindValue(':id_tipo', $usuario->id_tipo, PDO::PARAM_INT);

		if (isset($usuario->imagen)) {
			$consulta->bindValue(':imagen', $usuario->imagen, PDO::PARAM_STR);
		} else {
			$consulta->bindValue(':imagen', '', PDO::PARAM_STR);

		}
		
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

	public static function traerPreguntas($id_usuario, $id_encuesta) {

		$sql = 'SELECT p.*, ur.opcion respuesta_opcion FROM preguntas p
		INNER JOIN usuario_respuestas ur ON (ur.id_pregunta = p.id_pregunta)
		WHERE ur.id_usuario = :id_usuario AND p.id_encuesta = :id_encuesta';

		$cnx = AccesoDatos::dameUnObjetoAcceso();
		$consulta = $cnx->RetornarConsulta($sql);
		$consulta->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':id_encuesta', $id_encuesta, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Pregunta");
	}


}
