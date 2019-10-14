import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { CommentsComponent } from './comments.component';
import { Comment, CommentsService } from './comments.service';

class MockCommentsService implements CommentsService {
  /* for testing purposes */
  comments = new Subject<Comment[]>();

  /* implemented as part of CommentsService */
  getComments() {
    return this.comments.asObservable();
  }
}

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let service: MockCommentsService;
  const selectors = {
    error: () => fixture.debugElement.query(By.css('[data-test="error"]')),
    spinner: () => fixture.debugElement.query(By.css('[data-test="spinner"]')),
    comments: () => fixture.debugElement.query(By.css('[data-test="comments"]'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      providers: [
        {
          provide: CommentsService,
          useClass: MockCommentsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(CommentsService);
  });

  it('should show spinner during commentsService.getComments() request', () => {
    expect(selectors.spinner()).toBeDefined();
  });

  describe('when .getComments() fails', () => {
    it('should render error message', () => {
      const error = 'error';
      service.getComments();
      service.comments.error(new Error(error));
      fixture.detectChanges();
      expect(selectors.spinner()).toBeNull();
      expect(selectors.error()).toBeDefined();
      expect(selectors.error().nativeElement.textContent).toContain(error);
    });
  });

  describe('when .getComments() is successful', () => {
    it('should render comments', () => {
      const comments = [];
      service.getComments();
      service.comments.next(comments);
      fixture.detectChanges();
      expect(selectors.spinner()).toBeNull();
      expect(selectors.comments()).toBeDefined();
    });
  });
});
