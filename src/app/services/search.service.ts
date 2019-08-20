import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }
  
  getAll(searchtext){
    console.log('https://indusell.com/api/search/' + searchtext);
    return this.http.get('https://indusell.com/api/search/' + searchtext).pipe
    (map(response => console.log(response)));
  }
}

