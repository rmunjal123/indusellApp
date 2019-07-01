import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllcategoriesPage } from './allcategories.page';

const routes: Routes = [
  {
    path: '',
    component: AllcategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllcategoriesPage]
})
export class AllcategoriesPageModule {}
