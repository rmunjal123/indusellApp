import * as tslib_1 from "tslib";
import { ErrorHandler } from "@angular/core";
var AppErrorHandler = /** @class */ (function (_super) {
    tslib_1.__extends(AppErrorHandler, _super);
    function AppErrorHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppErrorHandler.prototype.handleError = function (error) {
        alert('An unexpected error occured.');
        console.log(error);
    };
    return AppErrorHandler;
}(ErrorHandler));
export { AppErrorHandler };
//# sourceMappingURL=app-error-handler.js.map