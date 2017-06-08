export class Answer {
    answerId:number;
    text:string;
    optionIds:Array<number>;
    userId:number;
    questionId:number;
    surveyId:number;

    constructor() {
        this.answerId = -1;
        this.text = "";
        this.userId = -1;
        this.optionIds = [];
        this.questionId = -1;
        this.surveyId = -1;
    }
}