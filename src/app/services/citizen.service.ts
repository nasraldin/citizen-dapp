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
    this.web3 = new Web3(
      Web3ConfigService.web3Config.networks.ropsten.provider
    );

    this.web3.eth.accounts.wallet.add(environment.metamask.privateKey);

    this.contract = new this.web3.eth.Contract(
      Web3ConfigService.web3Config.abi,
      Web3ConfigService.web3Config.networks.ropsten.address
    );
  }

  /**
   * Add new citizen
   * smart contract fn addCitizen(age, city, name, someNote)
   * @param citizen citizen
   */
  public async addCitizen(citizen: Citizen): Promise<boolean> {
    const address = environment.metamask.account;
    const privateKey = environment.metamask.privateKey;

    const tx = this.contract.methods.addCitizen(
      citizen.age,
      citizen.city,
      citizen.name,
      citizen.someNote
    );

    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await this.web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(address);

    const signedTx = await this.web3.eth.accounts.signTransaction(
      {
        to: this.contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    try {
      const receipt = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      // console.log(`Transaction hash: ${receipt.transactionHash}`);

      if (receipt) {
        return true;
      }
    } catch (error) {
      // console.error(error);
    }

    return false;
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
