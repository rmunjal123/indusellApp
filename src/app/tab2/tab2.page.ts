import { Component,OnInit, ViewChild } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    listings =  [];
    data = [];

    sliderConfig = {
  spaceBetween: 10,
  centeredSlides: false,
  slidesPerView:2.4
    }
    constructor(private getcategoriesService:GetcategoriesService , private router:Router){}
    
    ngOnInit(){
     this.listings = this.getcategoriesService.getListings();
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
