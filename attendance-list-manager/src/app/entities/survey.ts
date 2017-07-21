import { Question } from "./question";
import { SurveyType } from "../app.module";


export class Survey {
    surveyId:number;
    title:string;
    creationDate:string;
    endDate:string;
    question:Question;
    ownerid:number;
    wasEliminated:boolean;
    surveyTypeId:SurveyType;
    
    constructor() {
        this.title = "";
        this.surveyId = 0;
        this.creationDate = "";
        this.endDate = "";
        this.question = new Question();
        this.ownerid = 0;
        this.wasEliminated = false;
        this.surveyId = 0;
    }
}