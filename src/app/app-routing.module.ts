import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'categories/:id', loadChildren: './pages/categories/categories.module#CategoriesPageModule',
    canActivate: [AuthGuard] },
  { path: 'addlisting', loadChildren: './pages/addlisting/addlisting.module#AddlistingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
