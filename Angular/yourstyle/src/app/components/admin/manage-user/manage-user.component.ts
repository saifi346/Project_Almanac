import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  users: any;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.log(err);

      }
    );
  }

  viewUser(user : User){
    
     this.userService.setUsername(user.username);
     this.router.navigateByUrl('/userprofile');
  }

  
  onEdit(user: User){
      this.userService.selectedUser = user;
      this.router.navigateByUrl('/updateprofile')
      
  }

  deleteUser(user: User) {
    this.userService.deleteUserByUsername(user.username).subscribe(
      res => {
        this.ngOnInit();
      },
      err => {
        console.log(err);

      }
    );
  }



}
