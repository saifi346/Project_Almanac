import { Router } from '@angular/router';
import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  serverErrorMessages: string;

  constructor(public userservice: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    // if(this.userservice.isLoggedIn()){
    //   this.router.navigateByUrl('/userprofile');
    // }
  }

  onSubmit(form: NgForm) {
    this.userservice.login(this.userservice.loginUser).subscribe(
      res => {
        this.userservice.setToken(res['token']);
        this.userservice.setUsername(res['username']);
        if (this.userservice.getUserName().match("admin")) {
          this.userservice.setRole('admin');
        }
        else {
          this.userservice.setRole('user');
        }
        this.router.navigateByUrl('home');
      },
      err => {
        if (err.status === 400) {
          this.serverErrorMessages = err.error.message;
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    )
  }

  signUp(){
    this.router.navigateByUrl('/signup');
  }



}
