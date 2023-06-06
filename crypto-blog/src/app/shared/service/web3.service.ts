import { Injectable } from '@angular/core';
import {AuthService} from "src/app/shared/service/auth.service";


@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor(private authService: AuthService) {

  }

}

