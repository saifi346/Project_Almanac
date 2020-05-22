import { Login } from './../models/login';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: "http://localhost:8080/api/auth";

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  //Models
  loginUser: Login = {
    username: '',
    password: ''
  };

  selectedUser: User = {
    id: '',
    name: '',
    phone: null,
    address: {
      addressLine: '',
      city: '',
      state: '',
      zipcode: null
    },
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }


  //httpmethods
  postUser(user: User) {
    return this.http.post("http://localhost:8080/api/auth" + '/signup', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post("http://localhost:8080/api/auth" + '/signin', authCredentials, this.noAuthHeader);
  }

  getUserProfile(username) {
    return this.http.get("http://localhost:8080/api/test" + '/user' + `/${username}`);
  }

  getAllUsers() {
    return this.http.get("http://localhost:8080/api/test" + '/users');
  }

  updateUser(user) {
    return this.http.put("http://localhost:8080/api/test" + '/user' + `/${user.username}`, user);
  }

  deleteUserByUsername(username) {
    return this.http.delete("http://localhost:8080/api/test" + '/user' + `/${username}`);
  }



//helpers 
setToken(token: string) {
  localStorage.setItem('token', token);
}

setUsername(username : string){
  localStorage.setItem('username', username);
}

setRole(role : string){
  localStorage.setItem('role', role);
}

getRole() {
  return localStorage.getItem('role');
}

getUserName() {
  return localStorage.getItem('username');
}

getToken() {
  return localStorage.getItem('token');
}

deleteRole(){
  localStorage.removeItem('role');
}

deleteUsername() {
  localStorage.removeItem('username');
}

deleteToken() {
  localStorage.removeItem('token');
}

getUserPayload() {
  var token = this.getToken();
  if (token) {
    var userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload);
  }
  else {
    return null;
  }
}

isLoggedIn() {
  var userPayload = this.getUserPayload();
  if (userPayload) {
    return userPayload.exp > Date.now() / 1000;
  }
  else {
    return false;
  }
}
}
