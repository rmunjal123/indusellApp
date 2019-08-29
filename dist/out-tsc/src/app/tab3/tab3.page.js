import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(db, authservice, sellerdetails, event, zone) {
        var _this = this;
        this.db = db;
        this.authservice = authservice;
        this.sellerdetails = sellerdetails;
        this.event = event;
        this.zone = zone;
        this.username = '';
        this.othersellername = '';
        this.message = '';
        this.chatroom = '';
        this.buddymessages = [];
        this.firebuddychats = firebase.database().ref('/buddychats');
        this.buddy = 'buddy';
        this.allmessages = [];
        this.allmessages = [];
        this.username = this.authservice.currentUserName;
        console.log(this.username);
        this.othersellername = this.sellerdetails.seller_name;
        this.event.subscribe('newmessage', function () {
            //  this.zone.run(() => {
            _this.allmessages = _this.buddymessages;
            console.log(_this.allmessages);
        });
        // })
    }
    // initializebuddy(buddy){
    //   this.buddy = buddy;
    Tab3Page.prototype.initializebuddy = function () {
        this.buddy = "buddy";
        // return this.buddy;
    };
    Tab3Page.prototype.sendMessage = function (msg) {
        var _this = this;
        console.log(this.buddy);
        if (this.buddy) {
            var promise = new Promise(function (resolve, reject) {
                //  this.firebuddychats.child(this.username).child(this.othersellername).push({
                _this.firebuddychats.child(_this.username).child(_this.buddy).push({
                    username: _this.username,
                    message: _this.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function () {
                    // this.firebuddychats.child(this.othersellername).child(this.username).push({
                    _this.firebuddychats.child(_this.buddy).child(_this.username).push({
                        username: _this.username,
                        message: _this.message,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(function () {
                        resolve(true);
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });
            return promise;
        }
        // this.db.list('/'+this.username +'-'+ this.othersellername).push({
        //   username: this.username,
        //   message: this.message,
        //   timestamp: firebase.database.ServerValue.TIMESTAMP
        // })
    };
    Tab3Page.prototype.addmessage = function () {
        var _this = this;
        this.sendMessage(this.newmessage).then(function () {
            _this.newmessage = '';
        });
    };
    Tab3Page.prototype.ionViewDidEnter = function () {
        this.getbuddymessages();
    };
    Tab3Page.prototype.getbuddymessages = function () {
        var msg;
        var key;
        this.buddymessages = [];
        this.firebuddychats.child(this.username).child(this.buddy).on('value', function (snapshotChanges) {
            msg = snapshotChanges.val();
            key = snapshotChanges.key;
            console.log(snapshotChanges.val());
            console.log(snapshotChanges.key);
            for (var tempkey in msg) {
                this.buddymessages.push(msg[tempkey]);
                console.log(this.buddymessages);
                this.event.publish('newmessage');
            }
            //return(this.buddymessages)
        });
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase, AuthenticationService,
            SellerdetailsService, Events, NgZone])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map