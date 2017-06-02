export class Option{
    optionId:number;
    text:string;
    isRight:boolean;
    questionId:number;
    
    constructor() {
        this.optionId = 0;
        this.text = "";
        this.isRight = false;
        this.questionId = 0;
    }
}