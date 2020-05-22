import { User } from './../../models/user';
import { Router } from '@angular/router';
import { UserServiceService } from './../../service/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails : any;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile(this.userService.getUserName()).subscribe(
      res => {
        this.userDetails = res;
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onEdit(user: User){
    this.userService.selectedUser = user;
    this.router.navigateByUrl('/updateprofile')
    
}



}
