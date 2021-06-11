import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { OidcSecurityService} from 'angular-auth-oidc-client';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private oidcSecurityService: OidcSecurityService, private http: HttpClient
              ) {
  }

  getJwt(): Observable<string | any> {
    const httpOptions = {
      responseType: 'text' as const
    };
    return this.http.get('/api/users/jwt', httpOptions);
  }

  getUser(): Observable<string | any> {
    return this.http.get('/api/users/me');
  }

}
