import { APP_INITIALIZER, NgModule } from '@angular/core';
import {AuthInterceptor, AuthModule, LogLevel, OidcConfigService} from 'angular-auth-oidc-client';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://offeringsolutions-sts.azurewebsites.net',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'angularCodeRefreshTokens',
      scope: 'openid profile email taler_api offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      logLevel: LogLevel.Debug,
      secureRoutes: ['http://localhost:8080']
    });
}

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
