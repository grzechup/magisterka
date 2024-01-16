import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";
import {ArticleService} from "../../shared/service/article.service";
import {ArticleData} from "../../shared/model/article-data";
import { from } from 'rxjs';
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-post-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  private articleId: number;
  article: ArticleData;
  dataLoaded: Promise<boolean>;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap((params: any) => {
          console.log('params', params);
          this.articleId = params.id;
          return this.loadArticle(params.id);
        })
    ).subscribe();
  }

  loadArticle(articleId){
    return from(this.articleService.getArticle(articleId)).pipe(map(result => {
      console.log('result', result);
      this.article = result;
      if(!!result){
        this.dataLoaded = Promise.resolve(true);
      }
    }))
  }

  buyArticle() {
    this.dataLoaded = Promise.resolve(false);
    from(this.articleService.buyArticle(this.articleId, this.article.price))
      .pipe(
        switchMap(result => this.loadArticle(this.articleId)),
        tap(() => this.authService.refreshBalance()))
      .subscribe()
  }
}
