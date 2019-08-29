import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetbrandsService } from 'src/app/services/getbrands.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
var BrandsPage = /** @class */ (function () {
    function BrandsPage(getbrands, router, listingdetails, sellerdetails) {
        this.getbrands = getbrands;
        this.router = router;
        this.listingdetails = listingdetails;
        this.sellerdetails = sellerdetails;
    }
    BrandsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.brandlistings = this.getbrands.getAll()
            .subscribe(function (response) {
            _this.brandlistings = response;
            console.log(_this.brandlistings);
        });
    };
    BrandsPage.prototype.onGoToListingDetail = function (listing) {
        this.listingdetails.id = listing;
        this.sellerdetails.id = listing;
        console.log(listing);
        this.router.navigate(['/addetails']);
    };
    BrandsPage = tslib_1.__decorate([
        Component({
            selector: 'app-brands',
            templateUrl: './brands.page.html',
            styleUrls: ['./brands.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GetbrandsService, Router, ListingdetailsService,
            SellerdetailsService])
    ], BrandsPage);
    return BrandsPage;
}());
export { BrandsPage };
//# sourceMappingURL=brands.page.js.map