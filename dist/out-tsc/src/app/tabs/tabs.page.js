import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
var TabsPage = /** @class */ (function () {
    function TabsPage(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    TabsPage.prototype.checkstatus = function (credentials) {
        //this.authService.login.subscribe(state => {
        //console.log(state);
        console.log(this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/tabs/tab4']);
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    TabsPage = tslib_1.__decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map