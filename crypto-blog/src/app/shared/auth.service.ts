import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Auth, signInWithCustomToken} from '@angular/fire/auth';
import {from} from "rxjs";
import detectEthereumProvider from '@metamask/detect-provider';
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private auth: Auth) {
  }


  public signInWithMetaMask() {
    console.log('signInWithMetaMask');
    let ethereum: any;

    return from(detectEthereumProvider()).pipe(
      // Step 1: Request (limited) access to users ethereum account
      switchMap(async (provider) => {
        if (!provider) {
          throw new Error('Please install MetaMask');
        }
        ethereum = provider;
        console.log(ethereum);

        return await ethereum.request({method: 'eth_requestAccounts'});
      }),
      // Step 2: Retrieve the current nonce for the requested address
      switchMap(() =>
        this.http.get<any>(
          '/api/getNonceToSign/' + ethereum.selectedAddress
        )
      ),
      // Step 3: Get the user to sign the nonce with their private key
      switchMap(
        async (response) =>
          await ethereum.request({
            method: 'personal_sign',
            params: [
              `0x${this.toHex(response.nonce)}`,
              ethereum.selectedAddress,
            ],
          })
      ),
      // Step 4: If the signature is valid, retrieve a custom auth token for Firebase
      switchMap((sig) => {
          let httpParams = new HttpParams();
          httpParams = httpParams.set('address', ethereum.selectedAddress);
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
