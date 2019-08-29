import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var GetbrandsService = /** @class */ (function () {
    function GetbrandsService(http) {
        this.http = http;
    }
    GetbrandsService.prototype.getAll = function () {
        console.log('https://indusell.com/api/brandlisting/' + this.currentbrand);
        return this.http.get('https://indusell.com/api/brandlisting/' + this.currentbrand).pipe(map(function (response) { return response; }));
    };
    GetbrandsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GetbrandsService);
    return GetbrandsService;
}());
export { GetbrandsService };
//# sourceMappingURL=getbrands.service.js.map