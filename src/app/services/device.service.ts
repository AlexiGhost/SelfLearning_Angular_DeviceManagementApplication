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
    return this.devices.find(
      (device) => {
        return device.id === id;
      }
    );
  }

  switchOnAll(): void {
    for (const device of this.devices) {
      device.status = DEVICE_STATUS_ON;
    }
    this.emitDeviceSubject();
    console.log('All the devices have been switched on');
  }

  switchOffAll(): void {
    for (const device of this.devices) {
      device.status = DEVICE_STATUS_OFF;
    }
    this.emitDeviceSubject();
    console.log('All the devices have been switched off');
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

  removeDevice(id: number): void {
    if (id && id > 0) {
      this.devices.forEach( (device, index) => {
        if (device.id === id) {
          this.devices.splice(index, 1);
          this.emitDeviceSubject();
        }
      });
    }
  }

  saveDeviceToServer(): void {
    this.httpClient
      .put('https://animal-husbandry-manager-default-rtdb.europe-west1.firebasedatabase.app/devices.json', this.devices)
      .subscribe(
        () => {
          console.log('Devices successfully saved in database !');
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
          console.log('Devices successfully reloaded from database !');
        },
        (error) => {
          console.error('Loading devices failed : ' + error);
        }
      );
  }
}
