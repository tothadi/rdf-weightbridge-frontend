import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushNotificationsModule } from 'ng-push';

import { AppComponent } from './app.component';
import { WeightsService } from './weights.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PushNotificationsModule
  ],
  providers: [
    WeightsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
