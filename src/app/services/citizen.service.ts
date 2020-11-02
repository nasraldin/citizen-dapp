import { Contract, EventData } from 'web3-eth-contract';

import { Citizen } from '../models';
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Web3ConfigService } from './web3-config.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  private web3: Web3;
  private contract: Contract;

  constructor() {
    this.initWeb3();
  }

  /**
   * initialize instance obj of Web3, contract.
   */
  private initWeb3(): void {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);

      this.contract = new this.web3.eth.Contract(
        Web3ConfigService.web3Config.abi,
        environment.address
      );
    } else {
      alert('Please install MetaMask extension to use this DApp!');
    }
  }

  /**
   * Add new citizen
   * smart contract fn addCitizen(age, city, name, someNote)
   * @param citizen citizen
   */
  public async addCitizen(citizen: Citizen): Promise<boolean> {
    const address = await this.getAccount();

    const receipt = await this.contract.methods
      .addCitizen(citizen.age, citizen.city, citizen.name, citizen.someNote)
      .send({ from: address });

    if (receipt) {
      return true;
    }

    return false;
  }

  async getAccount(): Promise<string> {
    let account: string;

    if (window.ethereum) {
      await window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((result) => {
          account = result[0];
        })
        .catch((err) => {
          if (err.code === 4001) {
            alert('Please connect with MetaMask to sending transactions');
          }
        });

      return account;
    }

    return undefined;
  }

  /**
   * Return someNote from citizen
   * @param citizenId person id
   */
  public async getNoteByCitizenId(citizenId: number): Promise<string> {
    return await this.contract.methods
      .getNoteByCitizenId(citizenId)
      .call()
      .then((value: string) => {
        return value;
      });
  }

  /**
   * Retrun citizens list
   * @returns A Promise of list.
   */
  public async getCitizens(): Promise<Citizen[]> {
    let returnValues: Citizen[] = [];

    await this.contract.getPastEvents(
      'allEvents',
      {
        fromBlock: 0,
        toBlock: 'latest',
      },
      (error, events) => {
        if (error) {
          return null;
        }

        returnValues = this.assignProps(events);
      }
    );

    return returnValues;
  }

  private assignProps(events: EventData): Citizen[] {
    const citizen: Citizen[] = [];

    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        const element = events[key];
        citizen.push({
          id: element.returnValues.id,
          age: element.returnValues.age,
          city: element.returnValues.city,
          name: element.returnValues.name,
        });
      }
    }

    return citizen;
  }
}
