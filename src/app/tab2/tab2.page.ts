import { Component,OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    listings = [];

    sliderConfig = {
  spaceBetween: 10,
  centeredSlides: false,
  slidesPerView:2.4
    }
    constructor(private getcategoriesService:GetcategoriesService , private router:Router){}

    ngOnInit(){
  this.listings = this.getcategoriesService.getListings();
    }
  }
