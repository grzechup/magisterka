import { Component, OnInit } from '@angular/core';
import {ArticlePreviewData} from "src/app/shared/model/article-preview-data";
import {ArticleService} from "../../shared/service/article.service";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  articles: ArticlePreviewData[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles()
      .then(result => this.articles = result);
  }

}
