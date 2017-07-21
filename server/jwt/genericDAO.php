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

	public static function getUserProfileData($userId,$rv){
		try{
			$db = GenericDAO::getPDO();

			$sql = "select r.code, u.username, u.email  FROM users as u
					join roles as r on r.rolid = u.rolid
					where u.userid = :userid;";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":userid", $userId, PDO::PARAM_STR);
			$statement->execute();
			$rv['profile'] = array();
			$rv['profile'] = $statement->fetch(PDO::PARAM_STR);

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
					(title,creationdate,enddate,ownerid,surveytypeid) 
					values (:title,:creationdate,:enddate,:ownerid,:surveytypeid)";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":title", $survey["title"], PDO::PARAM_STR);
			$statement->bindValue(":creationdate", $survey["creationDate"], PDO::PARAM_STR);
			$statement->bindValue(":enddate", $survey["endDate"], PDO::PARAM_STR);
			$statement->bindValue(":ownerid", $userid, PDO::PARAM_INT);
			$statement->bindValue(":surveytypeid", $survey["surveyTypeId"], PDO::PARAM_INT);

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


	//User
	public static function newUser($user,$userid){

		try{
			
			$user["creationDate"] = date("Y-m-d");

			$db = GenericDAO::getPDO();
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$couldBegin = $db->beginTransaction();
			
			//find rol id by code
			$findRolId = "select rolid from roles where code = '" .  $user["rol"] . "'"; 
			$statement = $db->sendQuery($findRolId);
			$couldFindRolId = $statement->execute();
			$rolId = $statement->fetchAll(PDO::PARAM_STR);

			$sql2 = "insert into users(username,email,password,rolid,firstname,lastname,filenumber) 
					 values (:username,:email,:password,:rolid,:firstname,:lastname,:filenumber)";

			$statement = $db->sendQuery($sql2);
			$statement->bindValue(":username", $user["username"], PDO::PARAM_STR);
			$statement->bindValue(":firstname", $user["firstname"], PDO::PARAM_STR);
			$statement->bindValue(":lastname", $user["lastname"], PDO::PARAM_STR);
			$statement->bindValue(":email", $user["email"], PDO::PARAM_INT);
			$statement->bindValue(":password", $user["password"], PDO::PARAM_STR);
			$statement->bindValue(":filenumber", $user["filenumber"], PDO::PARAM_STR);
			$statement->bindValue(":rolid", $rolId[0]["rolid"], PDO::PARAM_STR);
			

			$couldSaveUser = $statement->execute();

			$userId = $db->lastInsertId();

			$sql =	"insert into addresses
					(street,number,floor,department,clarification,city,userid)
					values
					(:street,:number,:floor,:department,:clarification,:city,:userid)";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":street", $user["street"], PDO::PARAM_STR);
			$statement->bindValue(":number", $user["number"], PDO::PARAM_INT);
			$statement->bindValue(":floor", $user["floor"], PDO::PARAM_STR);
			$statement->bindValue(":department", $user["department"], PDO::PARAM_STR);
			$statement->bindValue(":clarification", $user["clarification"], PDO::PARAM_STR);
			$statement->bindValue(":city", $user["city"], PDO::PARAM_STR);
			$statement->bindValue(":userid", $userId, PDO::PARAM_INT);

			$couldInsertUser = $statement->execute();

			$db->commit();
			return true;
		}catch(Exception $ex){
			$db->rollBack();
			return false;
		}
		
	}
public static function getUsersListToEliminate($userid){
		try
		{	
			

			$db = GenericDAO::getPDO();
			$today = date("Y-m-d");
			$sql = "select u.username,u.email,u.rolid,u.firstname,u.lastname,u.filenumber,u.userid
					from users as u
					where u.userid<> 1 and u.userid <> 2 and u.userid <>3 and u.userid <> 4";
			$statement = $db->sendQuery($sql);
			 $statement->execute();
			 $rv = $statement->fetchAll(PDO::PARAM_STR);
			 return $rv;
		}catch(Exception $ex){
		}
	}
public static function eliminateUser($userid){
	try
		{		$db = GenericDAO::getPDO();
		$sql = "delete from users
		
			     where userid = " . $userid;
					$statement = $db->sendQuery($sql);

			$couldDeleteuser= $statement->execute();
			return $couldDeleteuser;
		}catch(Exeption $ex){}
}

	public static function getSurveysList(){
		try
		{	
			
			$db = GenericDAO::getPDO();
			$today = date("Y-m-d");
			$sql = "select s.surveyid , s.title, u.username, u.userid, s.creationdate, s.enddate, q.text, s.surveytypeid, q.questionid
					from surveys as s
					join users as u on u.userid = s.ownerid
					join questions as q on q.surveyid = s.surveyid
					where s.enddate >= " . $today . " or s.enddate = 0000-00-00 and s.waseliminated = false
					order by s.creationdate desc";
			$statement = $db->sendQuery($sql);
			$statement->execute();
			$rv = $statement->fetchAll(PDO::PARAM_STR);
			return $rv;
		}catch(Exception $ex){
		}
	}

	public static function getSurveysListToEliminate($usuarioid){
		try
		{	
			
			$db = GenericDAO::getPDO();
			$today = date("Y-m-d");
			$sql = "select s.surveyid , s.title, u.username, u.userid, s.creationdate, s.enddate,s.waseliminated
					from surveys as s
					join users as u on u.userid = s.ownerid
					where  s.waseliminated=False and (s.enddate >= " . $today . " or s.enddate = 0000-00-00)and s.ownerid=".$usuarioid . " order by s.creationdate desc";

			$statement = $db->sendQuery($sql);

			 $statement->execute();

			 $rv = $statement->fetchAll(PDO::PARAM_STR);

			 return $rv;
		}catch(Exception $ex){

		}

	}

public static function modifySurvey($survey)
{ 
	try{

		$survey["creationDate"] = date("Y-m-d");
		$db = GenericDAO::getPDO();
		$couldBegin = $db->beginTransaction(); //Start transaction


		$sql = "update surveys set title = :title, enddate = :enddate, surveytypeid = :surveytypeid
				where surveyid = :surveyid";

		$statement = $db->sendQuery($sql);
		$statement->bindValue(":surveyid", $survey["surveyId"], PDO::PARAM_STR);
		$statement->bindValue(":enddate", $survey["endDate"], PDO::PARAM_STR);
		$statement->bindValue(":title", $survey["title"], PDO::PARAM_STR);
		$statement->bindValue(":surveytypeid", $survey["surveyTypeId"], PDO::PARAM_INT);
		$statement->execute();

		$question = $survey["question"];

		$sql2 = "update questions set text = :text
				 where questionid = :questionid";
		$statement = $db->sendQuery($sql2);
		$statement->bindValue(":questionid", $question["questionId"], PDO::PARAM_STR);
		$statement->bindValue(":text", $question["text"], PDO::PARAM_STR);
		$statement->execute();


		if(count($question["options"]) > 0){
			for ($i = 0; $i < count($question["options"]); $i++) {
				$option = $question["options"][$i];
				if($option["optionId"] == 0){
					$sql4 = "insert into options (text,isright,questionid)
							values (:text,:isright,:questionid)";
					$statement = $db->sendQuery($sql4);
					$statement->bindValue(":questionid", $question["questionId"], PDO::PARAM_STR);
					$statement->bindValue(":text", $option["text"], PDO::PARAM_STR);
					$statement->bindValue(":isright", $option["isRight"], PDO::PARAM_INT);
					$statement->execute();
				}else{
					$sql3 = "update options set text = :text, isright = :isright
						 where optionid = :optionid";
				
					$statement = $db->sendQuery($sql3);
					$statement->bindValue(":optionid", $option["optionId"], PDO::PARAM_STR);
					$statement->bindValue(":text", $option["text"], PDO::PARAM_STR);
					$statement->bindValue(":isright", $option["isRight"], PDO::PARAM_INT);
					$statement->execute();
				}
				
			}
		}

 		$db->commit();
	}catch(Exception $ex){
		$db->rollBack();
	}
} 

	public static function eliminateSurvey($surveyid){
	try
		{		
			$db = GenericDAO::getPDO();
			$sql = "update surveys set waseliminated = true
			     	where surveyid = " . $surveyid;
			
			$statement = $db->sendQuery($sql);
			
			$couldDeleteuser= $statement->execute();
			return $couldDeleteuser;
		}catch(Exeption $ex){}
	}

	public static function deleteAllOptions($questionid){
		try{
			$db = GenericDAO::getPDO();
			$sql = "delete from options
			    	where questionid = " . $questionid;
			$statement = $db->sendQuery($sql);
			
			$couldDeleteuser= $statement->execute();
			return $couldDeleteuser;
		}catch(Exeption $ex){}
	}

	public static function getSurveyById($surveyId){
		try{
			$db = GenericDAO::getPDO();

			$sql = "select s.surveyid, s.title, q.questionid, q.text,s.enddate,s.surveytypeid
					from surveys as s
					join questions as q on q.surveyid = s.surveyid
					where s.surveyid = :surveyid";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":surveyid", $surveyId, PDO::PARAM_STR);
			$statement->execute();
			$rv = array();
			$rv['survey'] = $statement->fetch(PDO::PARAM_STR);
			$questionId = $rv["survey"]["questionid"];

			$sql2 = "select * from options where questionid = :questionid";
			$statement = $db->sendQuery($sql2);
			$statement->bindValue(":questionid", $questionId, PDO::PARAM_INT);
			$statement->execute();
			$rv['options'] = $statement->fetchAll(PDO::PARAM_STR);

			return $rv;
		}catch(Exception $ex){
			die("Error: " . $ex->getMessage());
		}
	}	

		//User
	public static function saveAnswer($answer,$userid){

		try{
			
			$db = GenericDAO::getPDO();
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$couldBegin = $db->beginTransaction();
			
			$sql =	"insert into answers
					(text,userid,questionid,surveyid,choosenothing)
					values
					(:text,:userid,:questionid,:surveyid,:choosenothing)";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":text", $answer["text"], PDO::PARAM_STR);
			$statement->bindValue(":userid", $userid, PDO::PARAM_INT);
			$statement->bindValue(":questionid", $answer["questionId"], PDO::PARAM_INT);
			$statement->bindValue(":surveyid", $answer["surveyId"], PDO::PARAM_INT);
			$statement->bindValue(":choosenothing", $answer["chooseNothing"], PDO::PARAM_INT);

			$couldInsertAnswer = $statement->execute();

			$answerId = $db->lastInsertId();

			//save options by answer
			if(count($answer["optionIds"]) > 0){
				for ($i = 0; $i < count($answer["optionIds"]); $i++) {
					$optionId = $answer["optionIds"][$i];
					$sql2 = "insert into optionsbyanswer (optionid,answerid) values (?,?)";
					
					$statement = $db->sendQuery($sql2);
					
					$couldInsertOptions = $statement->execute(array($optionId,$answerId));
				}
			}

			$db->commit();
			return true;
		}catch(Exception $ex){
			$db->rollBack();
			return false;
		}
		
	}

	public static function getDivisions(){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql =	"select * from divisions";
		$statement = $db->sendQuery($sql);
		$statement->execute();
		$rv = array("divisions"=>[]);
		$rv['divisions'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getSubjectsListByDivisionId($divisionid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select c.subjectid, s.name
				FROM classes  as c
				join subjects as s on s.subjectid = c.subjectid
				WHERE divisionid = :divisionid";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":divisionid", $divisionid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("subjects"=>[]);
		$rv['subjects'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}
	public static function getAssistsAndAbsenses($classid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "???";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":classid", $classid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("subjects"=>[], "absences"=>[]);
		return $rv;
	}
	

	public static function getStudentsListByDivisionAndSubject($divisionid, $subjectid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$sql = "select classid
				from classes
				where divisionid = :divisionid and subjectid = :subjectid";

		$statement = $db->sendQuery($sql);
		$statement->bindValue(":divisionid", $divisionid, PDO::PARAM_INT);
		$statement->bindValue(":subjectid", $subjectid, PDO::PARAM_INT);
		$statement->execute();
		
		$result = $statement->fetch(PDO::PARAM_STR);

		$sql2 = "select userid, firstname, lastname from users
				 where userid in (select studentid from
				 studentsbyclass
				 where classid = :classid)";

		$statement = $db->sendQuery($sql2);
		$statement->bindValue(":classid", $result["classid"], PDO::PARAM_INT);
		$statement->execute();

		$rv = array("students"=>[],"classid"=>$result["classid"]);
		$rv["students"] = $statement->fetchAll(PDO::PARAM_STR);


		return $rv;
	}

	public static function saveAttendaceList($attendanceList,$userId){
		try{
			
			$creationDate = date("Y-m-d");

			$db = GenericDAO::getPDO();
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$couldBegin = $db->beginTransaction();
			
			$sql =	"insert into attendancelists
					(classid,creationdate,ownerid)
					values
					(:classid,:creationdate,:ownerid)";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":classid", $attendanceList["classid"], PDO::PARAM_INT);
			$statement->bindValue(":creationdate", $creationDate, PDO::PARAM_STR);
			$statement->bindValue(":ownerid", $userId, PDO::PARAM_INT);

			$couldInsertAttendanceList = $statement->execute();

			$attendanceListsId = $db->lastInsertId();

			//save attendanceListItems
			for ($i = 0; $i < count($attendanceList["attendancelistitems"]); $i++) {
					$item = $attendanceList["attendancelistitems"][$i];
					$sql2 = "insert into attendancelistitems (studentid,present,attendancelistid) values (?,?,?)";
					
					$statement = $db->sendQuery($sql2);
					
					$couldInsertItem = $statement->execute(array($item["studentid"],$item["present"],$attendanceListsId));
			}

			$db->commit();
			return true;
		}catch(Exception $ex){
			$db->rollBack();
			return false;
		}
	}
	public static function getSubjectsList(){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select distinct c.subjectid, s.name
				FROM classes  as c
				join subjects as s on s.subjectid = c.subjectid";
		$statement = $db->sendQuery($sql);
		$statement->execute();
		$rv = array("subjects"=>[]);
		$rv['subjects'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getDivisionsListBySubjectId($subjectid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select c.divisionid, d.name
				FROM classes  as c
				join divisions as d on d.divisionid = c.divisionid
				WHERE c.subjectid = :subjectid";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":subjectid", $subjectid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("divisions"=>[]);
		$rv['divisions'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getClassroomsList(){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select distinct cr.classroomid, cr.name 
				from classes as c join classrooms as cr on cr.classroomid = c.classroomid";
		$statement = $db->sendQuery($sql);
		$statement->execute();
		$rv = array("classrooms"=>[]);
		$rv['classrooms'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getClassesByClassroomid($classroomid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select c.classid, d.name as divisionname, s.name as subjectname 
				from classes as c
				join divisions as d on d.divisionid = c.divisionid
				join subjects as s on s.subjectid = c.subjectid
				WHERE c.classroomid = :classroomid";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":classroomid", $classroomid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("classes"=>[]);
		$rv['classes'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getStudentsByClassId($classid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select studentid as userid, u.firstname, u.lastname
				from studentsbyclass as sbc
				join users as u on u.userid = sbc.studentid
				where sbc.classid = :classid;";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":classid", $classid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("students"=>[]);
		$rv['students'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function getClassesByTeacherid($teacherid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select distinct c.classid, d.name as divisionname, s.name as subjectname 
				from classes as c
				join divisions as d on d.divisionid = c.divisionid
				join subjects as s on s.subjectid = c.subjectid
				WHERE c.teacherid = :teacherid";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":teacherid", $teacherid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("classes"=>[]);
		$rv['classes'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}
	public static function getTeachersList(){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select distinct u.userid as teacherid, u.lastname , u.firstname 
				from classes as c join users as u on u.userid = c.teacherid";
		$statement = $db->sendQuery($sql);
		$statement->execute();
		$rv = array("teachers"=>[]);
		$rv['teachers'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}

	public static function deleteOption($optionid){
	try
		{		
			$db = GenericDAO::getPDO();
			$sql = "delete from options
			 		where optionid = :optionid";
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":optionid", $optionid, PDO::PARAM_INT);
			$couldDeleteuser = $statement->execute();
			return $couldDeleteuser;
		}catch(Exeption $ex){}
	}

	public static function getSubjectsListByStudentId($studentid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select distinct s.name, c.classid
				from studentsbyclass as sbc
				join classes as c on c.classid = sbc.classid
				join subjects as s on s.subjectid = c.subjectid
				where studentid = :studentid";
		$statement = $db->sendQuery($sql);
		$statement->bindValue(":studentid", $studentid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("subjects"=>[]);
		$rv['subjects'] = $statement->fetchAll(PDO::PARAM_STR);
		return $rv;
	}
public static function getAssist($userid,$classid){

$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select a.present  
				from attendancelistitems as a 
				join attendancelists as at on at.classid=".$classid."
				
				
				where studentid=".$userid." and a.attendancelistid=at.attendancelistid";
		$statement = $db->sendQuery($sql);
			 $statement->execute();
			 $rv = $statement->fetchAll(PDO::PARAM_STR);
			 return $rv;
		
		
		
		
}
public static function deleteUser($userid){
	try
		{		
			$db = GenericDAO::getPDO();
			$sql = "delete from users
			 		where userid =".$userid;
			$statement = $db->sendQuery($sql);
			$statement->bindValue(":userid", $optionid, PDO::PARAM_INT);
			$couldDeleteuser = $statement->execute();
			return $couldDeleteuser;
		}catch(Exeption $ex){}
	}

public static function modifyUser($user){

		try{
			
			//$user["creationDate"] = date("Y-m-d");

			$db = GenericDAO::getPDO();
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$couldBegin = $db->beginTransaction();

			//find rol id by code
			
		
		$findRolId = "select rolid from roles where code =:rol"; 

			$statement = $db->sendQuery($findRolId);
			$statement->bindValue(":rol", $user["rol"], PDO::PARAM_STR);
			$couldFindRolId = $statement->execute();
			$rolId = $statement->fetchAll(PDO::PARAM_STR);
			$sql = "update users set username = :username, rolid= :rolid ,email = :email, password = :password, firstname = :firstname,lastname = :lastname, filenumber = :filenumber
					where userid = :userid";

			$statement = $db->sendQuery($sql);
			$statement->bindValue(":username", $user["username"], PDO::PARAM_STR);
			$statement->bindValue(":firstname", $user["firstname"], PDO::PARAM_STR);
			$statement->bindValue(":lastname", $user["lastname"], PDO::PARAM_STR);
			$statement->bindValue(":email", $user["email"], PDO::PARAM_STR);
			$statement->bindValue(":password", $user["password"], PDO::PARAM_STR);
			$statement->bindValue(":filenumber", $user["filenumber"], PDO::PARAM_INT);
			$statement->bindValue(":rolid", $rolId[0]["rolid"], PDO::PARAM_STR);
			$statement->bindValue(":userid", $user["userid"], PDO::PARAM_INT); // <----- asegurate que venga con el userid

			$couldSaveUser = $statement->execute();

           
			// $statement = $db->sendQuery($findaddressId);
			// $couldFindAddressid = $statement->execute();
			// $addressId = $statement->fetchAll(PDO::PARAM_INT);
			$sql2 =	"update addresses set street = :street, number = :number, floor = :floor, department = :department, clarification = :clarification, city = :city
					 where userid = :userid";

			$statement = $db->sendQuery($sql2);
			$statement->bindValue(":street", $user["street"], PDO::PARAM_STR);
			$statement->bindValue(":number", $user["number"], PDO::PARAM_STR);
			$statement->bindValue(":floor", $user["floor"], PDO::PARAM_STR);
			$statement->bindValue(":department", $user["department"], PDO::PARAM_STR);
			$statement->bindValue(":clarification", $user["clarification"], PDO::PARAM_STR);
	     	$statement->bindValue(":city", $user["city"], PDO::PARAM_STR);
			$statement->bindValue(":userid", $user["userid"], PDO::PARAM_INT);
           // $statement->bindValue(":addressid", $addressId[0]["addressid"], PDO::PARAM_INT);
			$couldInsertUser = $statement->execute();

			$db->commit();
			return true;
		}catch(Exception $ex){
			$db->rollBack();
			return false;
		}
		
	} 
// public static function getAddressId($userid){

// $db = GenericDAO::getPDO();
// 		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// 		$sql = "select addressid from addresses where userid = :userid"
// 		$statement = $db->sendQuery($sql);
		
// 			 $statement->execute();
	
// 		$rv = $statement->fetchAll(PDO::PARAM_STR);
			

// 			 return $rv;
		

// }

public static function getUserById($userid){

$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "select u.userid,u.username,u.email,u.password,u.rolid,u.firstname,u.lastname,u.filenumber,ad.street,ad.number,ad.floor,ad.department,ad.clarification,ad.city  
				from users as u 
			join addresses as ad on ad.userid=".$userid."
				where u.userid=".$userid;
		$statement = $db->sendQuery($sql);
			 $statement->execute();
	$rv = array("user"=>[]);
		$rv['user'] = $statement->fetchAll(PDO::PARAM_STR);
			

			 return $rv;
		






}
public static function getSurveysListById($userid){
		try
		{	
			
			$db = GenericDAO::getPDO();
			$today = date("Y-m-d");
			$sql ="select s.surveyid, s.title, u.username, u.userid, s.creationdate, s.enddate 
				   from surveys as s 
				   join users as u on u.userid = s.ownerid 
				   where surveyid not in(select s.surveyid 
				   FROM answers as a
				   join surveys as s on s.surveyid = a.surveyid 
				   where a.userid = " . $userid  . ")
				   and (s.enddate >= " . $today  . " or s.enddate = 0000-00-00) and (s.waseliminated = false)
				   order by s.creationdate desc;";
                           
			$statement = $db->sendQuery($sql);
			$statement->execute();
			$rv = $statement->fetchAll(PDO::PARAM_STR);
			return $rv;
		}catch(Exception $ex){
		}
	}

	//Consultas para generar estadísticas con datos de las encuestas
	public static function getStatisticsForSurveyTypeFreeAnswer($surveyid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//cantidad de votantes
		$sql = "select count(*) as total
				from answers where surveyid = :surveyid";

		$statement = $db->sendQuery($sql);
		$statement->bindValue(":surveyid", $surveyid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("total"=>0, "users"=>[]); 
		$result = $statement->fetch(PDO::PARAM_STR);


		//los votantes
		$sql2 = "select a.answerid, a.text, a.userid, a.questionid, a.surveyid, u.firstname, u.lastname 
				 from answers as a
				 join users as u on u.userid = a.userid
				 where a.surveyid = :surveyid;";

		$statement = $db->sendQuery($sql2);
		$statement->bindValue(":surveyid", $surveyid, PDO::PARAM_INT);
		$statement->execute();
		$rv["users"] = $statement->fetchAll(PDO::PARAM_STR);
		$rv["total"] = $result["total"];
		return $rv;
	}

	public static function getStatisticsForSurveyTypeRadiobuttons1Correct2Graphics($surveyid, $questionid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//cantidad de votantes
		$sql = "select count(*) as total
				from answers where surveyid = :surveyid";

		$statement = $db->sendQuery($sql);
		$statement->bindValue(":surveyid", $surveyid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("total"=>0, "users"=>[], "options"=>[]); 
		$result = $statement->fetch(PDO::PARAM_STR); //traigo cantidad de votantes
		$rv["total"] = $result["total"];

		//los votantes
		$sql2 = "select a.answerid, a.text, a.userid, a.questionid, a.surveyid, u.firstname, u.lastname 
				 from answers as a
				 join users as u on u.userid = a.userid
				 where a.surveyid = :surveyid;";

		$statement = $db->sendQuery($sql2);
		$statement->bindValue(":surveyid", $surveyid, PDO::PARAM_INT);
		$statement->execute();
		$rv["users"] = $statement->fetchAll(PDO::PARAM_STR);

		//opciones
		$sql3 = "select o.optionid, o.text, o.isright from
				 options as o
				 join questions as q on q.questionid = o.questionid
				 where o.questionid = :questionid";

		$statement = $db->sendQuery($sql3);
		$statement->bindValue(":questionid", $questionid, PDO::PARAM_INT);
		$statement->execute();
		$rv["options"] = $statement->fetchAll(PDO::PARAM_STR); //traigo las opciones
		
		$sql4 =	"select o.optionid, count(o.optionid) as total, op.text
				 from answers as a
				 join optionsbyanswer as o on o.answerid = a.answerid
				 join options as op on op.optionid = o.optionid
				 where a.questionid = :questionid
				 group by o.optionid";
		
		$statement = $db->sendQuery($sql4);
		$statement->bindValue(":questionid", $questionid, PDO::PARAM_INT);
		$statement->execute();
		$rv["perOption"] = $statement->fetchAll(PDO::PARAM_STR); //votos por opciones
		return $rv;
	}

	public static function getOptionsByAnswerId($userid,$questionid){
		$db = GenericDAO::getPDO();
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = "select o.text
				from optionsbyanswer as oba
				join options as o on o.optionid = oba.optionid
				join answers as a on a.answerid = oba.answerid
				where a.questionid = :questionid and a.userid = :userid";

		$statement = $db->sendQuery($sql);
		$statement->bindValue(":userid", $userid, PDO::PARAM_INT);
		$statement->bindValue(":questionid", $questionid, PDO::PARAM_INT);
		$statement->execute();
		$rv = array("options"=>[]); 
		$rv["options"] = $statement->fetchAll(PDO::PARAM_STR); //traigo cantidad de opciones como respuesta

		return $rv;
	}
	

}

?>