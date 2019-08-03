import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
var CreatelistingService = /** @class */ (function (_super) {
    tslib_1.__extends(CreatelistingService, _super);
    function CreatelistingService(http) {
        return _super.call(this, 'https://indusell.com/api/post', http) || this;
    }
    CreatelistingService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CreatelistingService);
    return CreatelistingService;
}(DataService));
export { CreatelistingService };
//# sourceMappingURL=createlisting.service.js.map