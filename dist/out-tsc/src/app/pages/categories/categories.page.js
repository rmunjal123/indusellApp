import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(getcategories, router) {
        this.getcategories = getcategories;
        this.router = router;
        this.listings = [];
    }
    CategoriesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.category = this.getcategories.getAll()
            .subscribe(function (response) {
            _this.category = response;
            console.log(_this.category);
        });
    };
    CategoriesPage = tslib_1.__decorate([
        Component({
            selector: 'app-categories',
            templateUrl: './categories.page.html',
            styleUrls: ['./categories.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService, Router])
    ], CategoriesPage);
    return CategoriesPage;
}());
export { CategoriesPage };
// onGoToListingDetail(listing){
//   this.getcategoriesService.currentlisting = listing;
//   this.router.navigate(['/addetails']);
// }
//# sourceMappingURL=categories.page.js.map