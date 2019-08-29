import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
var TOKEN_KEY = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storage, plt, http) {
        this.storage = storage;
        this.plt = plt;
        this.http = http;
        this.authenticationState = new BehaviorSubject(false);
        var token = localStorage.getItem('token');
        if (token) {
            var jwt = new JwtHelperService();
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
    AuthenticationService.prototype.login = function (credentials) {
        var _this = this;
        console.log(credentials);
        return this.http.post('https://www.indusell.com/api/Applogin', credentials).pipe(map(function (response) {
            console.log(response);
            if (response['message'] === "Authorised") {
                _this.userdetails = response["0"][0];
                _this.currentUserId = _this.userdetails["id"];
                console.log(_this.currentUserId);
                _this.currentUserName = _this.userdetails["name"];
                _this.currentUserPhone = _this.userdetails["phone"];
                _this.currentUserEmail = _this.userdetails["email"];
                _this.currentUserVerifiedEmail = _this.userdetails["verified_email"];
                _this.currentUserVerifiedPhone = _this.userdetails["verified_phone"];
                //     localStorage.setItem('token', result.token);
                //     let jwt = new JwtHelperService();
                //     this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
                return _this.authenticationState.next(true);
            }
            else
                return _this.authenticationState.next(false);
        }));
    };
    //login() {
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    //});
    //}
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.register = function (credentials) {
        console.log(credentials);
        return this.http.post('https://www.indusell.com/api/Appregister', credentials).pipe(map(function (response) {
            console.log(response);
        }));
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Platform, HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map