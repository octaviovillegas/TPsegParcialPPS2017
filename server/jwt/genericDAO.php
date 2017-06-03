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
			
			//survey creation date taked by the server clock
			$survey["creationDate"] = date("Y-m-d");

			$db = GenericDAO::getPDO();
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$couldBegin = $db->beginTransaction();
			
			$sql = "insert into surveys
					(title,creationdate,enddate,ownerid) 
					values (:title,:creationdate,:enddate,:ownerid)";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":title", $survey["title"], PDO::PARAM_STR);
			$statement->bindValue(":creationdate", $survey["creationDate"], PDO::PARAM_STR);
			$statement->bindValue(":enddate", $survey["endDate"], PDO::PARAM_STR);
			$statement->bindValue(":ownerid", $userid, PDO::PARAM_INT);

			$couldInsertSurvey = $statement->execute();

			$surveyId = $db->lastInsertId();


			$sql2 = "insert into questions
					(text,surveyid)
					values(:text,:surveyid)";

			$statement = $db->sendQuery($sql2);
			$statement->bindValue(":text", $survey["question"]["text"], PDO::PARAM_STR);
			$statement->bindValue(":surveyid", $surveyId, PDO::PARAM_INT);

			$couldInsertQuestion = $statement->execute();

			$questionId = $db->lastInsertId();

			if(count($survey["question"]["options"]) > 0){
				for ($i = 0; $i < count($survey["question"]["options"]); $i++) {
					$option = $survey["question"]["options"][$i];
					$sql3 = "insert into options (text,isright,questionid) values (?,?,?)";
					
					$statement = $db->sendQuery($sql3);
					
					$couldInsertOptions = $statement->execute(array($option['text'],$option['isRight'],$questionId));
				}
			}

			$db->commit();
		}catch(Exception $ex){
			$db->rollBack();
		}
		
	}

	public static function getSurveysList(){
		try
		{	
			
			$db = GenericDAO::getPDO();
			$today = date("Y-m-d");
			$sql = "select s.title, u.username, u.userid, s.creationdate, s.enddate
					from surveys as s
					join users as u on u.userid = s.ownerid
					where s.enddate >= " . $today . " or s.enddate = 0000-00-00 and s.waseliminated = false" ;

			$statement = $db->sendQuery($sql);

			 $statement->execute();

			 $rv = $statement->fetchAll(PDO::PARAM_STR);

			 return $rv;
		}catch(Exception $ex){

		}

	}

	public static function eliminateSurvey($surveyId){
		$db = GenericDAO::getPDO();
		$sql = "update surveys set waseliminated = true
				where surveyid = " . $surveyId;
	}

}
?>