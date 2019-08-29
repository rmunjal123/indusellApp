import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { BadInput } from 'src/app/services/common/bad-input';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { Router } from '@angular/router';
var SearchPage = /** @class */ (function () {
    function SearchPage(searchservice, listingdetails, sellerdetails, router) {
        this.searchservice = searchservice;
        this.listingdetails = listingdetails;
        this.sellerdetails = sellerdetails;
        this.router = router;
        this.arr = [];
        this.imgforID = [];
        this.displayobj = {};
        this.displayobjarr = [];
    }
    SearchPage.prototype.ngOnInit = function () {
    };
    SearchPage.prototype.onInput = function () {
        var _this = this;
        console.log(this.searchQuery);
        this.searchservice.getAll(this.searchQuery)
            .subscribe(function (response) {
            _this.searchlistings = response;
            console.log(response);
            _this.searchlistings.posts.forEach(function (item) {
                _this.searchlistingid = item.id;
                console.log(item.id);
                _this.arr = _this.searchlistings.pictures;
                _this.imgforID = _this.arr.filter(function (arr) { return arr.id === item.id; });
                console.log(_this.imgforID);
                if (_this.imgforID.length > 0) {
                    _this.displaypic = _this.imgforID[0].filename;
                    _this.displayobj = { id: _this.searchlistingid, displaypic: _this.displaypic };
                    _this.displayobjarr.push(_this.displayobj);
                    console.log(_this.displayobjarr);
                }
            });
            //addlisting['id'] = response.id;
            //this.addlisting.splice(0,0, addlisting);
        }, function (Error) {
            if (Error instanceof BadInput) {
                console.log(Error);
            }
            else
                throw Error;
        });
    };
    SearchPage.prototype.onGoToListingDetail = function (listing) {
        this.listingdetails.id = listing;
        this.sellerdetails.id = listing;
        console.log(listing);
        this.router.navigate(['/addetails']);
    };
    SearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SearchService, ListingdetailsService,
            SellerdetailsService, Router])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.page.js.map