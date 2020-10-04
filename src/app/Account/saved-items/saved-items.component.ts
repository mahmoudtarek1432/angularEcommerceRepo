import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userservices/User.service';
import { minifiedItem } from 'src/app/shared/sharedvariables/savedItem';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveditemsService } from 'src/app/services/saveditems/saveditems.service';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit {

  savedItems: minifiedItem[];

  constructor(private savedItemsService: SaveditemsService, private router: Router, private activatedRoute: ActivatedRoute) {
    savedItemsService.GetSavedItems().subscribe(s => {
      this.savedItems = s;
    })
   }

  ngOnInit(): void {
  }

  removeSavedItem(productId:number){
    this.savedItemsService.RemoveFromSavedItems(productId).subscribe(result =>
      {
        console.log(result)
        if(result.isSuccessful == true){
          this.savedItems = this.savedItems.filter(i => i.id != productId);
        }
    })
  }
}
