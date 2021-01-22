import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export const DEVICE_STATUS_ON = 'ON';
export const DEVICE_STATUS_OFF = 'OFF';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  deviceSubject = new Subject<any[]>();
  private devices = [
    {
      id: -1,
      name: '',
      status: DEVICE_STATUS_OFF
    }
  ];

  constructor(private httpClient: HttpClient) {

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

  saveDeviceToServer(): void {
    this.httpClient
      .put('https://animal-husbandry-manager-default-rtdb.europe-west1.firebasedatabase.app/devices.json', this.devices)
      .subscribe(
        () => {
          console.log('Devices successfully saved !');
        },
        (error) => {
          console.error('Devices save failed : ' + error);
        }
      );
  }

  getDeviceFromServer(): void {
    this.httpClient
      .get<any[]>('https://animal-husbandry-manager-default-rtdb.europe-west1.firebasedatabase.app/devices.json')
      .subscribe(
        (response: any) => {
          this.devices = response;
          this.emitDeviceSubject();
        },
        (error) => {
          console.error('Loading devices failed : ' + error);
        }
      )
  }
}
