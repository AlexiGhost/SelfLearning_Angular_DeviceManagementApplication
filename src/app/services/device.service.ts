import { Injectable } from '@angular/core';

export const DEVICE_STATUS_ON = 'ON';
export const DEVICE_STATUS_OFF = 'OFF';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  devices = [
    {
      name:'Television',
      status: DEVICE_STATUS_OFF
    },
    {
      name: 'Computer',
      status: DEVICE_STATUS_ON
    },
    {
      name: 'DVD Player',
      status: DEVICE_STATUS_OFF
    }
  ];

  constructor() {

  }

  switchOnAll(): void {
    for(const device of this.devices) {
      device.status = DEVICE_STATUS_ON;
    }
  }

  switchOffAll(): void {
    for(const device of this.devices) {
      device.status = DEVICE_STATUS_OFF;
    }
  }

  switchOn(index: number): void {
    this.devices[index].status = DEVICE_STATUS_ON;
  }

  switchOff(index: number): void {
    this.devices[index].status = DEVICE_STATUS_OFF;
  }
}
