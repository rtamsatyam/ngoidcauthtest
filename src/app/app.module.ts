import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AuthConfigModule} from "./auth/auth-config.module";
import { EventTypes, PublicEventsService} from "angular-auth-oidc-client";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly eventService: PublicEventsService) {
    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => console.log('configloaded', config))

    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoadingFailed))
      .subscribe(({value}) => console.log('configloaded failed', value))
  }
}
