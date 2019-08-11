import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetbrandsService {
currentbrand: any;
  constructor(private http:HttpClient) {}
  getAll() {
    console.log('https://indusell.com/api/brandlisting/' + this.currentbrand);
    return this.http.get('https://indusell.com/api/brandlisting/' + this.currentbrand).pipe
    (map(response => response));
  }
}
