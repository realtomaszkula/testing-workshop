import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
}

@Injectable()
export class ProductsService {
  constructor() {}

  getProduct(id: string): Observable<Product> {
    return of({ id });
  }
}
