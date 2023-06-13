import {Component, Input, OnInit} from '@angular/core';
import {ArticlePreviewData} from "src/app/shared/model/article-preview-data";

@Component({
  selector: 'app-post-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

  @Input()
  articlePreview: ArticlePreviewData;


  constructor() { }

  ngOnInit(): void {
    console.log('articlePreview', this.articlePreview);
  }

}
