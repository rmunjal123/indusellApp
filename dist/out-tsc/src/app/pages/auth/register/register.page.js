import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PasswordValidator } from '../validators/password.validator';
import { EmailValidator } from '../validators/email.validator';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.registerform = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                Validators.email,
                EmailValidator.shouldBeUnique
            ]),
            terms: new FormControl(true, Validators.pattern('true'))
        });
        this.validation_messages = {
            'name': [
                { type: 'required', message: 'Name is required.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' },
                { type: 'shouldBeUnique', message: 'Email already exists.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required' }
            ],
            'matching_passwords': [
                { type: 'areEqual', message: 'Password mismatch' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
        };
    }
    RegisterPage.prototype.ionViewWillLoad = function () {
        this.matching_passwords_group = new FormGroup({
            password: new FormControl('', [
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ]),
            confirm_password: new FormControl('', Validators.required)
        }, function (formGroup) {
            return PasswordValidator.areEqual(formGroup);
        });
    };
    RegisterPage.prototype.onSubmit = function (values) {
        this.navCtrl.navigateForward('src/app/tab3/tab3.page');
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map