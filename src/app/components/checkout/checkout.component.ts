import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartData: cart[] | undefined;
  cartSummary: cart[] = [];
  msgOrder: string | undefined;
  itemQuantity: number = 0;
  priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private router: Router) {}
  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      this.cartSummary = result;
      this.cartData = result;
      this.itemQuantity = this.cartSummary.length;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 20;
      this.priceSummary.delivery = 100;
      let total = this.priceSummary.price +
      this.priceSummary.discount +
      this.priceSummary.tax +
      this.priceSummary.delivery
      this.priceSummary.total = Math.floor(total);
    });
  }
  orderNow(data: any) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.priceSummary.total) {
      let orderData = {
        ...data,
        totalPrice: this.priceSummary.total,
        userId,
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 500);
      });
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.msgOrder = 'Your Order has been successfully placed!';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.msgOrder = undefined
          }, 4000);
        }
      });
    }
  }
}
