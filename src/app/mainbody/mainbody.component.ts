import { Component, OnInit } from '@angular/core';
import { modalslide, mainslide, shadow, visibility, searchbar } from '../animations/app.animation'
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.scss'],
  animations: [
    mainslide(),
    shadow(),
    visibility(),
    searchbar()
  ]
})
export class MainbodyComponent implements OnInit {

  serachbar: string = 'hidden';
  constructor(public globals:Globals) {
  
   }

  ngOnInit() {
  }

  modaltriggered(){
    if(this.globals.modalstatus == 'nottoggled'){
      this.globals.modalstatus = "toggled";
    }
    else if(this.globals.modalstatus == 'toggled'){
      this.globals.modalstatus = "nottoggled";
    }
  }

    onClickSearch(){
    if(this.serachbar == 'hidden'){
      this.serachbar = "shown";
    }
    else if(this.serachbar == 'shown'){
      this.serachbar = "hidden";
    }
  }

  slideup(){
    let accel = 2.5;
    let velo = 20;
    let timer = setInterval(()=>{
      console.log(21)
      velo = velo + accel
      window.scrollTo(0,window.pageYOffset - velo);
      if(window.pageYOffset <= 0){
        clearInterval(timer);
      }
    },20)
  }
}
