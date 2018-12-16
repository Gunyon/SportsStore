import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  constructor(private repository: ProductRepository) { }

  get products(): Array<Product> {
    return this.repository.getProducts();
  }

  get categories(): Array<string> {
    return this.repository.getCategories();
  }
}
