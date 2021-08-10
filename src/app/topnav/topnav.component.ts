import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ValidationServiceService } from '../validation.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(private validationService: ValidationServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  currentUser:User | any;
  username = '';
  password = '';

validateUser() {
  this.validationService
    .validateUser(this.username, this.password)
    .subscribe((data) => {
      this.currentUser = data;
      if(this.currentUser != null) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.currentUser.username);
        alert("Logged In Successfully");
        //this.router.navigate('/landing');
      }else{
        alert("Invalid username or password, please try again.")
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}