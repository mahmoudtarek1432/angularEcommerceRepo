import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/shared/sharedvariables/UserInfo';
import { UserService } from 'src/app/services/userservices/User.service';
import { global } from '@angular/compiler/src/util';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  serverErrorMsgs: string[];
  succeeded: boolean;

  editForm:FormGroup;
  formErrors = {
    'firstName':"",
    'lastName':"",
    'phoneNumber':"",
    'address':"",
    'region': "",
    'city':""
  }

  ValidationMessage = {
    'firstName':{
      "required": 'Email is required',
      'minlength': 'The password have to be more than 2 characters',
    },
    'lastName':{
      "required": 'The password is required',
      'minlength': 'The password have to be more than 2 characters',
    },
    'phoneNumber':{
      "required": 'The Phone Number is required',
      "minlength": 'The Phone Number have to be more than 11 characters'
    },
    'address':{
      "required": 'The Address is required',
      "minlength": 'The Address have to be more than 5 characters'
    },
    'region': {
      "required": 'The Region is required'
    },
    'city': {
      "required": 'The City is required'
    }
  }

  userInfo: UserInfo;
  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
  }

  ngOnInit(): void {
    this.createForm();
    this.editForm.valueChanges.subscribe(data=> this.onValueChange(data));
    this.onValueChange();
  }

  onSubmit(){
    console.log('lolxd')
    var userInfoSend:UserInfo ={
      FirstName: this.editForm.get("firstName").value,
      LastName: this.editForm.get("lastName").value,
      PhoneNumber: this.editForm.get("phoneNumber").value,
      Address: this.editForm.get("address").value,
      AdditionalInfo: this.editForm.get("additionalInfo").value,
      Region: this.editForm.get("region").value,
      City: this.editForm.get("city").value,
      Email: this.userInfo.Email
    }

    this.userService.UpdateUserInfo(userInfoSend).subscribe(result => {
      if(result.isSuccessful){
        localStorage.setItem("UserInfo",JSON.stringify(userInfoSend));
        this.succeeded = true;
        this.userInfo = userInfoSend;
        return
      }
      this.serverErrorMsgs = result.errors;
    })
  }

  createForm(){
    this.editForm = this.fb.group({
      firstName: [this.userInfo.FirstName,[Validators.required,Validators.minLength(2)]],
      lastName: [this.userInfo.LastName,[Validators.required,Validators.minLength(2)]],
      phoneNumber: [this.userInfo.PhoneNumber,[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      additionalInfo: this.userInfo.AdditionalInfo,
      address: [this.userInfo.Address,[Validators.required,Validators.minLength(5)]],
      region: [this.userInfo.Region,Validators.required],
      city: [this.userInfo.City,Validators.required]
    })
  }

  onValueChange(data?:any){
    if(!this.editForm){return}
    const form = this.editForm;
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
}
