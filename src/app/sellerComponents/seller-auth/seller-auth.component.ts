import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showStatus = true
  authError:string ='';
  constructor(private seller:SellerService, private router:Router){}
  ngOnInit():void{
    this.seller.reloadSeller()
  }
  getFormData(data:SignUp){
    this.seller.userSignUp(data)
  }
  getLoginFormData(data:SignIn){
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError= " Oops! Email or password is not correct."
      }
    })
  }
  toggleKey(){
    this.showStatus = !this.showStatus
  }
}
