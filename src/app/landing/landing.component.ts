import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { User } from '../models/user';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  id: string;
  username;
  password;
  email;
  firstName;
  lastName;
  loginError;
  constructor(private landingService: LandingService, private router:Router) { }

  ngOnInit(): void {
    //make request to backend with
    /*if the browser's local storage has a key named "isLoggedIn" and it's value is true, send them to the /community page
     *
    */
    if (localStorage.getItem("token") !== null){
      //add method to validate that the user is actually logged in and did not simply change the values in localstorage
      if(this.checkStatus)
      {
        this.router.navigate(['/community']);
      }
    }
  }
  //used for user login
  validateUser(){
    if (this.username && this.password) {
      this.landingService.login2(this.username, this.password).subscribe(data=>{
        console.log('logging in', data)
        if (data) {

          // Here you store the token
          localStorage.setItem("token", data.token);
          
          localStorage.setItem("userId", data.id.toString(10));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username);
          localStorage.setItem("role",data.role[0]);
          document.getElementById("close-modal").click();
          
              this.router.navigate(['/community']);
          
         
            
          
        
        } else {
          this.loginError = 'Username and password does not match';
        }
      });
    }
  }
  //used for user creation
  createUser(){
    let user: User = new User();
    user.username = this.username;
    user.password = this.password;
    user.email = this.email;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    this.landingService.register(user).subscribe(data=> {
      alert("Successfully registered! You may now log in.");
    });
    this.username = "";
    this.password = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    
  }

  checkStatus():boolean
  {
    //make an HTTP request to check if the JWT is valid 
    return true;
  }
}

