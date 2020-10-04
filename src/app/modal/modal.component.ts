import { Component, OnInit } from '@angular/core';
import { dropdown,modalslide } from '../animations/app.animation';
import { Globals } from '../shared/globals';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    dropdown(),
    modalslide()]
})
export class ModalComponent implements OnInit {

  toggledropdowns={
    'toggleAccessories' : 'nottoggled',
    'toggleShoes' : 'nottoggled',
    'toggleBags' : 'nottoggled'
  }

  modalstatus:string;

  constructor(public globals:Globals) {
    
    
   }

  ngOnInit() {
  }

  clickDropdown(toggleTriggered:string){
  if(this.toggledropdowns[toggleTriggered] == 'nottoggled'){
    for(const toggles in this.toggledropdowns){
      if(toggles != toggleTriggered &&
                this.toggledropdowns[toggles] == 'toggled'){
        this.toggledropdowns[toggles] = 'nottoggled';
      }
    }
    this.toggledropdowns[toggleTriggered] = 'toggled'
  }else{
    this.toggledropdowns[toggleTriggered] = 'nottoggled'
    }
  }

  modaltriggered(){
    
    if(this.globals.modalstatus == 'toggled'){
      this.globals.modalstatus = "nottoggled";
      
    }
    console.log(this.modalstatus)
  }
}
