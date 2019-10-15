import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categorylistings: any;
  category: any;
  categoryname: any;
  objforcategoryname: any;

  constructor(private getcategories:GetcategoriesService,private router:Router,private listingdetails: ListingdetailsService,) { }
              private sellerdetails: SellerdetailsService
  ngOnInit() {
    this.categorylistings = this.getcategories.getAll()
      .subscribe(response => {
        this.categorylistings = response;
        console.log(this.categorylistings);
        this.category = response['listing']
        if (this.category.length > 1) {
          this.objforcategoryname = this.category[0]
          this.categoryname = this.objforcategoryname.subcategoryname;
          console.log(this.categoryname)
        }
      });
  }
  onGoToListingDetail(listing) {
    this.listingdetails.id = listing;
    this.sellerdetails.id = listing;
    console.log(listing);
    this.router.navigate(['/addetails']);
  }
}

