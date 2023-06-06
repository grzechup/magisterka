import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }


  deployArticle(text: string){
    return this.http.post('/api/deployNFT', {text: text});
  }

}
