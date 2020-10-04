import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userservices/User.service';
import { Globals } from 'src/app/shared/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  PasswordForm: FormGroup

  serverErrorMsgs: string[];

  formErrors = {
    'oldPassword':"",
    'newPassword':"",
    'confirmNewPassword':"",
  }

  ValidationMessage = {
    'oldPassword':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 8 characters',
      'pattern': 'the password can contain characters and numbers only'
    },
    'newPassword':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 8 characters',
      'pattern': 'the password can contain characters and numbers only'
    },
    'confirmNewPassword':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 8 characters',
      'pattern': 'the password can contain characters and numbers only',
      "notSame": 'Confirm Password does not match New Password'
    }
  }

  constructor(private fb: FormBuilder, private userService: UserService, private globals: Globals, private route:Router) { }

  ngOnInit(): void {
    this.createForm();
    this.PasswordForm.valueChanges.subscribe(data=>this.onValueChange(data));
    this.onValueChange();
  }

  createForm(){
    this.PasswordForm = this.fb.group({
      oldPassword:['',[Validators.required,Validators.minLength(8),Validators.pattern]],
      newPassword:['',[Validators.required,Validators.minLength(8),Validators.pattern]],
      confirmNewPassword:['',[Validators.required,Validators.minLength(8),Validators.pattern]]
    })

    this.PasswordForm.get("confirmNewPassword").setErrors({
      notSame: true,
      required: true
    })
  }

  onValueChange(data?:any){
    if(!this.PasswordForm){return}
    const form = this.PasswordForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(field == 'confirmNewPassword'){
          if(form.get(field).value != form.get('newPassword').value){
            control.setErrors({notSame: true})
          }else{
            control.clearValidators()
          }
        }
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

  onSave(){
    let currentPassword = this.PasswordForm.get('oldPassword');
    let newPassword = this.PasswordForm.get('newPassword');
    this.userService.PostChangePassword(currentPassword.value, newPassword.value).subscribe(
      result=>{
        if(result.isSuccessful == false){ 
          this.serverErrorMsgs = result.errors;
          return;
        }
        this.userService.GetUserLogout().subscribe(result => {
          if(result.isSuccessful){
            localStorage.removeItem("UserInfo");
            this.globals.loggedIn = false;
            console.log(result.message);
            this.route.navigateByUrl("/home");
          }}
          );
      }
    );
  }
}

