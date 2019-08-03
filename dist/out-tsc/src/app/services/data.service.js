import * as tslib_1 from "tslib";
import { BadInput } from '../services/common/bad-input';
import { NotFoundError } from '../services/common/not-found-error';
import { AppError } from '../services/common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
var DataService = /** @class */ (function () {
    function DataService(url, http) {
        this.url = url;
        this.http = http;
    }
    DataService.prototype.getAll = function () {
        return this.http.get(this.url).pipe(map(function (response) { return response; }));
        catchError(this.handleError);
    };
    DataService.prototype.create = function (resource) {
        return this.http.post(this.url, JSON.stringify(resource)).pipe(map(function (response) { return response; }));
        catchError(this.handleError);
    };
    DataService.prototype.update = function (resource) {
        return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true })).pipe(map(function (response) { return response; }));
        catchError(this.handleError);
    };
    DataService.prototype.delete = function (id) {
        return this.http.delete(this.url + '/' + id).pipe(map(function (response) { return response; }));
        catchError(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        if (error.status === 400)
            return throwError(new BadInput(error.json()));
        if (error.status === 404)
            return throwError(new NotFoundError());
        return throwError(new AppError(error));
    };
    DataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [String, HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map