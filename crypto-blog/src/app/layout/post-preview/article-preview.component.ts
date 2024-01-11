import {Component, Input, OnInit} from '@angular/core';
import {ArticlePreviewData} from "src/app/shared/model/article-preview-data";
import {Web3Service} from "../../shared/service/web3.service";

@Component({
  selector: 'app-post-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

  @Input()
  articlePreview: ArticlePreviewData;


  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
    console.log('articlePreview', this.articlePreview);
  }

  convertToEth(price: number) {
    return this.web3Service.getValueInEth(price);
  }
}
