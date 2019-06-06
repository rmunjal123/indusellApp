import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  listings = [];

  sliderConfig = {
spaceBetween: 0,
centeredSlides: false,
slidesPerView:2.4
  }
  constructor(private getcategoriesService:GetcategoriesService , private router:Router){}

  ngOnInit(){
this.listings = this.getcategoriesService.getListings();
  }
}
export class SlideExample {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  }
}

