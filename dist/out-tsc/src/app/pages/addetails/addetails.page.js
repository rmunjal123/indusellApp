import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
var AddetailsPage = /** @class */ (function () {
    function AddetailsPage(getcategoriesService) {
        this.getcategoriesService = getcategoriesService;
    }
    AddetailsPage.prototype.ngOnInit = function () {
        this.listing = this.getcategoriesService.currentlisting;
        console.log(this.getcategoriesService.currentlisting);
    };
    AddetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-addetails',
            templateUrl: './addetails.page.html',
            styleUrls: ['./addetails.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GetcategoriesService])
    ], AddetailsPage);
    return AddetailsPage;
}());
export { AddetailsPage };
//# sourceMappingURL=addetails.page.js.map