import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { Product, ProductsService } from './products.service';

class MockActivatedRoute {
  /* implemented as part of ActivatedRoute */
  paramMap = new Subject();
}

class MockProductsService implements ProductsService {
  /* for testing purposes */
  product = new Subject<Product>();

  /* implemented as part of ProductsService */
  getProduct() {
    return this.product.asObservable();
  }
}

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let activatedRoute: MockActivatedRoute;
  let productService: MockProductsService;

  const selectors = {
    error: () => fixture.debugElement.query(By.css('[data-test="error"]')),
    spinner: () => fixture.debugElement.query(By.css('[data-test="spinner"]')),
    product: () => fixture.debugElement.query(By.css('[data-test="product"]'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ProductsService, useClass: MockProductsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    activatedRoute = TestBed.get(ActivatedRoute);
    productService = TestBed.get(ProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show spinner when product is not yet loaded', () => {
    expect(selectors.spinner()).toBeDefined();
    expect(selectors.product()).toBeNull();
    expect(selectors.error()).toBeNull();
  });

  it('should show product when product is loaded', () => {
    const id = '1';
    activatedRoute.paramMap.next(new Map().set('id', id));
    productService.product.next({ id });
    fixture.detectChanges();
    expect(selectors.spinner()).toBeNull();
    expect(selectors.error()).toBeNull();
    expect(selectors.product()).toBeDefined();
    expect(selectors.product().nativeElement.textContent).toContain(id);
  });

  it('should show error when product fails to load', () => {
    const id = '1';
    const error = 'error';
    activatedRoute.paramMap.next(new Map().set('id', id));
    productService.product.error(new Error(error));
    fixture.detectChanges();
    expect(selectors.spinner()).toBeNull();
    expect(selectors.product()).toBeNull();
    expect(selectors.error()).toBeDefined();
    expect(selectors.error().nativeElement.textContent).toContain(error);
  });
});
