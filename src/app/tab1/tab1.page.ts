import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ListingService } from '../services/listing.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  listings = [];
  categories = [];
    data = [];

sliderConfig = {
spaceBetween: 0,
centeredSlides: false,
slidesPerView:2.4
  }
constructor(private getcategoriesService:GetcategoriesService , private router:Router,private newlistings:ListingService){}

  ngOnInit(){
this.listings = this.getcategoriesService.getListings();
this.categories = this.getcategoriesService.getCategories();
console.log(this.categories);

this.newlistings.getlisting()
.subscribe(response => {
  this.listings = response.json();
  console.log(response.json())
}, error => {
  alert ('An unexpected error occcurred');
  console.log (error);
});

  }

  onGoToCategoryPage(cat){
    this.getcategoriesService.currentcategory = cat;
    this.router.navigate(['/categories']);
}
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  }
  loadData(event){
  console.log(event);
  setTimeout(() => {
  console.log('Done');
  event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.data.length == 1000) {
      event.target.disabled = true;
    }
  }, 5000);
}
onGoToListingDetail(listing){
  this.getcategoriesService.currentlisting = listing;
  this.router.navigate(['/addetails']);
}
}
