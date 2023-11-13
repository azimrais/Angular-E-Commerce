import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './sellerComponents/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './sellerComponents/seller-home/seller-home.component';
import { sellerAuthGuard } from './Guard/seller-auth.guard';
import { SellerAddProductComponent } from './sellerComponents/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './sellerComponents/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './userComponents/user-auth/user-auth.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './userComponents/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [sellerAuthGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [sellerAuthGuard],
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[sellerAuthGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path:'product-details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  },{
    path:'cart-summary',
    component:CartSummaryComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'my-orders',
    component:MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
