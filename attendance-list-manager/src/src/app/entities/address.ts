export class Address{
    addressId:number;
    street:string;
    number:string;
    floor:string;
    departament:string;
    clarification:string;
    city:string;
    
    constructor() {
        this.addressId = 0;
        this.street = "";
        this.number = "";
        this.city = "";
        this.floor = "";
        this.departament = "";
        this.clarification = "";
    }
}