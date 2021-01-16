import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export const DEVICE_STATUS_ON = 'ON';
export const DEVICE_STATUS_OFF = 'OFF';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  deviceSubject = new Subject<any[]>();
  private devices = [
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

  emitDeviceSubject(): void {
    this.deviceSubject.next(this.devices.slice());
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
    this.emitDeviceSubject();
  }

  switchOffAll(): void {
    for(const device of this.devices) {
      device.status = DEVICE_STATUS_OFF;
    }
    this.emitDeviceSubject();
  }

  switchOn(index: number): void {
    this.devices[index].status = DEVICE_STATUS_ON;
    this.emitDeviceSubject();
  }

  switchOff(index: number): void {
    this.devices[index].status = DEVICE_STATUS_OFF;
    this.emitDeviceSubject();
  }

  addDevice(name: string, status?: string): void {
    const device = {
      id: 0,
      name: '',
      status: DEVICE_STATUS_OFF
    };
    device.name = name;
    if (status) { device.status = status; }
    device.id = this.devices[this.devices.length - 1].id + 1;
    this.devices.push(device);
    this.emitDeviceSubject();
  }
}
