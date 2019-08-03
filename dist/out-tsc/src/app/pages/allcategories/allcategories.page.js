import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { Router } from '@angular/router';
var AllcategoriesPage = /** @class */ (function () {
    function AllcategoriesPage(getcategoriesService, router) {
        this.getcategoriesService = getcategoriesService;
        this.router = router;
        this.listings = [];
        this.data = [];
        this.sliderConfig = {
            spaceBetween: 10,
            centeredSlides: false,
            slidesPerView: 2.4
        };
    }
    AllcategoriesPage.prototype.ngOnInit = function () {
        this.listings = this.getcategoriesService.getListings();
    };
    AllcategoriesPage.prototype.loadData = function (event) {
        var _this = this;
        console.log(event);
        setTimeout(function () {
            console.log('Done');
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.data.length == 1000) {
                event.target.disabled = true;
            }
        }, 5000);
    };
    AllcategoriesPage.prototype.onGoToListingDetail = function (listing) {
        this.getcategoriesService.currentlisting = listing;
        this.router.navigate(['/addetails']);
    };
    AllcategoriesPage = tslib_1.__decorate([
        Component({
            selector: 'app-allcategories',
            templateUrl: './allcategories.page.html',
            styleUrls: ['./allcategories.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService, Router])
    ], AllcategoriesPage);
    return AllcategoriesPage;
}());
export { AllcategoriesPage };
//# sourceMappingURL=allcategories.page.js.map