import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var ListingdetailsService = /** @class */ (function () {
    // let url = 'https://indusell.com/api/postdetail/' + id;
    function ListingdetailsService(http) {
        this.http = http;
    }
    ListingdetailsService.prototype.getAll = function () {
        console.log('https://indusell.com/api/postdetail/' + this.id);
        return this.http.get('https://indusell.com/api/postdetail/' + this.id).pipe(map(function (response) { return response; }));
    };
    ListingdetailsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ListingdetailsService);
    return ListingdetailsService;
}());
export { ListingdetailsService };
// getListings(){
//   return this.data;
// }
// getCategories(){
//   return this.data;
// }
//# sourceMappingURL=listingdetails.service.js.map