import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Object[][]> {
    return this.http.get<Object[][]>("/api/proj.json");
  }

  getStats(): Observable<Map<String, number>> {
    return this.http.get<Map<String, number>>("/api/stat.json");
  }
}
