import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Config } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Web3ConfigService {
  static web3Config: Web3Config;

  constructor(private http: HttpClient) {}

  load(): Promise<Web3Config> {
    const jsonFile = `assets/config/abi.json`;

    return new Promise<Web3Config>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((data) => {
          Web3ConfigService.web3Config = data as Web3Config;
          resolve();
        })
        .catch((error: any) => {
          console.error(`Could not load file '${jsonFile}':`, error);
          reject();
        });
    });
  }
}
