import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { NotFoundError } from '../services/common/not-found-error';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(getcategoriesService, router, newlistings) {
        this.getcategoriesService = getcategoriesService;
        this.router = router;
        this.newlistings = newlistings;
        this.categories = [];
        this.data = [];
        this.sliderConfig = {
            spaceBetween: 0,
            centeredSlides: false,
            slidesPerView: 2.4
        };
        // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
        this.slideOpts = {
            initialSlide: 1,
            speed: 400
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
        this.getcategoriesService.currentcategory = cat;
        this.router.navigate(['/categories']);
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
        this.getcategoriesService.currentlisting = listing;
        this.router.navigate(['/addetails']);
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService, Router, ListingService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map