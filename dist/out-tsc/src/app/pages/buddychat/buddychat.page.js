import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as firebase from 'firebase';
var BuddychatPage = /** @class */ (function () {
    function BuddychatPage() {
        this.username = '';
        this.othersellername = '';
        this.message = '';
        this.chatroom = '';
        this.buddymessages = [];
        this.firebuddychats = firebase.database().ref('/buddychats');
    }
    BuddychatPage.prototype.ngOnInit = function () {
    };
    BuddychatPage = tslib_1.__decorate([
        Component({
            selector: 'app-buddychat',
            templateUrl: './buddychat.page.html',
            styleUrls: ['./buddychat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], BuddychatPage);
    return BuddychatPage;
}());
export { BuddychatPage };
//# sourceMappingURL=buddychat.page.js.map