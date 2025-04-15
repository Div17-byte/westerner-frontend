import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

 public readonly API_URL = 'http://localhost:3000';
  constructor(private http:HttpClient) { }


  uploadFile(file:any) {
    return this.http.post(`${this.API_URL}/upload`, file)
  }
}
