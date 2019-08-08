import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService extends DataService {
  listings = [];
    constructor(http:HttpClient) {
      super('https://indusell.com/api/home',http);
    }

    // getlisting()
    // {
    //   return this.http.get(this.url);
      
    // }

    // createlisting(listing)
    // {
    //   return this.http.post(this.url, JSON.stringify(listing))
    // }
  }
