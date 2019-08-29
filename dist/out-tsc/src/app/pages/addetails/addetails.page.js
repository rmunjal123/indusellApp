import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
var AddetailsPage = /** @class */ (function () {
    function AddetailsPage(getcategoriesService, listingdetails, sellerdetails, socialSharing, actionSheetController) {
        this.getcategoriesService = getcategoriesService;
        this.listingdetails = listingdetails;
        this.sellerdetails = sellerdetails;
        this.socialSharing = socialSharing;
        this.actionSheetController = actionSheetController;
        this.text = 'Check out the Ionic Academy!';
        this.url = 'https://ionicacademy.com';
        this.slideOpts = {
            zoom: false,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 20,
            direction: 'horizontal'
        };
    }
    AddetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.listing = this.listingdetails.getAll()
            .subscribe(function (response) {
            _this.listing = response;
            console.log(_this.listing);
            _this.postdetails = _this.listing['post-detail'][0];
            _this.posttitle = _this.postdetails["title"];
            _this.postcontact = _this.postdetails["contact_name"];
            _this.postcreated_at = _this.postdetails["created_at"];
            _this.postprice = _this.postdetails["price"];
            _this.postviews = _this.postdetails["visits"];
            _this.poststate = _this.postdetails["post_type_id"];
            console.log(_this.postviews);
            _this.postlocation = _this.postdetails["country_code"];
            _this.postdescription = _this.postdetails["description"];
            _this.postnegotiable = _this.postdetails["negotiable"];
            _this.postcleandescription = _this.removeHTMLTags(_this.postdescription);
            _this.postreview = _this.listing['product-review'];
            console.log(_this.postreview);
            _this.postreview_title = _this.postreview["title"];
            _this.postreview_description = _this.postreview["description"];
            _this.postreview_date = _this.postreview["update_date"];
            // this.sellerreview = this.listing['seller-rating'];
            // console.log(this.sellerreview);
            // this.sellername = this.sellerreview["name"];
            // this.sellerlocation= this.sellerreview["name"];
            // this.sellerrating = this.sellerrating["rating"]
            console.log(_this.posttitle);
        });
        this.seller = this.sellerdetails.getAll()
            .subscribe(function (response) {
            _this.seller = response['Seller'];
            console.log(_this.seller);
            _this.seller_name = _this.seller["name"];
            _this.seller_email = _this.seller["email"];
        });
    };
    //Sharing the url code starts from here
    AddetailsPage.prototype.share = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Share the Link:",
                            buttons: [{
                                    text: 'Facebook',
                                    icon: "logo-facebook",
                                    handler: function () {
                                        //this.uploadImages();
                                        _this.shareFacebook();
                                    }
                                },
                                {
                                    text: 'Whatsapp',
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        _this.shareWhatsApp();
                                    }
                                },
                                {
                                    text: 'Twitter',
                                    icon: "logo-twitter",
                                    handler: function () {
                                        _this.shareTwitter();
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddetailsPage.prototype.shareTwitter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // Either URL or Image
                this.socialSharing.shareViaTwitter(null, null, this.url).then(function () {
                    // Success
                }).catch(function (e) {
                    // Error!
                });
                return [2 /*return*/];
            });
        });
    };
    AddetailsPage.prototype.shareWhatsApp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // Text + Image or URL works
                this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(function () {
                    // Success
                }).catch(function (e) {
                    // Error!
                });
                return [2 /*return*/];
            });
        });
    };
    // async resolveLocalFile() {
    //   return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'shapes.svg', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
    // }
    // removeTempFile(name) {
    //   this.file.removeFile(this.file.cacheDirectory, name);
    // }
    // async shareEmail() {
    //  let file = await this.resolveLocalFile();
    //   this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['saimon@devdactic.com'], null, null, file.nativeURL).then(() => {
    //     this.removeTempFile(file.name);
    //   }).catch((e) => {
    //     // Error!
    //   });
    //}
    AddetailsPage.prototype.shareFacebook = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // let file = await this.resolveLocalFile();
                // Image or URL works
                this.socialSharing.shareViaFacebook(null, null, this.url).then(function () {
                    console.log('shared');
                }).catch(function (e) {
                    console.log(e);
                });
                return [2 /*return*/];
            });
        });
    };
    AddetailsPage.prototype.removeHTMLTags = function (stringdata) {
        {
            var strInputCode = stringdata;
            strInputCode = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
            console.log(strInputCode);
            return strInputCode;
        }
    };
    AddetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-addetails',
            templateUrl: './addetails.page.html',
            styleUrls: ['./addetails.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService, ListingdetailsService,
            SellerdetailsService, SocialSharing, ActionSheetController])
    ], AddetailsPage);
    return AddetailsPage;
}());
export { AddetailsPage };
//# sourceMappingURL=addetails.page.js.map