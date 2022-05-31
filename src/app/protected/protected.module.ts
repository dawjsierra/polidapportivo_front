import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { ImagesComponent } from './images/images.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    UserComponent,
    BookingComponent,
    ImagesComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    ImagesComponent,
    BookingComponent,
    UserComponent,
    SidebarComponent
  ]
})
export class ProtectedModule { }
