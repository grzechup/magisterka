import {Injectable, OnInit} from "@angular/core";
import {IpfsService} from "./ipfs.service";
import {Web3Service} from "./web3.service";
import {ArticlePreviewData} from "../model/article-preview-data";

@Injectable()
export class ArticleService{

  constructor(private ipfsService: IpfsService,
              private web3Service: Web3Service) {
  }

  createNewArticle(title, text, price){
    this.ipfsService.uploadText(title, text, price).then((ipfsHashes: string[]) => {
      console.log("ipfsHashes", ipfsHashes);
      let creatingNewArticleResult = this.web3Service.createNewArticle(ipfsHashes[0], ipfsHashes[1], price, title);
      console.log('creatingNewArticleResult', creatingNewArticleResult);
    }).catch(err => console.log(err));
  }

  getArticles(): Promise<ArticlePreviewData[]>{
    return new Promise((resolve) => {
      let articles: ArticlePreviewData[] = []
      this.web3Service.getArticles().then(result => {
        console.log('got articles', result);
        result.forEach(async article => {
          let previewJson = await this.ipfsService.fetchFromIPFS(article.previewContentIpfsHash);

          articles.push({
            articleId: article.articleId,
            title: article.title,
            previewText: JSON.parse(previewJson).previewContent
          });
        })
      });
      resolve(articles);
    })
  }


}
