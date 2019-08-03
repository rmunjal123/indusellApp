import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(getcategoriesService, router) {
        this.getcategoriesService = getcategoriesService;
        this.router = router;
        this.listings = [];
    }
    CategoriesPage.prototype.ngOnInit = function () {
        this.category = this.getcategoriesService.currentcategory;
        console.log(this.category);
    };
    CategoriesPage.prototype.onGoToListingDetail = function (listing) {
        this.getcategoriesService.currentlisting = listing;
        this.router.navigate(['/addetails']);
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
//# sourceMappingURL=categories.page.js.map