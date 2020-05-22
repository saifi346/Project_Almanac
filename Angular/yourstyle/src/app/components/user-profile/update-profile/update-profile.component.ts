import { Router } from '@angular/router';
import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public userservice: UserServiceService, private router: Router) { }

  ngOnInit(): void {
      }

  onSubmit(from: NgForm) {
    this.userservice.updateUser(this.userservice.selectedUser).subscribe(
      res => {
        this.resetUserDetails();
        this.router.navigateByUrl('/manageusers');
      },
      err => {
        console.log(err);
      }
    );
  }

  resetUserDetails() {
    this.userservice.selectedUser = {
      id: '',
      name: '',
      phone: null,
      address: {
        addressLine : '',
        city : '',
        state : '',
        zipcode : null
      },
      username: '',
      email: '',
      password: ''
    };
  }
}
