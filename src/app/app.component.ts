import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn:boolean= false;

  title: string = "Revature Community";

  constructor() {}
  ngAfterViewChecked(){
    this.isLoggedIn = (localStorage.getItem("isLoggedIn") === "true");
  }
}
