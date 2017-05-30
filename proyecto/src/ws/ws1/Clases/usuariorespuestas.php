<?php
require_once "AccesoDatos.php";

class UsuarioRespuestas
{
    public $id_usuario;
    public $id_pregunta;
    public $opcion;

    public static function agregarRespuesta($respuesta) {
        $sql = 'INSERT INTO usuario_respuestas (id_usuario, id_pregunta, opcion)
        VALUES (:id_usuario, :id_pregunta, :opcion)';

        $cnx = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $cnx->RetornarConsulta($sql);
        $consulta->bindValue(':id_usuario', $respuesta->id_usuario, PDO::PARAM_INT);
        $consulta->bindValue(':id_pregunta', $respuesta->id_pregunta, PDO::PARAM_INT);
        $consulta->bindValue(':opcion', $respuesta->opcion, PDO::PARAM_STR);
        $consulta->execute();

        return $cnx->RetornarUltimoIdInsertado();
    }


}
