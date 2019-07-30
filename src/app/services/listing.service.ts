import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  url = 'https://indusell.com/api/home';
  listings = []

    constructor(private http:HttpClient) {}

    getlisting()
    {
      return this.http.get(this.url);
      
    }

    createlisting(listing)
    {
      return this.http.post(this.url, JSON.stringify(listing))
    }
  
  }
