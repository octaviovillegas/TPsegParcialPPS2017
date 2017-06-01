import { Option } from "./option";

export class Question{
    questionId:number;
    text:string;
    surveyId:number;
    options:Array<Option>
    

    constructor() {
        this.questionId = 0;
        this.text = "";
        this.surveyId = 0;
        this.options = [];
    }
}