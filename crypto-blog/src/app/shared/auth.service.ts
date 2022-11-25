import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth, signInWithCustomToken} from '@angular/fire/auth';
import {from} from "rxjs";
import detectEthereumProvider from '@metamask/detect-provider';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private auth: Auth) {}


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

        return await ethereum.request({ method: 'eth_requestAccounts' });
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
      switchMap((sig) =>
        this.http.post<any>(
          '/api/verifySignedMessage',
          { address: ethereum.selectedAddress, signature: sig }
        )
      ),
      // Step 5: Use the auth token to auth with Firebase
      switchMap(
        async (response) =>
          await signInWithCustomToken(this.auth, response.token)
      )
    );
  }

  private toHex(stringToConvert: string) {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

}
