import { Component, OnInit } from '@angular/core';
import {AuthService} from "src/app/shared/service/auth.service";
import {Web3Service} from "src/app/shared/service/web3.service";
import {PostsService} from "src/app/shared/service/posts.service";

@Component({
  selector: 'app-post-create-view',
  templateUrl: './post-create-view.component.html',
  styleUrls: ['./post-create-view.component.css']
})
export class PostCreateViewComponent implements OnInit {
  text: string = "";

  constructor(private authService: AuthService,
              private web3Service: Web3Service,
              private postService: PostsService) { }

  ngOnInit(): void {



  }

  createArticle() {
    console.log('address', this.authService.address)

    this.postService.deployArticle(this.text)
      .subscribe(result => {
        console.log('result', result);

      });
  }
}
