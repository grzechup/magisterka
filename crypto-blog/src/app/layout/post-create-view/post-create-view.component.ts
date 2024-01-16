import { Component, OnInit } from '@angular/core';
import {AuthService} from "src/app/shared/service/auth.service";
import {Web3Service} from "src/app/shared/service/web3.service";
import {IpfsService} from "src/app/shared/service/ipfs.service";
import {ArticleService} from "../../shared/service/article.service";

@Component({
  selector: 'app-post-create-view',
  templateUrl: './post-create-view.component.html',
  styleUrls: ['./post-create-view.component.css']
})
export class PostCreateViewComponent implements OnInit {
  text: string = "";
  title: string = "";
  price: number = 0;

  constructor(private authService: AuthService,
              private web3Service: Web3Service,
              private articleService: ArticleService,
              private postService: IpfsService) { }

  ngOnInit(): void {

  }

  createArticle() {
    console.log('address', this.authService.address)
    this.articleService.createNewArticle(this.title, this.text, this.price)
      .then(() => this.clearForm());
  }

  clearForm(){
    this.text = "";
    this.title = "";
    this.price = 0;
  }
}
