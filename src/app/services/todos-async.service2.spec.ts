import { TodosAsyncService } from './todos-async.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

describe('TodosAsyncService2', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TodosAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    service = new TodosAsyncService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const verifyHeaders = (headers: HttpHeaders) => {
    return (
      headers.has('Authorization') &&
      headers.get('Authorization') === 'my-token' &&
      headers.has('X-Custom-Header') &&
      headers.get('X-Custom-Header') === 'custom-value-here' &&
      headers.has('Content-Type') &&
      headers.get('Content-Type') === 'application/json'
    );
  };

  it('perform get on getTodos', () => {
    service.getTodos().subscribe(n => {
      expect(n).toEqual([]);
    });

    const req = httpTestingController.expectOne(req => {
      return (
        req.url === 'https://example.com/myService' &&
        verifyHeaders(req.headers)
      );
    });
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('handleError on getTodos', () => {
    const emsg = 'deliberate 500 error';
    const eStatusText = 'Internal Server Error';

    service.getTodos().subscribe(
      _ => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(emsg, 'message');
        expect(error.statusText).toEqual(eStatusText, 'statusText');
      }
    );

    const req = httpTestingController.expectOne(
      'https://example.com/myService'
    );

    req.flush(emsg, { status: 500, statusText: 'Internal Server Error' });
  });
});
