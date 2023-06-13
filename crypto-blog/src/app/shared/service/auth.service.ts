import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Auth, signInWithCustomToken} from '@angular/fire/auth';
import {from} from "rxjs";
import detectEthereumProvider from '@metamask/detect-provider';
import {switchMap, tap} from "rxjs/operators";
import Web3 from "web3";
import {WEI} from "src/app/shared/util/globals";


@Injectable({
  providedIn: 'root'
})
export class AuthService{


  private _ethereum: any;
  private _web3: Web3;
  private _balance: number = 0;

  isLoggedIn = false;


  get ethereum(){
    return this._ethereum;
  }

  get address(){
    return this._ethereum.selectedAddress;
  }

  get web3(){
    return this._web3;
  }

  get balance(){
    return this._balance;
  }

  constructor(private http: HttpClient,
              private auth: Auth) {
  }


  public signInWithMetaMask() {
    return from(detectEthereumProvider()).pipe(
      switchMap(async (provider) => {
        if (!provider) {
          throw new Error('Please install MetaMask');
        }
        this._ethereum = provider;
        console.log(this._ethereum);
        return await this._ethereum.request({method: 'eth_requestAccounts'});
      }),
      switchMap(() =>
        this.http.get<any>(
          '/api/getNonceToSign/' + this._ethereum.selectedAddress
        )
      ),
      switchMap(
        async (response) =>
          await this._ethereum.request({
            method: 'personal_sign',
            params: [
              `0x${this.toHex(response.nonce)}`,
              this._ethereum.selectedAddress,
            ],
          })
      ),
      switchMap((sig) => {
          let httpParams = new HttpParams();
          httpParams = httpParams.set('address', this._ethereum.selectedAddress);
          httpParams = httpParams.set('signature', sig);
          return this.http.get<any>(
            '/api/verifySignedMessage',
            {params: httpParams}
          )
        }
      ),
      switchMap(
        async (response) =>
          await signInWithCustomToken(this.auth, response.token)
      ),
      tap(() => {
        this.isLoggedIn = true;
        this._web3 = new Web3(this.ethereum);

        this._web3.eth.getBalance(this.ethereum.selectedAddress).then(balance => {
          this._balance = <any> balance / WEI;
        });
      })
    );
  }

  private toHex(stringToConvert: string) {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }



}
