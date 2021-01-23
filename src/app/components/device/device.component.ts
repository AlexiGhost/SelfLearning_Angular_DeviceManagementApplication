import { DeviceService, DEVICE_STATUS_OFF, DEVICE_STATUS_ON } from '../../services/device.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent implements OnInit {
  @Input() deviceName = 'device';
  @Input() deviceStatus = DEVICE_STATUS_OFF;
  @Input() deviceIndex = 0;
  @Input() id = 0;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  isActive(): boolean {
    return this.deviceStatus === DEVICE_STATUS_ON;
  }

  onSwitchOn(): void {
    this.deviceService.switchOn(this.deviceIndex);
  }

  onSwitchOff(): void {
    this.deviceService.switchOff(this.deviceIndex);
  }

  onRemove(): void {
    this.deviceService.removeDevice(this.id);
  }
}
