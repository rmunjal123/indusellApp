import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetbrandsService } from 'src/app/services/getbrands.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  brandlistings: any;

  constructor(private getbrands:GetbrandsService,private router:Router,private listingdetails: ListingdetailsService,
              private sellerdetails: SellerdetailsService) { }

  ngOnInit() {
    this.brandlistings = this.getbrands.getAll()
    .subscribe(response => { 
      this.brandlistings = response;
      console.log(this.brandlistings);
  });
  }
  onGoToListingDetail(listing){
    this.listingdetails.id = listing;
    this.sellerdetails.id = listing;
    console.log(listing);
    this.router.navigate(['/addetails']);
  }
}

