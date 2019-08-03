import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
var ListingService = /** @class */ (function (_super) {
    tslib_1.__extends(ListingService, _super);
    function ListingService(http) {
        var _this = _super.call(this, 'https://indusell.com/api/home', http) || this;
        //url = 'https://indusell.com/api/home';
        _this.listings = [];
        return _this;
    }
    ListingService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ListingService);
    return ListingService;
}(DataService));
export { ListingService };
//# sourceMappingURL=listing.service.js.map