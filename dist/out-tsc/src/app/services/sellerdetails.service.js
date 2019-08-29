import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var SellerdetailsService = /** @class */ (function () {
    // let url = 'https://indusell.com/api/post-detail/' + id;
    function SellerdetailsService(http) {
        this.http = http;
        this.seller_name = '';
        this.seller_email = '';
    }
    SellerdetailsService.prototype.getAll = function () {
        var _this = this;
        console.log('https://indusell.com/api/sellerprofile/' + this.id);
        return this.http.get('https://indusell.com/api/sellerprofile/' + this.id).pipe(map(function (response) {
            _this.seller = response['Seller'];
            console.log(_this.seller);
            _this.seller_name = _this.seller["name"];
            _this.seller_email = _this.seller["email"];
        }));
    };
    SellerdetailsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SellerdetailsService);
    return SellerdetailsService;
}());
export { SellerdetailsService };
//# sourceMappingURL=sellerdetails.service.js.map