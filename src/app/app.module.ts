import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChuckNorrisJokeComponent } from './components/chuck-norris-joke/chuck-norris-joke.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceDetailComponent } from './components/device-detail/device-detail.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import {AuthGuardService} from './services/auth-guard.service';
import { DeviceEditComponent } from './components/device-edit/device-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const appRoute: Routes = [
  { path: 'devices', canActivate: [AuthGuardService], component: DeviceListComponent},
  { path: 'devices/new', canActivate: [AuthGuardService], component: DeviceEditComponent},
  { path: 'devices/:id', canActivate: [AuthGuardService], component: DeviceDetailComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'users', component: UserListComponent},
  { path: 'users/new', component: UserEditComponent},
  { path: 'not-found', component: FourOFourComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    DeviceComponent,
    ChuckNorrisJokeComponent,
    AuthComponent,
    DeviceDetailComponent,
    FourOFourComponent,
    DeviceEditComponent,
    UserListComponent,
    UserEditComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
