import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { Globals } from './shared/globals';
import { UserService } from './services/userservices/User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng10test';

  constructor( private cookie: CookieService, private globals: Globals, private userService: UserService){
    this.userService.checkUserAuthentication().subscribe((result) => {
      console.log(result);
      if(!result.isSuccessful){
        localStorage.removeItem("UserInfo");
        this.globals.loggedIn = false;
      }
      else{
        this.globals.loggedIn = true;
        localStorage.setItem("UserInfo",result.message);
      }
    })
  }

  ngOnInit(){
    
  }

  slideup(){
    let accel = 1.1;
    let velo = 10;
    let timer = setInterval(()=>{
      velo = velo + velo*accel;
      accel += 0.005;
      window.scrollTo(0,window.pageYOffset - velo);
      if(window.pageYOffset <= 0){
        clearInterval(timer);
      }
    },50)
  }
}
