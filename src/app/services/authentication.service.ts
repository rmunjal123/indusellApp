import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';




const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userdetails: any;
  currentUserId: any;
  currentUserName: any;
  currentUserPhone: any;
  currentUserEmail: any;
  currentUserVerifiedEmail: any;
  currentUserVerifiedPhone: any;
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      this.currentUserId = jwt.decodeToken(token);
    }
  }

  // login(credentials) { 
  //   console.log(credentials);
  //  return this.http.post('https://www.indusell.com/api/Applogin', JSON.stringify(credentials)).pipe
  //  (map(response => {
  //   let result = response.json();
  //   console.log(result);
  //   if (result && result.token) {
  //     localStorage.setItem('token', result.token);

  //     let jwt = new JwtHelperService();
  //     this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

  //     return this.authenticationState.next(true); 
  //   }
  //   else return this.authenticationState.next(false);
  // }));

  login(credentials) {
    console.log(credentials);
    return this.http.post('https://www.indusell.com/api/Applogin', credentials).pipe
      (map(response => {
        console.log(response);
        if (response['message'] === "Authorised") {
          this.userdetails = response["0"][0];
          this.currentUserId = this.userdetails["id"];
          console.log(this.currentUserId);
          this.currentUserName = this.userdetails["name"];
          this.currentUserPhone = this.userdetails["phone"];
          this.currentUserEmail = this.userdetails["email"];
          this.currentUserVerifiedEmail = this.userdetails["verified_email"];
          this.currentUserVerifiedPhone = this.userdetails["verified_phone"];
          //     localStorage.setItem('token', result.token);

          //     let jwt = new JwtHelperService();
          //     this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

          return this.authenticationState.next(true);
        }
        else return this.authenticationState.next(false);
      }));
  }


  //login() {
  // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
  //   this.authenticationState.next(true);
  //});
  //}



  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  register(credentials) {
    console.log(credentials);
    return this.http.post('https://www.indusell.com/api/Appregister', credentials).pipe
      (map(response => {
        console.log(response);
      }));
  }
}
