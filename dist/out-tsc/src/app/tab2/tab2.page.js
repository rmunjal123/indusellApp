import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(speechRecognition, plt) {
        this.speechRecognition = speechRecognition;
        this.plt = plt;
        this.isRecording = false;
    }
    Tab2Page.prototype.getPermission = function () {
        var _this = this;
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) {
            if (!hasPermission) {
                _this.speechRecognition.requestPermission();
            }
        });
    };
    Tab2Page.prototype.startListening = function () {
        var _this = this;
        var options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options)
            .subscribe(function (matches) { _this.matches = matches; });
        this.isRecording = true;
    };
    Tab2Page.prototype.stopListening = function () {
        var _this = this;
        this.speechRecognition.stopListening().then(function () {
            _this.isRecording = false;
        });
    };
    Tab2Page.prototype.IsIos = function () {
        return this.plt.is('ios');
    };
    // Check feature available
    Tab2Page.prototype.isavailable = function () {
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) { return console.log(available); });
    };
    // Start the recognition process
    Tab2Page.prototype.startrecognition = function (options) {
        this.speechRecognition.startListening(options)
            .subscribe(function (matches) { return console.log(matches); }, function (onerror) { return console.log('error:', onerror); });
    };
    // Stop the recognition process (iOS only)
    Tab2Page.prototype.stoprecognition = function () {
        this.speechRecognition.stopListening();
    };
    // Get the list of supported languages
    Tab2Page.prototype.languagesupported = function () {
        this.speechRecognition.getSupportedLanguages()
            .then(function (languages) { return console.log(languages); }, function (error) { return console.log(error); });
    };
    // Check permission
    Tab2Page.prototype.checkpermissions = function () {
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) { return console.log(hasPermission); });
    };
    // Request permissions
    Tab2Page.prototype.requestpermissions = function () {
        this.speechRecognition.requestPermission()
            .then(function () { return console.log('Granted'); }, function () { return console.log('Denied'); });
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [SpeechRecognition, Platform])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map