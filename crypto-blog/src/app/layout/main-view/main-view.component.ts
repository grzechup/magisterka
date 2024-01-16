import { Component, OnInit } from '@angular/core';
import {ArticlePreviewData} from "src/app/shared/model/article-preview-data";
import {ArticleService} from "../../shared/service/article.service";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  articles: ArticlePreviewData[] = [];

  constructor(private articleService: ArticleService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signed.subscribe(result => {
      if(result){
        Promise.all([
          this.articleService.getOwnedArticleIds(),
          this.articleService.getBoughtArticles(),
          this.articleService.getArticles()
        ])
          .then(([ownedArticles, boughtArticles, articles]) => {
            console.log('owned aticles ids', ownedArticles);
            console.log('bought articles ids', boughtArticles);
            console.log('articles', articles);

            this.articles = articles;
            this.articles.map(article => {
              article.isBought = !!boughtArticles.find(boughtArticle => boughtArticle == article.articleId) ?? false;
              article.isOwned = !!ownedArticles.find(ownedArticle => ownedArticle == article.articleId) ?? false;
            });
          })
          .finally(() => {
            this.articles = this.articles.reverse();
            console.log('articles after mapping ', this.articles);
          });

      }
    })

  }

}
