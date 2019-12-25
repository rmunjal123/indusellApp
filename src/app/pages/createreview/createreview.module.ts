import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';

import { IonicModule } from '@ionic/angular';

import { CreatereviewPage } from './createreview.page';

const routes: Routes = [
  {
    path: '',
    component: CreatereviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicRatingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatereviewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatereviewPageModule {}
