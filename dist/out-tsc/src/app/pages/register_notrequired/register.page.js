import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(speechRecognition, plt) {
        this.speechRecognition = speechRecognition;
        this.plt = plt;
        this.isRecording = false;
    }
    RegisterPage.prototype.getPermission = function () {
        var _this = this;
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) {
            if (!hasPermission) {
                _this.speechRecognition.requestPermission();
            }
        });
    };
    RegisterPage.prototype.startListening = function () {
        var _this = this;
        var options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options)
            .subscribe(function (matches) { _this.matches = matches; });
        this.isRecording = true;
    };
    RegisterPage.prototype.stopListening = function () {
        var _this = this;
        this.speechRecognition.stopListening().then(function () {
            _this.isRecording = false;
        });
    };
    RegisterPage.prototype.IsIos = function () {
        return this.plt.is('ios');
    };
    // Check feature available
    RegisterPage.prototype.isavailable = function () {
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) { return console.log(available); });
    };
    // Start the recognition process
    RegisterPage.prototype.startrecognition = function (options) {
        this.speechRecognition.startListening(options)
            .subscribe(function (matches) { return console.log(matches); }, function (onerror) { return console.log('error:', onerror); });
    };
    // Stop the recognition process (iOS only)
    RegisterPage.prototype.stoprecognition = function () {
        this.speechRecognition.stopListening();
    };
    // Get the list of supported languages
    RegisterPage.prototype.languagesupported = function () {
        this.speechRecognition.getSupportedLanguages()
            .then(function (languages) { return console.log(languages); }, function (error) { return console.log(error); });
    };
    // Check permission
    RegisterPage.prototype.checkpermissions = function () {
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) { return console.log(hasPermission); });
    };
    // Request permissions
    RegisterPage.prototype.requestpermissions = function () {
        this.speechRecognition.requestPermission()
            .then(function () { return console.log('Granted'); }, function () { return console.log('Denied'); });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SpeechRecognition, Platform])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map