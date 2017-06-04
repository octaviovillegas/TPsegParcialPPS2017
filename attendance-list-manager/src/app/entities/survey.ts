import { Question } from "./question";


export class Survey {
    surveyId:number;
    title:string;
    creationDate:string;
    endDate:string;
    question:Question;
    ownerid:number;
    wasEliminated:boolean;

    constructor() {
        this.title = "";
        this.surveyId = 0;
        this.creationDate = "";
        this.endDate = "";
        this.question = new Question();
        this.ownerid = 0;
        this.wasEliminated = false;
    }
}