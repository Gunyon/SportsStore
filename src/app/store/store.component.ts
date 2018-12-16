import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  selectedCategory: string = null;
  productsPerPage = 4;
  selectetPage = 1;

  constructor(private repository: ProductRepository) { }

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

  get pageCount() {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  // get pageNumbers() {
  //   const count = this.repository.getProducts(this.selectedCategory).length;
  //   return Array(Math.ceil(count / this.productsPerPage)).fill(0).map((x, i) => i + 1);
  // }
}
