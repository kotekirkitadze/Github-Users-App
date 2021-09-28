import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module


import { AppComponent } from './app.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserItemComponent } from './users/user-list/user-item/user-item.component';
import { HeaderComponent } from './shell/header/header.component';
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiInterceptor } from './services/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserListComponent,
    UserItemComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
