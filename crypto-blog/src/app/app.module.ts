import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainViewComponent } from './layout/main-view/main-view.component';
import { PostViewComponent } from './layout/post-view/post-view.component';
import { PostPreviewComponent } from './layout/post-preview/post-preview.component';
import {LayoutModule} from "src/app/layout/layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
