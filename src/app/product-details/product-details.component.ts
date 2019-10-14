import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, ProductsService } from './products.service';

@Component({
  selector: 'app-product-details',
  template: `
    <div *ngIf="loading" data-test="spinner">
      Loading...
    </div>
    <div *ngIf="error" data-test="error">
      {{ error }}
    </div>
    <div *ngIf="!error && !loading" data-test="product">
      {{ product.id }}
    </div>
  `,
  styles: []
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;
  product: Product | null;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private products: ProductsService
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap => {
          this.loading = true;
          this.error = null;
          const id = paramMap.get('id');
          return this.products.getProduct(id);
        })
      )
      .subscribe({
        next: product => {
          this.loading = false;
          this.product = product;
        },
        error: error => {
          this.loading = false;
          this.error = error;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
