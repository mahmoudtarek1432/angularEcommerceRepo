import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  formErrors = {
    "email":'',
    'password':'',
    'redoPassword':'',
    'firstname':'',
    'lastname':'',

  }

  ValidationMessage = {
    'email':{
      "required": 'This field is required',
      'email': 'Wrong email format'
    },
    'password':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 8 characters',
      'pattern': 'the password may contain characters and numbers only'
    },
    'redoPassword':{
      "required": 'This field is required',
      'notSame': 'The password is different'
    },
    'firstname':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 2 characters',
      'pattern': 'the firstname can contain characters  only'
    },
    'lastname':{
      "required": 'This field is required',
      'minlength': 'The password have to be more than 2 characters',
      'pattern': 'the lastname can contain characters only'
    }
  }
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.creatForm();
    this.registerForm.valueChanges.subscribe((data)=> this.onValueChange(data));
    this.onValueChange();
  }

  creatForm(){
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern]],
      redoPassword:['',[Validators.required]],
      firstname:['',[Validators.required,Validators.minLength(2),Validators.pattern]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.pattern]],
    })

    this.registerForm.get('redoPassword').setErrors({
      notSame: true,
      required: true
    })
  }

  onValueChange(data?:any){
    if(!this.registerForm){return}
    const form = this.registerForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(field == 'redoPassword'){
          if(form.get(field).value != form.get('password').value){
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
}
