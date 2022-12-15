import { Injectable } from '@angular/core';
import {} from 'web3';
import {AuthService} from "src/app/shared/auth.service";


@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor(private authService: AuthService) {



  }

  getAccountBalance() {
/*    this.authService.web3.fromWei(
      this.authService.web3.eth.getBalance(this.authService.ethereum.selectedAddress));*/
  }
}
