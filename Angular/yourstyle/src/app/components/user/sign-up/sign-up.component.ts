import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  constructor(public userservice: UserServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userservice.postUser(this.userservice.selectedUser).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 400) {
          this.serverErrorMessages = err.error.message;
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
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
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
