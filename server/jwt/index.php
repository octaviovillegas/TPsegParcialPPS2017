<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require_once 'tokenManager.php';
require_once 'genericDAO.php';

$app = new \Slim\App;
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->post('/token',function(Request $request, Response $response){

    $params = $request->getParams();
    $userData = GenericDAO::validateUserByEmailAndPassword($params);
    if($userData != null){
        $tm = new TokenManager();
        $rv = $tm->getToken($userData);
        $response->getBody()->write($rv);
    }else{
        $response = $response->withStatus(204);
    }
    return $response;
});

$app->post('/permissions',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params['headers']['jwt']['0'];
    $tm = new TokenManager();
    $rv = $tm->isValidToken($jwt);
    $userid = $tm->getIdByJWT($jwt);
    if($rv['isValidToken'] == true){
        $rv = GenericDAO::getPermissionsByUserRol($rv);
        $rv = GenericDAO::getUserProfileData($userid,$rv);
        $response = $response->withStatus(200);
    }else{
        $response = $response->withStatus(204);
    }
    $datos = json_encode($rv);
    $response->getBody()->write($datos);
    return $response;
});

$app->post('/newsurvey',function(Request $request, Response $response){
    $params = $request->getParams();
    $survey = $params["survey"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $userid = $tm->getIdByJWT($jwt);
    GenericDAO::newSurvey($survey,$userid);
    return $response;
});

$app->post('/newuser',function(Request $request, Response $response){
    $params = $request->getParams();
    $survey = $params["user"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $userid = $tm->getIdByJWT($jwt);
    if(GenericDAO::newUser($survey,$userid)){
        $response = $response->withStatus(200);
    }else{
        $response = $response->withStatus(204);
    }
    return $response;
});
$app->post('/modifysurvey',function(Request $request, Response $response){
    
    $params = $request->getParams();
    $survey = $params["survey"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::modifySurvey($survey);
    $response->getBody()->write(json_encode($rv));
    return $response;
});
$app->post('/getsurveyslist',function(Request $request, Response $response){
    $rv = GenericDAO::getSurveysList();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getuserslisttoeliminate',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    
    $tm = new TokenManager();
    // $tm->isValidToken($jwt);
     
    $userid = $tm->getIdByJWT($jwt);
    $rv = GenericDAO::getUsersListToEliminate($userid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getsurveyslisttoeliminate',function(Request $request, Response $response){
    
    $params = $request->getParams();
    $jwt = $params["jwt"];
    
    $tm = new TokenManager();
    // $tm->isValidToken($jwt);
     
    $userid = $tm->getIdByJWT($jwt);

    $rv = GenericDAO::getSurveysListToEliminate($userid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});


$app->post('/eliminatesurvey',function(Request $request, Response $response){
    
    $params = $request->getParams();
   
    $surveyid = $params["surveyid"];
    
 
    
    $rv = GenericDAO::eliminateSurvey($surveyid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getsurveybyid',function(Request $request, Response $response){
    $params = $request->getParams();
    $surveyId= $params["surveyid"];
    $rv = GenericDAO::getSurveyById($surveyId);
    $response->getBody()->write(json_encode($rv));
    return $response;
});
$app->post('/getuserid',function(Request $request, Response $response){
     $params = $request->getParams();
    $jwt = $params["jwt"];
    
    $tm = new TokenManager();
  
     
    $userid = $tm->getIdByJWT($jwt);


    $response->getBody()->write(json_encode($userid));
    return $response;
});

$app->post('/saveanswer',function(Request $request, Response $response){
    $params = $request->getParams();
    $answer = $params["answer"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $userid = $tm->getIdByJWT($jwt);
    if(GenericDAO::saveAnswer($answer,$userid)){
        $response = $response->withStatus(200);
    }else{
        $response = $response->withStatus(204);
    }
    return $response;
});

$app->post('/subjectslistbystudentid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $studentid = $tm->getIdByJWT($jwt);
    $rv = GenericDAO::getSubjectsListByStudentId($studentid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/deleteoption',function(Request $request, Response $response){
    $params = $request->getParams();
    $optionid = $params["optionId"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    if(GenericDAO::deleteOption($optionid)){
        $response = $response->withStatus(200);
    }else{
        $response = $response->withStatus(204);
    }
    return $response;
});

$app->post('/divisionslist',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getDivisions();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/subjectslistbydivisionid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $divisionid = $params["divisionid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getSubjectsListByDivisionId($divisionid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/studentslistbydivisionandsubject',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $divisionid = $params["divisionid"];
    $subjectid = $params["subjectid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getStudentsListByDivisionAndSubject($divisionid,$subjectid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/saveattendancelist',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $attendanceList = $params["attendancelist"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $userId = $tm->getIdByJWT($jwt);
    $rv = GenericDAO::saveAttendaceList($attendanceList,$userId);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getsubjectslist',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getSubjectsList();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/divisionslistbysubjectid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $subjectid = $params["subjectid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getDivisionsListBySubjectId($subjectid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getassistsandabsenses',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $classid = $params["classid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getAssistsAndAbsenses($classid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getclassroomslist',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getClassroomsList();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getclassesbyclassroomid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $classroomid = $params["classroomid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getClassesByClassroomid($classroomid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});


$app->post('/getstudentslistbyclassid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $classid = $params["classid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getStudentsByClassId($classid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});


$app->post('/getclassesbyteacherid',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $teacherid = $params["teacherid"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getClassesByTeacherid($teacherid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getteacherslist',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $rv = GenericDAO::getTeachersList();
    $response->getBody()->write(json_encode($rv));
    return $response;
});
$app->post('/getAssist',function(Request $request, Response $response){
    
   $params = $request->getParams();
    $jwt = $params["jwt"];
    $classid=$params["classid"];
    $tm = new TokenManager();
    // $tm->isValidToken($jwt);
     
    $userid = $tm->getIdByJWT($jwt);
 
    
    $rv = GenericDAO::getAssist($userid,$classid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/deleteUser',function(Request $request, Response $response){
    
    $params = $request->getParams();
   
    $userid = $params["userid"];
    
 
    
    $rv = GenericDAO::deleteUser($userid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});
$app->post('/getuserbyid',function(Request $request, Response $response){
    $params = $request->getParams();
    $userid= $params["userid"];
    $rv = GenericDAO::getUserById($userid);
    $response->getBody()->write(json_encode($rv));
    return $response;
});
$app->post('/modifyUser',function(Request $request, Response $response){
    $params = $request->getParams();
    $user= $params["user"];
    $rv = GenericDAO::modifyUser($user);
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->run();
?>