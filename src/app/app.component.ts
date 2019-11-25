import { Component } from '@angular/core';


export interface Tab {
  name: string;
}

@Component({
    templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  selector: 'my-app'
  })
export class AppComponent {
  tabs: Tab[];
  newCounter = 0; // the number of times "newTabs" has been called
  private _tabNameCounter = 1; // used to create distinct tab names

  constructor() {
    this.newTabs();
  }

  private _makeTabName() {
    return `Tabulation ${this._tabNameCounter++}`;
  }

  newTabs(sameNames = true) {
    this.newCounter++;
    if (sameNames) {
      this._tabNameCounter = 1;
    }
    this.tabs = [
      {name: this._makeTabName()},
      {name: this._makeTabName()},
      {name: this._makeTabName()}
    ];
  }

  newTabsChangeNames() {
    this.newTabs(false);
  }
}



