import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult: undefined | product[];

  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit() {
    let query = this.route.snapshot.paramMap.get('query');
    query &&
      this.product.searchProducts(query).subscribe((data) => {
        this.searchResult = data;
      });
  }
}
