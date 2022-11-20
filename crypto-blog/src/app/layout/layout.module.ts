import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "src/app/layout/header/header.component";
import {MainViewComponent} from "src/app/layout/main-view/main-view.component";
import {PostViewComponent} from "src/app/layout/post-view/post-view.component";
import {PostPreviewComponent} from "src/app/layout/post-preview/post-preview.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    MainViewComponent,
    PostViewComponent,
    PostPreviewComponent
  ],
  exports: [
    HeaderComponent,
    MainViewComponent,
    PostViewComponent,
    PostPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
