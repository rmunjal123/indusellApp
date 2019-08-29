import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GetcategoriesService } from '../services/getcategories.service';
import { Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { NotFoundError } from '../services/common/not-found-error';
import { ListingdetailsService } from '../services/listingdetails.service';
import { SellerdetailsService } from '../services/sellerdetails.service';
import { GetbrandsService } from '../services/getbrands.service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(getcategories, router, newlistings, listingdetails, sellerdetails, getbrands) {
        this.getcategories = getcategories;
        this.router = router;
        this.newlistings = newlistings;
        this.listingdetails = listingdetails;
        this.sellerdetails = sellerdetails;
        this.getbrands = getbrands;
        this.categories = [];
        this.data = [];
        this.arr = [];
        this.ratingarr = [];
        this.imgforID = [];
        this.displayobj = {};
        this.displayobjarr = [];
        this.bannerarr = {};
        this.sliderConfig_Category = {
            spaceBetween: 0,
            centeredSlides: false,
            slidesPerView: 2.4
        };
        this.sliderConfig_Brand = {
            spaceBetween: 0,
            centeredSlides: false,
            slidesPerView: 3.4
        };
        // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
        this.slideOpts = {
            initialSlide: 1,
            speed: 5000
        };
    }
    Tab1Page.prototype.ngOnInit = function () {
        //this.listings[10] = this.newlistings.getlisting();
        //this.categories = this.getcategoriesService.getCategories();
        //console.log(this.categories);
        var _this = this;
        this.newlistings.getAll()
            .subscribe(function (response) {
            _this.listings = response;
            console.log(_this.listings);
            _this.bannerarr = _this.listings.banner_images;
            _this.arr = _this.listings.latest_pictures;
            _this.ratingarr = _this.listings.post_reviews;
            // this.listing = this.listings.letest_ads;
            // this.imgforID = this.arr.filter(
            //  arr => arr.id === this.listing.id);
            //  console.log(this.imgforID);
            // if (this.arr.post_type_id === "2") {
            //   var post_type = "Used";
            // } else {
            //   var post_type = "New";
            // }
            //console.log(this.arr[185].filename);
            _this.listings.letest_ads.forEach(function (id) {
                // console.log(id);
                // this.id_title =id['title'];
                // console.log(this.id_title);
                // this.id_price=id['price'];
                _this.listingid = id.id;
                console.log(_this.listingid);
                _this.imgforID = _this.arr.filter(function (arr) { return arr.id === _this.listingid; });
                console.log(_this.imgforID);
                if (_this.imgforID.length > 0) {
                    _this.displaypic = _this.imgforID[0].filename;
                    console.log(_this.displaypic);
                }
                _this.displayobj = { id: _this.listingid, displaypic: _this.displaypic };
                _this.displayobjarr.push(_this.displayobj);
                console.log(_this.displayobjarr);
            });
        });
    };
    //createListing(input:HTMLImputElement){
    //   let listing = { title: input.value};
    //   input.value = '';
    //   this.newlistings.create(listing)
    //   .subscribe(
    //     response => {
    //       listing['id'] = response.id;
    //       this.listings.splice(0,0, listing);
    //     },
    //     (Error: AppError) => {
    //       if (Error instanceof BadInput) {
    //         //this.form.setErrors(error.originalError)
    //       }
    //       else throw Error;
    //     });
    //     }
    Tab1Page.prototype.updateListing = function (listing) {
        this.newlistings.update(listing)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    Tab1Page.prototype.deleteListing = function (listing) {
        var _this = this;
        this.newlistings.delete(listing)
            .subscribe(function (response) {
            var index = _this.listings.indexOf(listing);
            _this.listings.splice(index, 1);
        }, function (Error) {
            if (Error instanceof NotFoundError)
                alert('This post has already been deleted');
        });
    };
    // this.newlistings.create()
    //   .subscribe(response => { 
    //     this.listings = response;
    //     console.log(this.listings);
    //   });
    Tab1Page.prototype.onGoToCategoryPage = function (cat) {
        this.getcategories.currentcategory = cat;
        console.log(cat);
        this.router.navigate(['/categories']);
    };
    Tab1Page.prototype.onGoToBrandPage = function (currentbrand) {
        this.getbrands.currentbrand = currentbrand;
        console.log(currentbrand);
        this.router.navigate(['/brands']);
    };
    Tab1Page.prototype.loadData = function (event) {
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
    Tab1Page.prototype.onGoToListingDetail = function (listing) {
        this.listingdetails.id = listing;
        this.sellerdetails.id = listing;
        console.log(listing);
        this.router.navigate(['/addetails']);
    };
    Tab1Page.prototype.listingpicsarray = function (listings) {
        for (this.listings.letest_ads.id in this.listings) {
            var arr = JSON.parse(this.listings.letest_ads.filename);
            var pics = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var img = arr_1[_i];
                pics.push({ id: this.listings.letest_ads.id, path: this.listings.letest_ads.filename });
            }
            console.log(pics);
        }
    };
    Tab1Page.prototype.picture_array = function () {
        this.listings.letest_ads.forEach(function (id) {
            console.log();
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService, Router, ListingService,
            ListingdetailsService, SellerdetailsService, GetbrandsService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map