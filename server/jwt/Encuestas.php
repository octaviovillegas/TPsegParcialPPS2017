<?php
require_once"db.php";
class Encuestas
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $pregunta;
  	public $respuesta1;
  	public $respuesta2;
    public $respuesta3;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function pregunta()
	{
		return $this->pregunta;
	}
	public function respuesta1()
	{
		return $this->respuesta1;
	}
    public function respuesta2()
	{
		return $this->respuesta2;
	}
   public function respuesta3()
	{
		return $this->respuesta1;
	}
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetPregunta($valor)
	{
		$this->pregunta = $valor;
	}
	public function SetRespuesa1($valor)
	{
		$this->respuesta1 = $valor;
	}
    public function SetRespuesa2($valor)
	{
		$this->respuesta2 = $valor;
	}
    public function SetRespuesa3($valor)
	{
		$this->respuesta3 = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Encuestas::TraerUnapregunta($id);
			
			
			$this->nombre = $obj->nombre;
			$this->pregunta = $pregunta;
			$this->respuesta1 = $obj->SetRespuesa1;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->pregunta."-".$this->respuesta1."-".$this->respuesta2."-".$this->respuesta3;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPregunta($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuesta where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('encuesta');
		return $personaBuscada;						
	}
	
	
	
	public static function BorrarEncuesta($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from encuesta	WHERE id=:id");	
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarEncuesta($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into encuesta (nombre,pregunta,respuesta1,respuesta2,respuesta3)values(:nombre,:pregunta,:respuesta1,:respuesta2,:respuesta3)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$encuesta->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta', $encuesta->pregunta, PDO::PARAM_STR);
		$consulta->bindValue(':respuesta1', $encuesta->respuesta1, PDO::PARAM_STR);
        $consulta->bindValue(':respuesta2', $encuesta->respuesta2, PDO::PARAM_STR);
        $consulta->bindValue(':respuesta3', $encuesta->respuesta3, PDO::PARAM_STR);

		
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
