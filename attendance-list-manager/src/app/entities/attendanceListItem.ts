export class AttendanceListItem {
    attendancelistitemid:number;
    studentid:number;
    present:boolean;

    constructor() {
        this.attendancelistitemid = -1;
        this.studentid = -1;
        this.present = false;
    }
}