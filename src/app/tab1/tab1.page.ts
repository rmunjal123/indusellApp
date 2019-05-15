import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  listings = [];

  sliderConfig = {
spaceBetween: 10,
centeredSlides: false,
slidesPerView:3.2
  }
  constructor(private getcategoriesService:GetcategoriesService , private router:Router){}

  ngOnInit(){
this.listings = this.getcategoriesService.getListings();
  }
}
