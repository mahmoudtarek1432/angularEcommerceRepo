import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../shared/sharedvariables/UserInfo';
import { UserService } from '../services/userservices/User.service';
import { Router } from '@angular/router';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

  userInfo: UserInfo;
  constructor(private userService: UserService, private route: Router, private globals: Globals) { 
   
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    console.log(this.userInfo);
    if(this.userInfo == null || this.userInfo.FirstName == ""){
      this.userService.GetUserLogout();
      this.globals.loggedIn = false;
      this.route.navigateByUrl("/home");
    }
  }

  Logout(){
    this.userService.GetUserLogout().subscribe(result=>{
      if(result.isSuccessful){
        localStorage.removeItem("UserInfo");
        this.globals.loggedIn = false;
        console.log(result.message);
        this.route.navigateByUrl("/home");
      }
    })
  }
}
