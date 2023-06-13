import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {environment} from "../../../environments/environment";


declare let window: any;

@Injectable()
export class Web3Service {
  private web3: Web3;
  private contract: any;
  private contractAddress = environment.contractAddress;
  private contractABI: any = environment.abi;

  private web3Provider = 'http://localhost:8545';

  constructor() {
    this.checkAndInstantiateWeb3();
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    console.log('this.contract', this.contract);
  }

  private checkAndInstantiateWeb3() {
    this.web3 = new Web3('http://localhost:8545');

    /*    if (window.ethereum) {
          this.web3 = new Web3('http://localhost:8545');
          window.ethereum.enable();
        }
        else if (window.web3) {
          this.web3 = new Web3(window.web3.currentProvider);
        }
        else {
          throw new Error('Non-Ethereum browser detected. Please install MetaMask');
        }*/
  }

  private getValueInWei(value){
    return Web3.utils.toWei(value, "ether");
  }

  public async createNewArticle(contentIpfsHash: string, previewContentIpfsHash: string, price: any, title: string) {
    const accounts = await this.web3.eth.getAccounts();
    return await this.contract.methods.createNewArticle(contentIpfsHash, previewContentIpfsHash, this.getValueInWei(price), title).send({ from: accounts[0] });
  }

  public async getOwnedArticles() {
    const accounts = await this.web3.eth.getAccounts();
    return await this.contract.methods.getOwnedArticles().call({ from: accounts[0] });
  }

  public async getBoughtArticles() {
    const accounts = await this.web3.eth.getAccounts();
    return await this.contract.methods.getBoughtArticles().call({ from: accounts[0] });
  }

  public async getArticles() {
    return await this.contract.methods.getArticles().call();
  }

  public async buyArticle(articleId: number, price: number) {
    const accounts = await this.web3.eth.getAccounts();
    return await this.contract.methods.buyArticle(articleId).send({ from: accounts[0], value: price });
  }

  public async getArticle(articleId: number) {
    const accounts = await this.web3.eth.getAccounts();
    return await this.contract.methods.getArticle(articleId).call({ from: accounts[0] });
  }
}
