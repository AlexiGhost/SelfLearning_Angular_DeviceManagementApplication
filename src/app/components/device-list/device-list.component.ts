import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import { DeviceService } from '../../services/device.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})

export class DeviceListComponent implements OnInit, OnDestroy {
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
    if (this.devices.length > 0 && this.devices[0].id === -1) {
      this.deviceService.getDeviceFromServer();
      this.deviceService.emitDeviceSubject();
    }
  }

  ngOnDestroy(): void {
    this.deviceSubscription.unsubscribe();
  }

  onSwitchOnAll(): void {
    this.deviceService.switchOnAll();
  }

  onSwitchOffAll(): void {
    this.deviceService.switchOffAll();
  }

  onSave(): void {
    this.deviceService.saveDeviceToServer();
  }

  onFetch(): void {
    this.deviceService.getDeviceFromServer();
  }
}
