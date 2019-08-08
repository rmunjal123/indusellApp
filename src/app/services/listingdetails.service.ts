import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingdetailsService {
  // currentlisting: any;
  // currentcategory: any;
  id: any;
  // let url = 'https://indusell.com/api/post-detail/' + id;
  
  constructor(private http:HttpClient) {}
    getAll(){
      console.log('https://indusell.com/api/post-detail/' + this.id);
      return this.http.get('https://indusell.com/api/post-detail/' + this.id).pipe
        (map(response => response));
    }
      
  }
  


  // getListings(){
  //   return this.data;
  // }
  // getCategories(){
  //   return this.data;
  // }
