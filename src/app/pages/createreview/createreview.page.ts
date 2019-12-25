import { Component, OnInit } from '@angular/core';
import { IonicRatingModule } from 'ionic4-rating'
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-createreview',
  templateUrl: './createreview.page.html',
  styleUrls: ['./createreview.page.scss'],
})
export class CreatereviewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onModelChange(event){
    console.log('Your rate:', event);
  }

}
