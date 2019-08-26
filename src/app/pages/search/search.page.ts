import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: any;
  searchlistings: any;
  arr = [];
  imgforID = [];
  displaypic: string;
  displayobj: any = {};
displayobjarr: any = [];
searchlistingid: string;

  constructor(private searchservice: SearchService,private listingdetails: ListingdetailsService,
    private sellerdetails: SellerdetailsService,private router:Router) { }

  ngOnInit() {
  }
onInput(){
  console.log(this.searchQuery);
  this.searchservice.getAll(this.searchQuery)
      .subscribe(
        response => {
          this.searchlistings = response;
          console.log(response);
          this.searchlistings.posts.forEach(item => {
          this.searchlistingid = item.id;
          console.log(item.id);
          this.arr = this.searchlistings.pictures;
          this.imgforID = this.arr.filter(
            arr => arr.id === item.id);
            console.log(this.imgforID);
            if (this.imgforID.length > 0) {
            this.displaypic = this.imgforID[0].filename;
            this.displayobj = { id:this.searchlistingid, displaypic: this.displaypic}
            this.displayobjarr.push(this.displayobj);
            console.log (this.displayobjarr);
            }});
          //addlisting['id'] = response.id;
          //this.addlisting.splice(0,0, addlisting);
        },
        (Error: AppError) => {
          if (Error instanceof BadInput) {
            console.log(Error)
          }
          else throw Error;
        });
  }
  onGoToListingDetail(listing){
    this.listingdetails.id = listing;
    this.sellerdetails.id = listing;
    console.log(listing);
    this.router.navigate(['/addetails']);
  }
}
