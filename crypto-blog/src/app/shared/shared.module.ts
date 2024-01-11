import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {Web3Service} from "./service/web3.service";
import {ArticleService} from "./service/article.service";



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    Web3Service,
    ArticleService
  ]
})
export class SharedModule { }
