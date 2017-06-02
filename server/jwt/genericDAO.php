<?php 

require_once 'db.php';

class GenericDAO
{

	private static function getPDO() 
	{	
		return $PDOInstance = DB::getInstance(); 
	}

	public static function validateUserByEmailAndPassword($params){
		try{
			$rv = null;
			$db = GenericDAO::getPDO();

			$sql = "select u.userid, r.code 
					FROM users as u 
					join roles as r
					on r.rolid = u.rolid
					where email = :email and password = :password";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":email", $params['email'], PDO::PARAM_STR);
			$statement->bindValue(":password", $params['password'], PDO::PARAM_STR);
			$statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);

			if(count($data) == 1)
			{
				 $rv = array(
					 "userid" => $data[0]["userid"],
					 "code" => $data[0]["code"]
				 );
			}
			return $rv;
		}catch(Exception $ex){
			die("Error: " . $ex->getMessage());
		}
		
	}
	public static function getPermissionsByUserRol($rv){
		try{
			$db = GenericDAO::getPDO();

			$sql = "select p.description from permissionsbyrol as pbr
					join permissions as p on pbr.permissionid = p.permissionid
					join roles as r on pbr.rolid = r.rolid
					where r.code = :code";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":code", $rv['code'], PDO::PARAM_STR);
			$statement->execute();
			$data = $statement->fetchAll(PDO::PARAM_STR);
			$rv['permissions'] = array();
			foreach ($data as $clave => $valor)
			{
				array_push($rv['permissions'],$valor['description']);
			}
			
			return $rv;
		}catch(Exception $ex){
			die("Error: " . $ex->getMessage());
		}
	}


	//Survey
	public static function newSurvey($survey,$userid){

		try{
			//simulation of data from parameters
			
			//survey
			$title = $survey["title"];
			$survey["creationDate"] = date("Y-m-d");
			$endDate = $survey["endDate"];


			//question
			$text= $survey["question"]["text"];

			$db = GenericDAO::getPDO();

			$couldBegin = $db->beginTransaction();
			
			$sql = "insert into surveys
					(title,creationdate,enddate,ownerid) 
					values (:title,:creationdate,:enddate,:ownerid)";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":title", $survey["title"], PDO::PARAM_STR);
			$statement->bindValue(":creationdate", $survey["creationDate"], PDO::PARAM_STR);
			$statement->bindValue(":enddate", $survey["endDate"], PDO::PARAM_STR);
			$statement->bindValue(":ownerid", $userid, PDO::PARAM_INT);

			$statement->execute();

			$survey["question"]["surveyId"] = $db->lastInsertId();


			$sql2 = "insert into questions
					(text,surveyid)
					values(:text,:surveyid)";

			$statement = $db->sendQuery($sql2);
			$statement->bindValue(":text", $survey["question"]["text"], PDO::PARAM_STR);
			$statement->bindValue(":surveyid", $survey["question"]["surveyId"], PDO::PARAM_INT);

			$statement->execute();

			if(count($survey["question"]["options"]) > 0){
        	
				//guardar también las opciones.
			}

			$db->commit();
		}catch(Exception $ex){
			$db->rollBack();
		}
		
	}

}
?>