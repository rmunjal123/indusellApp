import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatelistingService extends DataService{

  constructor(http:HttpClient) {
    super('https://indusell.com/api/post',http);
  }
}
