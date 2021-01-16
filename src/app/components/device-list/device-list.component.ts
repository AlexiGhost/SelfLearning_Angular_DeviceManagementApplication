import { Component, NgModule, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})

export class DeviceListComponent implements OnInit {
  devices: any[] = [];
  deviceSubscription!: Subscription;
  isAuth = false;
  lastUpdate: Promise<Date> = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        },
        500
      );
    }
  );

  constructor(private deviceService: DeviceService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 5000
    );
  }

  ngOnInit(): void {
    this.deviceSubscription = this.deviceService.deviceSubject.subscribe(
      devices => {
        this.devices = devices;
      }
    );
    this.deviceService.emitDeviceSubject();
  }

  onSwitchOnAll(): void {
    this.deviceService.switchOnAll();
  }

  onSwitchOffAll(): void {
    this.deviceService.switchOffAll();
  }
}
