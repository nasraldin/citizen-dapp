import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'citizen-dapp';

  ethEnabled(): boolean {
    if (window.ethereum && window.ethereum.isMetaMask) {
      return true;
    }

    return false;
  }
}
