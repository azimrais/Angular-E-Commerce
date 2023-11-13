import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage:undefined|string;
  iconTrash = faTrash;
  iconEdit = faEdit;
  constructor(private product: ProductService) {}

  ngOnInit() {
   this.productLists()
  }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = "product is successfully deleted"
        this.productLists()
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
}
productLists(){
  this.product.productList().subscribe((result) => {
    this.productList = result;
  });
}
}