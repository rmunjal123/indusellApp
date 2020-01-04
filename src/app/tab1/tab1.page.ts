import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from '../services/getcategories.service'
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ListingService } from '../services/listing.service';
import { AppError } from '../services/common/app-error';
import { BadInput } from '../services/common/bad-input';
import { NotFoundError } from '../services/common/not-found-error';
import { forEach } from '@angular/router/src/utils/collection';
import { ListingdetailsService } from '../services/listingdetails.service';
import { SellerdetailsService } from '../services/sellerdetails.service';
import { GetbrandsService } from '../services/getbrands.service';
import {ViewChild } from '@angular/core';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

listings : any;
listing : any;
categories = [];
data = [];
renderedcategory:any;
arr = [];
ratingarr =[];
imgforID = [];
id_title: string;
id_price: string;
listingid: string;
displayobj: any = {};
displayobjarr: any = [];
displaypic: string;
bannerarr = {};
element: any;
ratingforID: any;


  sliderConfig_Category = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 2.4
  }

  sliderConfig_Brand = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3.4
  }  
constructor(private getcategories:GetcategoriesService , private router:Router,private newlistings:ListingService,
  private listingdetails: ListingdetailsService,private sellerdetails: SellerdetailsService,private getbrands:GetbrandsService){}

  ngOnInit(){
//this.listings[10] = this.newlistings.getlisting();
//this.categories = this.getcategoriesService.getCategories();
//console.log(this.categories);

    this.newlistings.getAll()
    .subscribe(response => { 
      this.listings = response;
      console.log(this.listings);
      this.bannerarr = this.listings.home_banner;
      console.log(this.bannerarr);
      this.arr = this.listings.latest_pictures;
      this.ratingarr = this.listings.post_reviews;
      // this.ratingarr.forEach(element => {
      //   if (element.id === this.listing.id) {
      //     this.rating = this.element.totalrating
      //   }
      // });
      // this.listing = this.listings.letest_ads;
      // this.imgforID = this.arr.filter(
      //  arr => arr.id === this.listing.id);
      //  console.log(this.imgforID);
      //console.log(this.arr[185].filename);
      this.listings.letest_ads.forEach(id => {
          // console.log(id);
          // this.id_title =id['title'];
          // console.log(this.id_title);
          // this.id_price=id['price'];
          this.listingid = id.id;
          console.log(this.listingid);
          this.ratingforID = this.ratingarr.filter(
            ratingarr => ratingarr.id === this.listingid)
            if(this.ratingforID[0]){
            console.log(this.ratingforID[0].totalrating);
          this.ratingforID = this.ratingforID[0].totalrating }
          this.imgforID = this.arr.filter(
          arr => arr.id === this.listingid);
          console.log(this.imgforID);
          if (this.imgforID.length > 0) {
          this.displaypic = this.imgforID[0].filename;
          console.log(this.displaypic);}
          this.displayobj = { id:this.listingid, displaypic: this.displaypic}
          this.displayobjarr.push(this.displayobj);
          console.log (this.displayobjarr);
        
        });
    });
  } 
    //createListing(input:HTMLImputElement){
    //   let listing = { title: input.value};
    //   input.value = '';
  
    //   this.newlistings.create(listing)
    //   .subscribe(
    //     response => {
    //       listing['id'] = response.id;
    //       this.listings.splice(0,0, listing);
    //     },
    //     (Error: AppError) => {
    //       if (Error instanceof BadInput) {
    //         //this.form.setErrors(error.originalError)
    //       }
    //       else throw Error;
    //     });
    //     }
  updateListing(listing) {
    this.newlistings.update(listing)
      .subscribe(
        response => {
          console.log(response);
        });
  }
  deleteListing(listing) {
    this.newlistings.delete(listing)
      .subscribe(
        response => {
          let index = this.listings.indexOf(listing);
          this.listings.splice(index, 1);
        },
        (Error: AppError) => {
          if (Error instanceof NotFoundError)
            alert('This post has already been deleted')
        }
      )
  }
    // this.newlistings.create()
    //   .subscribe(response => { 
    //     this.listings = response;
    //     console.log(this.listings);
    //   });
      
  onGoToCategoryPage(cat) {
    this.getcategories.currentcategory = cat;
    console.log(cat);
    this.router.navigate(['/categories']);
  }

  onGoToBrandPage(currentbrand){
    this.getbrands.currentbrand = currentbrand;
    console.log(currentbrand);
    this.router.navigate(['/brands']);
}
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  @ViewChild('mySlider') slider: IonSlides;
  slideOpts = {
    autoplay: true,
    speed: 1000,
    // loop: true,
    zoom: {
      maxRatio: 5
    }
  }
  //   loadData(event){
  //   console.log(event);
  //   setTimeout(() => {
  //   console.log('Done');
  //   event.target.complete();
  
  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (this.data.length == 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 5000);
  // }
  onGoToListingDetail(listing){
    this.listingdetails.id = listing;
    this.sellerdetails.id = listing;
    console.log(listing);
    this.router.navigate(['/addetails']);
  }
  listingpicsarray(listings){
    for(this.listings.letest_ads.id in this.listings) {
      let arr = JSON.parse(this.listings.letest_ads.filename);
      let pics = [];
      for (let img of arr) {
        pics.push({ id: this.listings.letest_ads.id, path: this.listings.letest_ads.filename });
      }
      console.log(pics);
  }
  }
  picture_array(){
    this.listings.letest_ads.forEach(id => {
      console.log()
    });
  }
}
