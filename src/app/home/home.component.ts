import { Component, OnInit } from '@angular/core';
import { OidcClientNotification, OidcSecurityService, PublicConfiguration } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import {Subscription} from "rxjs/internal/Subscription";
import {UserService} from "./user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  configuration: PublicConfiguration | undefined;
  userDataChanged$: Observable<OidcClientNotification<any>> | undefined;
  userData$: Observable<any> | undefined;
  isAuthenticated = false;
  constructor(public oidcSecurityService: OidcSecurityService,
              private userService: UserService) {}

  private apiDataStringSub: Subscription | undefined;
  private apiDataString: string | undefined;
  private apiDataSub: Subscription | undefined;
  private apiData: Observable<any> | undefined;
  private apiUserName: Subscription | undefined;
  private apiUserString: string | undefined;

  ngOnInit() {
    this.configuration = this.oidcSecurityService.configuration;
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;

      console.warn('authenticated: ', authenticated);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }
  loadAPI(): void {
    this.apiDataStringSub = this.userService.getJwt()
      .subscribe((response) => {
        this.apiDataString = response;
      });
    this.apiDataSub = this.userService.getUser()
      .subscribe((response) => {
        this.apiData = response;
      });
  }
}
