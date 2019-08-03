import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
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
            this.currentUser = jwt.decodeToken(token);
        }
    }
    AuthenticationService.prototype.login = function (credentials) {
        var _this = this;
        console.log(credentials);
        return this.http.post('/api/authenticate', JSON.stringify(credentials)).pipe(map(function (response) {
            var result = response.json();
            console.log(result);
            if (result && result.token) {
                localStorage.setItem('token', result.token);
                var jwt = new JwtHelperService();
                _this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
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
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Platform, Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map