import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
  cartSummary: cart[] | undefined;
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
    this.loadDetails();
  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartSummary = result;
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
      this.priceSummary.total =
        this.priceSummary.price +
        this.priceSummary.discount +
        this.priceSummary.tax +
        this.priceSummary.delivery;
        if(this.cartSummary.length === 0){
          this.router.navigate(['/'])
        }
    });
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
  removeToCart(cartId: number | undefined) {
    cartId &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }
}
