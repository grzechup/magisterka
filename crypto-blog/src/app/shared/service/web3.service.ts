import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {environment} from "../../../environments/environment";
import {activate} from "@angular/fire/remote-config";
import {AuthService} from "./auth.service";
import {ethers} from "ethers";


declare let window: any;

@Injectable()
export class Web3Service {
  private web3: Web3;
  private contract: any;
  private contractAddress = environment.contractAddress;
  private contractABI: any = environment.abi;

  private web3Provider = 'http://localhost:8545';

  account: any;

  constructor(private authService: AuthService) {
    this.web3 = new Web3(this.web3Provider);

    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    console.log('this.contract', this.contract);
  }

  getValueInWei(value){
    return Web3.utils.toWei(value, "ether");
  }

  getValueInEth(value){
    return Web3.utils.fromWei(value);
  }

  public async createNewArticle(contentIpfsHash: string, previewContentIpfsHash: string, price: any, title: string) {
    return await this.contract.methods.createNewArticle(contentIpfsHash, previewContentIpfsHash, this.getValueInWei(price), title).send({ from: this.authService.ethereum?.selectedAddress });
  }

  public async getOwnedArticles() {
    return await this.contract.methods.getOwnedArticles().call({ from: this.authService.ethereum?.selectedAddress });
  }

  public async getBoughtArticles() {
    return await this.contract.methods.getBoughtArticles().call({ from: this.authService.ethereum?.selectedAddress });
  }

  public async getArticles() {
    return await this.contract.methods.getArticles().call();
  }

  public async buyArticle(articleId: number, price: any) {
    let confirmation = confirm("Are you sure you want to buy this article?");
    event.preventDefault();
    if(confirmation) {
      console.log('by article')
      return await this.contract.methods.buyArticle(articleId)
        .send({from: this.authService.ethereum?.selectedAddress, value: price});

    }
  }

  public async getArticle(articleId: number) {
    return await this.contract.methods.getArticle(articleId).call({ from: this.authService.ethereum?.selectedAddress });
  }
}
