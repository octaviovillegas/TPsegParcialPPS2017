<?php
require_once "AccesoDatos.php";

class Encuesta
{
    const ESTADO_PENDIENTE = 'pendiente';
    const ESTADO_COMPLETADA = 'completada';

    public $id_encuesta;
    public $id_curso;
    public $descripcion;
    public $fecha_inicio;
    public $fecha_fin;

    public static function trearEncuestasByIdUsuario($id_usuario, $estado = null) {

        $cnx = AccesoDatos::dameUnObjetoAcceso();

        if ($estado == self::ESTADO_COMPLETADA) {

            $sql = 'SELECT * FROM `encuestas` e
                        WHERE e.id_curso IN (
                            SELECT id_curso FROM `usuarios_cursos` where id_usuario = :id_usuario
                        ) AND e.id_encuesta IN (
                            SELECT id_encuesta FROM preguntas p
                            LEFT JOIN usuario_respuestas ur ON (p.id_pregunta = ur.id_pregunta) WHERE ur.id_usuario = :id_usuario2 GROUP BY p.id_encuesta
                        )';

            $consulta = $cnx->RetornarConsulta($sql);
            $consulta->bindValue(':id_usuario2', $id_usuario, PDO::PARAM_INT);

        } elseif ($estado == self::ESTADO_PENDIENTE) {

            $sql = 'SELECT * FROM `encuestas` e
                    WHERE e.id_curso IN (
                        SELECT id_curso FROM `usuarios_cursos` where id_usuario = :id_usuario
                    ) AND e.id_encuesta NOT IN (
                        SELECT id_encuesta FROM preguntas p
                        LEFT JOIN usuario_respuestas ur ON (p.id_pregunta = ur.id_pregunta) WHERE ur.id_usuario = :id_usuario2 GROUP BY p.id_encuesta
                    )';

            $consulta = $cnx->RetornarConsulta($sql);
            $consulta->bindValue(':id_usuario2', $id_usuario, PDO::PARAM_INT);

        } else {

            $sql = 'SELECT * FROM `encuestas` e
                    WHERE e.id_curso IN (
                        SELECT id_curso FROM `usuarios_cursos` where id_usuario = :id_usuario
                    )';

            $consulta = $cnx->RetornarConsulta($sql);
        }

        $consulta->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
    }

    public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta("select * from encuestas");
		$consulta->execute();
		$arrCurso= $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
		return $arrCurso;
	}

    public static function TraerIdEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	    $consulta =$objetoAccesoDato->RetornarConsulta("select id_encuesta from encuestas");
		$consulta->execute();
		$arrCurso= $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
		return $arrCurso;
	}

    public static function nuevaEncuesta($encuesta)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("insert into encuestas (descripcion,fecha_inicio,fecha_fin)
        VALUES (:descripcion,:fecha_inicio,:fecha_fin)");
        $consulta->bindValue(':descripcion',$encuesta->descripcion, PDO::PARAM_STR);
        $consulta->bindValue(':fecha_inicio',$encuesta->fechaInicio, PDO::PARAM_STR);
        $consulta->bindValue(':fecha_fin',$encuesta->fechaFin, PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function enviarEncuesta($encuesta)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("update encuestas set `id_curso`=:id_curso WHERE id_encuesta=:id_encuesta");
        $consulta->bindValue(':id_encuesta',$encuesta->idEncuesta, PDO::PARAM_STR);
        $consulta->bindValue(':id_curso',$encuesta->idCurso, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->execute();
    }
    public static function BorrarEncuesta($encuesta)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("delete from encuestas where id_encuesta = :id_encuesta");
        $consulta->bindValue(':id_encuesta',$encuesta->idEncuesta, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->execute();
    }

}
