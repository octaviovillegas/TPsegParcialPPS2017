export class QuestionListItemData {
    surveyId:number;
    title:string;
    owner:string;
    creationDate:string;
    endDate:string;
    ownerid:number;


    constructor() {
        this.surveyId = 0;
        this.title = "";
        this.owner = "";
        this.creationDate = "";
        this.endDate = "";
        this.ownerid = 0;
    }
}