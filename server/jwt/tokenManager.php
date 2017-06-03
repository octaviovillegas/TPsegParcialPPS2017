<?php

use \Firebase\JWT\JWT;
class TokenManager{

    function getToken($userdata){
        $key = "soydyos";
        
        $token = array(
            "iss" => "attendance-list",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "uid" => $userdata['userid'],
            "rol" => $userdata['code']
        );
        
        $jwt = JWT::encode($token, $key);
        JWT::$leeway = 60; // $leeway in seconds
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        $rv = array(
            "jwt" => $jwt,
            "rol" => $decoded->rol
        );
        return json_encode($rv);
    }

    function isValidToken($jwt){
        $rv = array(
            "isValidToken"=>false,
            "code"=>array()
        );
        $key = "soydyos";
        try{
            $decode = JWT::decode($jwt,$key,array('HS256'));
            $rv['isValidToken'] = true;
            $rv['code'] = $decode->rol;
            
        }catch(Exception $ex){

        }

        return $rv;
    }

    function getIdByJWT($jwt){
        $key = "soydyos";
        try{
            $decode = JWT::decode($jwt,$key,array('HS256'));
            $rv = $decode->uid;
        }catch(Exception $ex){

        }
        return $rv;
    }

}
?>