import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/sharedvariables/UserInfo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  userInfo: UserInfo;
  constructor(private route:Router, private activateRoute: ActivatedRoute) {
    this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
   }

  ngOnInit(): void {
  }

  routeToSibling(goTo: string){
    this.route.navigate([goTo],{relativeTo: this.activateRoute});
  }
}
