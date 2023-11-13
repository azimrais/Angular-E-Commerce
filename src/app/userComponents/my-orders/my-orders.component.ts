import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orderData: any[] | undefined;
  item: any;
  constructor(private product: ProductService) {}
  ngOnInit() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((result) => {
        this.product.orderList().subscribe((result) => {
          this.orderData = result;
        });
      });
  }
}
