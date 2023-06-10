import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { create } from 'ipfs-http-client'

@Injectable({
  providedIn: 'root'
})
export class IpfsService implements OnInit{

  ipfs: any;

  private static readonly HOST = '127.0.0.1';
  private static readonly PORT = 5001;
  private static readonly PROTOCOL = 'http';


  constructor() {
    this.ipfs = create({ host: IpfsService.HOST, port: IpfsService.PORT, protocol: IpfsService.PROTOCOL });
  }

  ngOnInit(): void {
  }

  async fetchFromIPFS(cid) {
    try {
      const stream = this.ipfs.cat(cid);
      let data = '';

      for await (const chunk of stream) {
        let decoder = new TextDecoder('utf-8');
        data += decoder.decode(chunk);
      }

      console.log(data);
    } catch (err) {
      console.error('Error while fetching data from IPFS:', err);
    }
  }


  async uploadText(title: string, text: string, price: number) {
    console.log('this.ipfs', this.ipfs);
    console.log('text', text);

    let articleJson = {
      title: title,
      content: text,
      price: price
    }

    console.log('articleJson', JSON.stringify(articleJson))
    try {
      const added = await this.ipfs.add({ content: JSON.stringify(articleJson) });
      console.log('Added text CID:', added.path);
      console.log('details:', added);
      console.log("text from CID:", this.fetchFromIPFS(added.path));
    } catch (err) {
      console.error('Failed to add text:', err);
    }
  }

  onTextSubmit(title: string, text: string, price: number) {
    this.uploadText(title, text, price);
  }
}
