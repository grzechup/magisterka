import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewComponent } from 'src/app/layout/post-view/article-view.component';

describe('PostViewComponent', () => {
  let component: ArticleViewComponent;
  let fixture: ComponentFixture<ArticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
