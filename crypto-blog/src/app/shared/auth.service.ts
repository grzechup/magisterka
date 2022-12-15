import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Auth, signInWithCustomToken} from '@angular/fire/auth';
import {from} from "rxjs";
import detectEthereumProvider from '@metamask/detect-provider';
import {switchMap, tap} from "rxjs/operators";
import Web3 from "web3";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _ethereum: any;
  private _web3: Web3;
  isLoggedIn = false;


  get ethereum(){
    return this._ethereum;
  }

  get web3(){
    return this._web3;
  }

  constructor(private http: HttpClient,
              private auth: Auth) {


  }


  public signInWithMetaMask() {
    console.log('signInWithMetaMask');

    return from(detectEthereumProvider()).pipe(
      // Step 1: Request (limited) access to users ethereum account
      switchMap(async (provider) => {
        if (!provider) {
          throw new Error('Please install MetaMask');
        }
        this._ethereum = provider;
        console.log(this._ethereum);
        return await this._ethereum.request({method: 'eth_requestAccounts'});
      }),
      // Step 2: Retrieve the current nonce for the requested address
      switchMap(() =>
        this.http.get<any>(
          '/api/getNonceToSign/' + this._ethereum.selectedAddress
        )
      ),
      // Step 3: Get the user to sign the nonce with their private key
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
      // Step 4: If the signature is valid, retrieve a custom auth token for Firebase
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
      // Step 5: Use the auth token to auth with Firebase
      switchMap(
        async (response) =>
          await signInWithCustomToken(this.auth, response.token)
      ),
      tap(response => {
        this.isLoggedIn = true;
        this._web3 = new Web3(this.ethereum);

        this._web3.eth.getBalance(this.ethereum.selectedAddress).then(balance => console.log('balance', balance));
        console.log('response of signing', response)
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
