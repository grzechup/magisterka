import {Injectable, OnInit} from "@angular/core";
import {IpfsService} from "./ipfs.service";
import {Web3Service} from "./web3.service";
import {ArticlePreviewData} from "../model/article-preview-data";
import {ArticleData} from "../model/article-data";

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

  async getArticles(): Promise<ArticlePreviewData[]> {
    const articles: ArticlePreviewData[] = await this.web3Service.getArticles();

    const articlePromises = articles.map(async (article: any ) => {
      const previewJson = await this.ipfsService.fetchFromIPFS(article.previewContentIpfsHash);
      return {
        articleId: article.articleId,
        title: article.title,
        previewText: JSON.parse(previewJson).previewContent,
        price: article.price
      };
    });

    const resolvedArticles = await Promise.all(articlePromises);

    return resolvedArticles;
  }

  getArticle(articleId: number): Promise<ArticleData>{
    return new Promise((resolve) => {
      let article: ArticleData = new ArticleData();
      this.web3Service.getArticle(articleId).then(async result => {
        console.log('got article', result);
        console.log('result.article', result.article);
        article.articleId = articleId;
        article.title = result.article.title;
        article.authorAddress = result.article.owner;
        article.dateAdded = result.article.publishTime;
        article.price = result.article.price;
        article.previewText = JSON.parse(await this.ipfsService.fetchFromIPFS(result.article.previewContentIpfsHash)).previewContent;
        if(result.ipfsHash.length > 0) {
          article.fullText = JSON.parse(await this.ipfsService.fetchFromIPFS(result.ipfsHash)).content;
        }
        resolve(article);
      });
    })
  }

  getOwnedArticleIds(): Promise<number[]>{
    return new Promise((resolve) => {
      this.web3Service.getOwnedArticles().then(async result => {
        console.log('owned articles', result);
        let articles = [];
        result.forEach(article => {
          articles.push(article.articleId);
        })
        resolve(articles);
      })
    })
  }

  getBoughtArticles(): Promise<number[]>{
    return new Promise((resolve) => {
      this.web3Service.getBoughtArticles().then(async result => {
        console.log('bought articles', result);
        let articles = [];
        result.forEach(article => {
          articles.push(article.articleId);
        })
        resolve(articles);
      })
    })
  }


  buyArticle(articleId, price) {
    return new Promise((resolve) => {
      this.web3Service.buyArticle(articleId, price).then(result => {

        console.log('result', result);
        resolve(result);
      })
    })

  }
}
