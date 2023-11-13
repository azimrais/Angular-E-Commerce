import { CanActivateFn } from '@angular/router';
import { ɵɵinject } from '@angular/core';
import { SellerService } from '../services/seller.service';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  
  const authService =  ɵɵinject(SellerService)
  if (authService.isSellerLoggedIn) {
    return true; 
  } else {
    return false;
  }
};