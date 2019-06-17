import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  url = 'http://jsonplaceholder.typicode.com/posts';

    constructor(private http:Http) {}

    getlisting()
    {
      return this.http.get(this.url);
      //console.log(this.url)
    }

    createlisting(listing)
    {
      return this.http.post(this.url, JSON.stringify(listing))
    }
  
  }
