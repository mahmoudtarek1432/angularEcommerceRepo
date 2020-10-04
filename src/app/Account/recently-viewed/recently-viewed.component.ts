import { Component, OnInit } from '@angular/core';
import { RecentlyviewedService } from 'src/app/services/recentlyviewed/recentlyviewed.service';
import { minifiedItem } from 'src/app/shared/sharedvariables/savedItem';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent implements OnInit {

  viewedItems: minifiedItem[];

  constructor(private recentlyviewedService: RecentlyviewedService) {
    recentlyviewedService.getRecentlyViewedItems().subscribe(I => 
      this.viewedItems = I
      );
   }

  ngOnInit(): void {
  }

}
