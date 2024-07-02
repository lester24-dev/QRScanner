import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const API_URL = environment.API_URL
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpService) {}

  create(credential: any) {
    return this.http.get(`${API_URL}/mobile_app/login.php?username=${credential.username}&password=${credential.password}`);
  }

  getData(): any{
    return this.http.get(`${API_URL}/mobile_app/list.php`);
  }

  // Add more methods for other API endpoints as needed
}