import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainViewComponent } from './layout/main-view/main-view.component';
import { PostViewComponent } from './layout/post-view/post-view.component';
import { PostPreviewComponent } from './layout/post-preview/post-preview.component';
import {LayoutModule} from "src/app/layout/layout.module";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {SharedModule} from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
