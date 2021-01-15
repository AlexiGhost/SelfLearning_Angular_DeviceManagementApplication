import { Injectable } from '@angular/core';

export const DEVICE_STATUS_ON = 'ON';
export const DEVICE_STATUS_OFF = 'OFF';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  devices = [
    {
      id: 1,
      name: 'Television',
      status: DEVICE_STATUS_OFF
    },
    {
      id: 2,
      name: 'Computer',
      status: DEVICE_STATUS_ON
    },
    {
      id: 3,
      name: 'DVD Player',
      status: DEVICE_STATUS_OFF
    }
  ];

  constructor() {

  }

  getDeviceById(id: number): any {
    const device = this.devices.find(
      (deviceObject) => {
        return deviceObject.id === id;
      }
    );
    return device;
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
