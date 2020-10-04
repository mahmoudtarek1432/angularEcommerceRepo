import { Component, OnInit } from '@angular/core';
import { OrderDetails, OrderProduct } from 'src/app/shared/sharedvariables/orders';
import { Orderservice } from 'src/app/services/orderservices/orderservices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails: OrderDetails;
  orderId: number;
  itemCount: number = 0;
  orderProducts: OrderProduct[];
  constructor(private orderService: Orderservice, private route: Router, private activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(params => {
        orderService.getOrderDetails(params["orderId"]).subscribe(orderdetail => {this.orderDetails = orderdetail; console.log(orderdetail)});
        orderService.getOrderProducts(params["orderId"]).subscribe(OProducts => {this.orderProducts = OProducts;
          OProducts.forEach(p=> {this.itemCount += p.quantity;})
        });
        this.orderId = params["orderId"];
      })
      
   }

  ngOnInit(): void {
  }

}
