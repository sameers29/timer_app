import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MovablePopupComponent } from './movable-popup/movable-popup.component';
@NgModule({
  declarations: [AppComponent, DateTimePickerComponent, MovablePopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule,
    CarouselModule,
    ButtonsModule,
    AlertModule,
    AccordionModule,
    NgbTimepickerModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [AlertConfig, BsDatepickerConfig, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
