import { BadInput } from '../services/common/bad-input';
import { NotFoundError } from '../services/common/not-found-error';
import { AppError } from '../services/common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url).pipe
      (map(response => response))
      catchError(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
      map(response => response))
      catchError(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true })).pipe(
      map(response => response))      
      catchError(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id).pipe(
      map(response => response))
      catchError(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return throwError(new BadInput(error.json()));
  
    if (error.status === 404)
      return throwError(new NotFoundError());
    
    return throwError(new AppError(error));
  }
}
