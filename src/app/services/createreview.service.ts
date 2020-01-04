import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { ListingdetailsService } from './listingdetails.service'

@Injectable({
  providedIn: 'root'
})
export class CreatereviewService extends DataService {

  constructor(http:HttpClient,private listingdetails: ListingdetailsService
    ) { 
    super('https://indusell.com/api/addproductreview/' + listingdetails.id,http);
    console.log('https://indusell.com/api/addproductreview/' + listingdetails.id)
  }
}
