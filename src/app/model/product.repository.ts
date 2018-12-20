import { Injectable } from '@angular/core';
import { Product } from './product.model';
// import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getProducts().subscribe(data => {
      this.products = data;
      // get unique categories from products
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getProducts(category: string = null): Product[] {
    return this.products.filter(p => !category || category === p.category);
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (!product.id) {
      this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe(p => {
        const index = this.products.findIndex(_p => _p.id === product.id);
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      const index = this.products.findIndex(_p => _p.id === id);
      this.products.splice(index, 1);
    });
  }
}
