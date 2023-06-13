import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "src/app/layout/header/header.component";
import {MainViewComponent} from "src/app/layout/main-view/main-view.component";
import {PostViewComponent} from "src/app/layout/post-view/post-view.component";
import {ArticlePreviewComponent} from "src/app/layout/post-preview/article-preview.component";
import {RouterModule} from "@angular/router";
import { PostCreateViewComponent } from './post-create-view/post-create-view.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    MainViewComponent,
    PostViewComponent,
    ArticlePreviewComponent,
    PostCreateViewComponent
  ],
  exports: [
    HeaderComponent,
    MainViewComponent,
    PostViewComponent,
    ArticlePreviewComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ]
})
export class LayoutModule { }
