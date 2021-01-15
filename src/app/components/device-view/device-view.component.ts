import { Component, NgModule, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss']
})

export class DeviceViewComponent implements OnInit {
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
  );

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
