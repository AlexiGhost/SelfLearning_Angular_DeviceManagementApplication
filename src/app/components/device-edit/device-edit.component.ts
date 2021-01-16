import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DEVICE_STATUS_OFF, DeviceService} from '../../services/device.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {
  defaultStatus = DEVICE_STATUS_OFF;
  constructor(private deviceService: DeviceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const name = form.value.name;
    const status = form.value.status;
    this.deviceService.addDevice(name, status);
    this.router.navigate(['/devices']);
  }

}
