import { Address } from "./address";

export class User {
    userId:number;
    username:string;
    email:string;
    password:string;
    rolId:number;
    firstname:string;
    lastname:string;
    address:Address;
    filenumber:number;

    constructor() {
      this.userId = 0;
      this.username = "";
      this.email ="";
      this.password = "";
      this.rolId = 0;
      this.firstname = "";
      this.lastname = "";
      this.address = new Address();
      this.filenumber = 0;
    }
}