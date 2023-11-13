import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:product| undefined;
  productMessage:undefined|string;
  constructor(private route:ActivatedRoute, private product:ProductService, private router:Router){}

  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data)
      this.productData = data
    })
  }
update(data:product){
  if(this.productData){data.id = this.productData.id  }
  this.product.updateProduct(data).subscribe((result)=>{
    if(result){
      this.productMessage = "Product has successfully updated!"
    }
  })
  setTimeout(() => {
    this.productMessage = undefined
    this.router.navigate(['seller-home'])
  }, 3000);
}
}
