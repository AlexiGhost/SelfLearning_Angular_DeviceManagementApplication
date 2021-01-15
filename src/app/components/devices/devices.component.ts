import { Component, NgModule, OnInit } from '@angular/core';
import { DeviceService } from './../../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})

export class DevicesComponent implements OnInit {
  devices: any[] = [];
  isAuth = false;
  lastUpdate: Promise<Date> = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        },
        2000
      );
    }
  )

  constructor(private deviceService: DeviceService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 5000
    );
  }

  ngOnInit(): void {
    this.devices = this.deviceService.devices;
  }

  onSwitchOnAll(): void {
    this.deviceService.switchOnAll();
  }

  onSwitchOffAll(): void {
    this.deviceService.switchOffAll();
  }
}
