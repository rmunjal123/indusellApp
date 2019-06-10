import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GetcategoriesService } from 'src/app/services/getcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  listings =  [];
  category;
  constructor(private getcategoriesService:GetcategoriesService,private router:Router) { }

  ngOnInit() {
    this.category = this.getcategoriesService.currentcategory;
    console.log(this.category);
  }
  onGoToListingDetail(listing){
    this.getcategoriesService.currentlisting = listing;
    this.router.navigate(['/addetails']);
  }
}
