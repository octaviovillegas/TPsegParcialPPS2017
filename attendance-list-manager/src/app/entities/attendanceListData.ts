export class AttendanceListData {
    firstname:string;
    lastname:string;
    userid:number;
    present:boolean;

    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.userid = -1;
        this.present = false;
    }
}