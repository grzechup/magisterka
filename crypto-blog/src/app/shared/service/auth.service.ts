import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Auth, signInWithCustomToken} from '@angular/fire/auth';
import {BehaviorSubject, from} from "rxjs";
import detectEthereumProvider from '@metamask/detect-provider';
import {switchMap, tap} from "rxjs/operators";
import Web3 from "web3";
import {WEI} from "src/app/shared/util/globals";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _ethereum: any;
  private _web3: Web3;
  private _balance: number = 0;
  signed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly sessionStorageUserKey = 'ethUserCryptoBlog';

  get ethereum() {
    return this._ethereum;
  }

  get address() {
    return this._ethereum.selectedAddress;
  }

  get web3() {
    return this._web3;
  }

  get balance() {
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
        this.signed.next(true);
        this._web3 = new Web3(this.ethereum);

        this._web3.eth.getBalance(this.ethereum.selectedAddress).then(balance => {
          this._balance = <any>balance / WEI;
          let user = {
            address: this.ethereum.selectedAddress,
            balance: this._balance
          }
          sessionStorage.setItem(this.sessionStorageUserKey, JSON.stringify(user));
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


/*  checkSession() {
    let user = JSON.parse(sessionStorage.getItem(this.sessionStorageUserKey));
    if (!!user) {
      detectEthereumProvider().then(result => {
        switchMap(async (provider) => {
            if (!provider) {
              throw new Error('Please install MetaMask');
            }
            this._ethereum = provider;
            console.log(this._ethereum);
            this.setAddress(user?.address);

            this._web3.eth.getBalance(this.address).then(balance => {
              this._balance = <any>balance / WEI;

            });
          }
        )
      });
    }
  }*/

  logout() {
    this._ethereum = null;
    this._web3 = null;
    this._balance = null;
    this.signed.next(false);
    sessionStorage.removeItem(this.sessionStorageUserKey)
  }
}
