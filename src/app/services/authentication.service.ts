import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

 constructor(private storage: Storage, private plt: Platform, private http:Http) {
   this.plt.ready().then(() => { this.checkToken();
   });
 }

 login(values){
   //console.log (values);
  return this.http.post('api/authenticate',
   JSON.stringify(values))
   .subscribe(response => { console.log(response)
   });
  }

 checkToken() {
   this.storage.get(TOKEN_KEY).then(res => {
     if (res) {
       this.authenticationState.next(true);
     }
   })
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

}
