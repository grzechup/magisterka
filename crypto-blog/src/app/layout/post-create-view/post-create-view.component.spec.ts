import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateViewComponent } from './post-create-view.component';

describe('PostCreateViewComponent', () => {
  let component: PostCreateViewComponent;
  let fixture: ComponentFixture<PostCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
