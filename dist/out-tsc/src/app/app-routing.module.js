import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
    { path: 'addlisting', loadChildren: './pages/addlisting/addlisting.module#AddlistingPageModule' },
    { path: 'addetails', loadChildren: './pages/addetails/addetails.module#AddetailsPageModule' },
    { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
    { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
    { path: 'profile', loadChildren: './pages/members/profile/profile.module#ProfilePageModule' },
    { path: 'allcategories', loadChildren: './pages/allcategories/allcategories.module#AllcategoriesPageModule' },
    { path: 'brands', loadChildren: './pages/brands/brands.module#BrandsPageModule' },
    { path: 'buddychat', loadChildren: './pages/buddychat/buddychat.module#BuddychatPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map