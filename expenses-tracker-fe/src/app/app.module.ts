import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NbDatepickerModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {authHttpInterceptorProvider} from "./core/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // You could use nebular framework
    NbThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    AlertsComponent,
  ],
  providers: [
    authHttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
