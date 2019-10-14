import { TodosAsyncService } from './todos-async.service';
import { EMPTY, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

describe('TodosAsyncService', () => {
  let service: TodosAsyncService;

  let httpClientMock;

  const validateHeaders = (headers: HttpHeaders) => {
    expect(headers).toBeTruthy();
    expect(headers.has('Authorization'));
    expect(headers.get('Authorization')).toEqual('my-token');
    expect(headers.has('Content-Type'));
    expect(headers.get('Content-Type')).toEqual('application/json');
    expect(headers.has('X-Custom-Header'));
    expect(headers.get('X-Custom-Header')).toEqual('custom-value-here');
  };

  beforeEach(() => {
    httpClientMock = httpClientMock = {
      get: () => EMPTY,
      post: () => EMPTY,
      delete: () => EMPTY
    };
    service = new TodosAsyncService(httpClientMock as any);
  });

  it('should add todo and return observable with id', done => {
    const expectedId = 7;
    httpClientMock.post = () => of({ id: expectedId });
    service.addTodo('first test TODO item').subscribe(next => {
      expect(next).toEqual(expectedId);
      done();
    });
  });

  it('should complete after first element on add', done => {
    let cnt = 0;
    const expectedId = 7;
    httpClientMock.post = () => of({ id: expectedId });
    service.addTodo('first test TODO item').subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });

  it('should call http POST on addTodo', () => {
    const expectedUrl = 'https://example.com/myService';
    const expectedContent = 'another todo added in the test';

    const postMethod = spyOn(httpClientMock, 'post').and.returnValue(
      of({ id: 0 })
    );

    service.addTodo(expectedContent);

    expect(postMethod).toHaveBeenCalledTimes(1);
    expect(postMethod).toHaveBeenCalledWith(
      expectedUrl,
      expectedContent,
      jasmine.any(Object)
    );
    validateHeaders((postMethod.calls.mostRecent().args[2] as any).headers);
  });

  it('should return empty array when service returns empty array', done => {
    httpClientMock.get = () => of([]);
    service.getTodos().subscribe(next => {
      expect(next).toEqual([]);
      done();
    });
  });

  it('should complete after first element on get', done => {
    let cnt = 0;
    httpClientMock.get = () => of([]);
    service.getTodos().subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });

  it('should call http GET on addTodo', () => {
    const expectedUrl = 'https://example.com/myService';

    const getMethod = spyOn(httpClientMock, 'get').and.returnValue(of([]));

    service.getTodos();

    expect(getMethod).toHaveBeenCalledTimes(1);
    expect(getMethod).toHaveBeenCalledWith(expectedUrl, jasmine.any(Object));
    validateHeaders((getMethod.calls.mostRecent().args[1] as any).headers);
  });

  it('should remove todo', done => {
    httpClientMock.delete = () => of({ result: true });
    service.removeTodo(88).subscribe(next => {
      expect(next).toEqual(true);
      done();
    });
  });

  it('should complete after first element on remove', done => {
    let cnt = 0;
    httpClientMock.delete = () => of({ result: true });
    service.removeTodo(1).subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });

  it('should call http GET on addTodo', () => {
    const expectedUrl = 'https://example.com/myService/78';

    const deleteMethod = spyOn(httpClientMock, 'delete').and.returnValue(
      of({ result: true })
    );

    service.removeTodo(78);

    expect(deleteMethod).toHaveBeenCalledTimes(1);
    expect(deleteMethod).toHaveBeenCalledWith(expectedUrl, jasmine.any(Object));
    validateHeaders((deleteMethod.calls.mostRecent().args[1] as any).headers);
  });
});
