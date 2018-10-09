import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { NodesDataService } from './services/nodes-data.service';
import { PagerService } from './services/pagerservice.service';

// GoogleMaps
import { AgmCoreModule } from '@agm/core';

// SharedModules
import { SharedModule } from './modules/sharedmodule/sharedmodule.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './components/auth/auth-interceptor';

// Componenets
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NodelistComponent } from './components/nodelist/nodelist.component';
import { NodemapComponent } from './components/nodemap/nodemap.component';
import { FooterComponent } from './components/footer/footer.component';

// Admin Module
import { AdminModule } from './components/admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontpageComponent,
    LoginComponent,
    NodelistComponent,
    NodemapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe2QqXrbtaORvL-I0WHpiI72HxtfTz5Zo'
    }),
    SharedModule,
    AdminModule, // Admin Module
    AppRoutingModule // App Routing should be at bottom
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    NodesDataService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
