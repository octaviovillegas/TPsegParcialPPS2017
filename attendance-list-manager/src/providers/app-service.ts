import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Http, RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { LoginData } from "../app/entities/loginData";
import { Survey } from "../app/entities/survey";
import { NewUserData } from "../app/entities/newUserData";

@Injectable()
export class AppService {

  constructor(private http: Http, private storage: Storage) {

  }

  getToken(loginData: LoginData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonLoginData = JSON.stringify(loginData);
    return this.http.post("http://www.ionicparaaprobar.esy.es/token", jsonLoginData, options).toPromise();
  }

  //use when you need logout to clear the user data.
  clearStorageData() {
    this.storage.clear()
      .then(() => console.log("Storage data has been deleted"))
      .catch(() => console.log("No data to delete"));
  }

  getPermissionsByUserRol(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/permissions", jsonData, options).toPromise();
  }

  logOut() {
    this.clearStorageData();
  }

  getSurveys() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getsurveyslist", options).toPromise();
  }

  getUserListToEliminate(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getuserslisttoeliminate", jsonData, options).toPromise();
  }

  getSurveysToEliminate(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getsurveyslisttoeliminate", jsonData, options).toPromise();
  }

  newSurvey(survey: Survey, jwt) {
    let data = { survey, jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/newsurvey", jsonData, options).toPromise();
  }

  newUser(user: NewUserData, jwt) {
    let data = { user, jwt };
    let jsonData = JSON.stringify(data);
    console.log(jsonData);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/newuser", jsonData, options).toPromise();
  }
  getuserid(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getuserid", jsonData, options).toPromise();

  }
  eliminatesurvey(jwt, surveyid) {
    let data = { jwt, surveyid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/eliminatesurvey", jsonData, options).toPromise();
  }

  modifySurvey(survey, jwt) {
    let data = { survey, jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/modifysurvey", jsonData, options).toPromise();
  }

  getSurveyById(surveyid) {
    let data = { surveyid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getsurveybyid", jsonData, options).toPromise();
  }

  saveAnswer(answer, jwt) {
    let data = { answer, jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/saveanswer", jsonData, options).toPromise();
  }

  deleteAllOptions(questionid, jwt) {
    let data = { questionid, jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/deletealloptions", jsonData, options).toPromise();
  }



  getAllDivisions(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/divisionslist", jsonData, options).toPromise();
  }

  getSubjectsListByDivisionId(jwt, divisionid) {
    let data = { jwt, divisionid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/subjectslistbydivisionid", jsonData, options).toPromise();
  }

  getSubjectsListByStudentId(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/subjectslistbystudentid", jsonData, options).toPromise();
  }

  getStudentsListByDivisionAndSubject(jwt, divisionid, subjectid) {
    let data = { jwt, divisionid, subjectid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/studentslistbydivisionandsubject", jsonData, options).toPromise();
  }

  getAssistsAndAbsenses(jwt, classid) {
    let data = { jwt, classid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getassistsandabsenses", jsonData, options).toPromise();
  }

  saveAttendanceList(jwt, attendancelist, ) {
    let data = { jwt, attendancelist };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/saveattendancelist", jsonData, options).toPromise();
  }

  getSubjectsList(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getsubjectslist", jsonData, options).toPromise();
  }

  getDivisionsListBySubjectId(jwt, subjectid) {
    let data = { jwt, subjectid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/divisionslistbysubjectid", jsonData, options).toPromise();
  }

  getClassroomsList(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getclassroomslist", jsonData, options).toPromise();
  }

  getClassesListByClassroomid(jwt, classroomid) {
    let data = { jwt, classroomid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getclassesbyclassroomid", jsonData, options).toPromise();
  }

  getStudentsListByClassId(jwt, classid) {
    let data = { jwt, classid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getstudentslistbyclassid", jsonData, options).toPromise();
  }

  getTeachersList(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getteacherslist", jsonData, options).toPromise();
  }

  getClassesByTeacherId(jwt, teacherid) {
    let data = { jwt, teacherid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getclassesbyteacherid", jsonData, options).toPromise();
  }

  deleteOption(jwt, optionId) {
    let data = { jwt, optionId };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/jwt/deleteoption", jsonData, options).toPromise();
  }

  getAssist(jwt, classid) {
    let data = { jwt, classid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getAssist", jsonData, options).toPromise();
  }

  deleteUser(userid) {

    let data = { userid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/jwt/deleteUser", jsonData, options).toPromise();
  }


  getUserById(userid) {
    let data = { userid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getuserbyid", jsonData, options).toPromise();
  }

  modifyUser(user) {

    let data = { user };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/modifyUser", jsonData, options).toPromise();
  }

getSurveysListById(jwt) {
    let data = { jwt };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getsurveyslistbyid", jsonData, options).toPromise();
  }

  getStatisticsForSurveyTypeFreeAnswer(jwt, surveyid) {
    let data = { jwt, surveyid };
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/statisticsforsurveytypefreeanswer", jsonData, options).toPromise();
  }

  getStatisticsForSurveyTypeRadiobuttons1Correct2Graphics(jwt, surveyid, questionid) {
    let data = { jwt, surveyid , questionid};
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/statisticsforsurveytyperadiobuttons1correct2graphics", jsonData, options).toPromise();
  }

  getOptionsByAnswerId(jwt, userid, questionid){
    let data = { jwt, userid , questionid};
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://www.ionicparaaprobar.esy.es/getoptionsbyanswerid", jsonData, options).toPromise();
  }
}