import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  selectedCategory: string = null;
  productsPerPage = 4;
  selectetPage = 1;

  constructor(
    private router: Router,
    private repository: ProductRepository,
    private cart: Cart
  ) { }

  // get products based on selected category(all if not selected),
  // selected page and how many should be displayed on a page
  get products(): Array<Product> {
    const pageIndex = (this.selectetPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): Array<string> {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectetPage = newPage;
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  // get number of pages based on number of products
  // and how many should be displayed per page
  get pageCount() {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  // old implementation for pagination(with ngFor)
  // replaced by pageCount
  // get pageNumbers() {
  //   const count = this.repository.getProducts(this.selectedCategory).length;
  //   return Array(Math.ceil(count / this.productsPerPage)).fill(0).map((x, i) => i + 1);
  // }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    // this.router.navigateByUrl('/cart');
  }

}
