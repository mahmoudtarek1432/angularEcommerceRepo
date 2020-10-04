import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { UserService } from '../services/userservices/User.service';
import { UserManagerResponse } from '../shared/sharedvariables/userManagerResponse';
import { CookieService } from 'ngx-cookie-service';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Router } from '@angular/router';
import { Globals } from '../shared/globals';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  formErrors = {
    "email":'',
    'password':''
  }

  ValidationMessage = {
    'email':{
      "required": 'Email is required',
      'email': 'Wrong email format'
    },
    'password':{
      "required": 'The password is required',
      'minlength': 'The password have to be more than 8 characters',
      'pattern': 'the password can contain characters and numbers only'
    }
  }
  constructor(private formBuilder:FormBuilder, private userservice: UserService, private cookie: CookieService,
              private router: Router, private dialogRef: MatDialogRef<LoginComponent>, private globals: Globals) { 
    
                console.log(localStorage.getItem("UserInfo"))
  }

  ngOnInit() {
    this.creatForm();
    this.loginForm.valueChanges.subscribe((data)=> this.onValueChange(data));
    this.onValueChange();
    console.log(localStorage.getItem("UserInfo"));
  }

  creatForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern]]
    })
  }

  onValueChange(data?:any){
    if(!this.loginForm){return}
    const form = this.loginForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
       
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.ValidationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              
              this.formErrors[field] += (this.formErrors[field] != '')?'<br>'+ messages[key] + ' ': ''+ messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  submitLoginCredentials(){
    var Email = this.loginForm.get("email").value;
    var Password = this.loginForm.get("password").value;

    this.userservice.PostUserLogin(Email, Password).subscribe(result => {
      if(result.isSuccessful){
        this.router.navigateByUrl("/home");
        this.globals.loggedIn = true;
        console.log(result.message)
        localStorage.setItem("UserInfo",result.message); 
        this.dialogRef.close();
      }});

    
  }
}
