import { Component, OnInit } from '@angular/core';
import { Orderservice } from 'src/app/services/orderservices/orderservices.service';
import { Orders } from 'src/app/shared/sharedvariables/orders';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  openOrClosed: boolean = true; // true is open

  openOrdersList: Orders[];
  closedOrdersList: Orders[];
  constructor(private orderService: Orderservice, private route: Router, private activatedRoute: ActivatedRoute) {
    orderService.getOrders().subscribe(orders => {
      console.log(orders)
      this.openOrdersList = orders.filter(o => o.orderStatus != "Order canceled");
      this.closedOrdersList = orders.filter(o => o.orderStatus == "Order canceled");
      console.log(this.openOrdersList);
    })
   }

  ngOnInit(): void {
  }

  orderTypeClick($event: Event,closed,open){
    console.log($event.srcElement)
    
      console.log(closed)
    if($event.srcElement == closed){

      closed.setAttribute("class", "block active");
      open.setAttribute("class", "block");
      this.openOrClosed = false;
    }
    else{
      closed.setAttribute("class", "block");
      open.setAttribute("class", "block active");
      this.openOrClosed = true;
    }
  }

  displayDetails(orderId){
    this.route.navigate(["./Details/"+orderId],{relativeTo: this.activatedRoute})
  }
}
