import { AttendanceListItem } from "./attendanceListItem";

export class AttendanceList {
    attendancelistid:number;
    classid:number;
    creationdate:string;
    ownerid:number;
    attendancelistitems:Array<AttendanceListItem>

    constructor() {
        this.attendancelistid = -1;
        this.classid = -1;
        this.creationdate = "";
        this.ownerid = -1;
        this.attendancelistitems = new Array<AttendanceListItem>();
    }
}