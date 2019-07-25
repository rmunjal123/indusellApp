import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';


@Component({
  selector: 'app-addetails',
  templateUrl: './addetails.page.html',
  styleUrls: ['./addetails.page.scss'],
})
export class AddetailsPage implements OnInit {
  listing: any;
  constructor(private getcategoriesService:GetcategoriesService) { }

  ngOnInit() {
    this.listing = this.getcategoriesService.currentlisting;
    console.log(this.getcategoriesService.currentlisting);
  }

}
