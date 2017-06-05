import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewUserData } from "../../app/entities/newUserData";

@Component({
  selector: 'new-user-component',
  templateUrl: 'new-user-component.html'
})
export class NewUserComponent implements OnInit {
  text: string;
  roles: Array<string>
  form:FormGroup;


  ngOnInit(): void {
    this.setUserTypesByCurrenRol();
  }

  constructor(private storage:Storage, private fb: FormBuilder) {
    this.roles = [];
    this.form = this.fb.group({
      //user table
      firstname: ["",Validators.required],
      lastname: ["",Validators.required],
      username: ["",Validators.required],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      filenumber: "",
      rol: ["", [Validators.required]],

      //address table
      street: ["", [Validators.required]],
      number: ["", [Validators.required]],
      city: ["", [Validators.required]],
      floor: ["", [Validators.required]],
      department: ["", [Validators.required]],
      clarification: "",
    });
    
  }


  setUserTypesByCurrenRol(){
    this.storage.get("rol").then((rol)=>{
      let roles = ["Profesor","Alumno"]
      if(rol == "Administrator"){
        roles.push("Administrador","Administrativo");
      }
      this.roles = roles;
    });
  }

  formToObject(){
    let user = new NewUserData();
    
    //new user data
    user.username = this.form.get("username").value;
    user.firstname = this.form.get("firstname").value;
    user.lastname = this.form.get("lastname").value;
    user.email = this.form.get("email").value;
    user.password = this.form.get("password").value;
    user.filenumber = this.form.get("filenumber").value;
    user.rol = this.form.get("rol").value;

    //address data
    user.street = this.form.get("street").value;
    user.number = this.form.get("number").value;
    user.city = this.form.get("city").value;
    user.floor = this.form.get("floor").value;
    user.departament = this.form.get("department").value;
    user.clarification = this.form.get("clarification").value;

    console.log(user);
  }

  createNewUser(){
    this.formToObject();
  }
}
