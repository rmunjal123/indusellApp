import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
var Tab4Page = /** @class */ (function () {
    function Tab4Page(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    Tab4Page.prototype.ngOnInit = function () {
    };
    Tab4Page.prototype.myProfilePage = function () {
        this.UserId = this.authService.currentUserId;
        this.router.navigate(['/profile/']);
    };
    Tab4Page.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/tabs/tab1']);
    };
    Tab4Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab4',
            templateUrl: './tab4.page.html',
            styleUrls: ['./tab4.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router])
    ], Tab4Page);
    return Tab4Page;
}());
export { Tab4Page };
//# sourceMappingURL=tab4.page.js.map