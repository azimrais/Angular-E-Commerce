import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp, cart, product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showStatus = false;
  authError: string = '';
  constructor(
    private router: Router,
    private user: UserService,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    this.user.userAuhReload();
  }
  getFormData(data: SignUp) {
    this.user.useSignUp(data);
  }

  getLoginFormData(data: SignIn) {
    this.user.userSignIn(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Please Enter valid user details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  toggleKey() {
    this.showStatus = !this.showStatus;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id

    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: any = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {});
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }
}
