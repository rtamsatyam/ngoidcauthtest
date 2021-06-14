import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private oidcSecurityService: OidcSecurityService, private http: HttpClient
              ) {
  }

  getJwt(): Observable<string | any> {
    const httpOptions = {
      responseType: 'text' as const
    };
    return this.http.get('http://localhost:8080/api/users/jwt', httpOptions);
  }

  getUser(): Observable<string | any> {
    return this.http.get('http://localhost:8080/api/users/me');
  }

  getAbout(): Observable<string | any> {
    return this.http.get('http://localhost:8080/api/users/about');
  }
}
