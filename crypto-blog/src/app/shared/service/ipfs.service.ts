import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {create} from 'ipfs-http-client'

@Injectable({
  providedIn: 'root'
})
export class IpfsService implements OnInit {

  ipfs: any;

  private static readonly HOST = '127.0.0.1';
  private static readonly PORT = 5001;
  private static readonly PROTOCOL = 'http';


  constructor() {
    this.ipfs = create({host: IpfsService.HOST, port: IpfsService.PORT, protocol: IpfsService.PROTOCOL});
  }

  ngOnInit(): void {
  }

  async fetchFromIPFS(cid) {
    console.log('fetch from cid:', cid);
    try {
      const stream = this.ipfs.cat(cid);
      let data = '';

      for await (const chunk of stream) {
        let decoder = new TextDecoder('utf-8');
        data += decoder.decode(chunk);
      }

      console.log(data);
      return data;
    } catch (err) {
      console.error('Error while fetching data from IPFS:', err);
    }
    return null;
  }


  uploadText(title: string, text: string, price: number): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        console.log('text', text);

        let previewArticleJson = {
          previewContent: text.substring(0,250),
        }

        const previewAddedContent = await this.ipfs.add({content: JSON.stringify(previewArticleJson)});

        let articleJson = {
          title: title,
          content: text,
          price: price,
          previewIpfsHash: previewAddedContent.path
        }

        console.log('articleJson', JSON.stringify(articleJson))
        const addedArticle = await this.ipfs.add({content: JSON.stringify(articleJson)});
        console.log('Added preview text CID:', previewAddedContent.path);
        console.log('Added  text CID:', addedArticle.path);
        console.log("text from article CID:", await this.fetchFromIPFS(previewAddedContent.path));
        console.log("preview text from CID:", await this.fetchFromIPFS(addedArticle.path));
        resolve([addedArticle.path, previewAddedContent.path]);
      } catch (err) {
        console.error('Failed to add text:', err);
      }

      reject();
    })
  }

}
