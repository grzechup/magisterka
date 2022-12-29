import {Component, OnInit} from '@angular/core';
import {AuthService} from "src/app/shared/auth.service";
import {Web3Service} from "src/app/shared/web3.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  balance: number;

  constructor(public authService: AuthService,
              public web3Service: Web3Service) {
  }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signInWithMetaMask()
      .subscribe(() => {});


  }
}
