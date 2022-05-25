import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AccessGuardGuard } from './guard/access-guard.guard';
import { BookingComponent } from './protected/booking/booking.component';
import { ImagesComponent } from './protected/images/images.component';
import { UserComponent } from './protected/user/user.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AccessGuardGuard],
    loadChildren:() => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  {
    path: 'user',
    canActivate: [AccessGuardGuard],
    component: UserComponent
  },
  {
    path: 'reservas',
    canActivate: [AccessGuardGuard],
    component: BookingComponent
  },
  {
    path: 'image',
    canActivate: [AccessGuardGuard],
    component: ImagesComponent
  },
  {
    path: '**',
    redirectTo:'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
