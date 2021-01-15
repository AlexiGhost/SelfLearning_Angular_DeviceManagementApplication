import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChuckNorrisJokeComponent } from './components/chuck-norris-joke/chuck-norris-joke.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceDetailComponent } from './components/device-detail/device-detail.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import {AuthGuardService} from './services/auth-guard.service';

const appRoute: Routes = [
  { path: 'devices', canActivate: [AuthGuardService], component: DeviceViewComponent},
  { path: 'devices/:id', canActivate: [AuthGuardService], component: DeviceDetailComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'not-found', component: FourOFourComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    DeviceViewComponent,
    DeviceComponent,
    ChuckNorrisJokeComponent,
    AuthComponent,
    DeviceDetailComponent,
    FourOFourComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
