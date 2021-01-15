import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  name = 'Device';
  status = 'Status';

  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.name = this.deviceService.getDeviceById(+id).name;
    this.status = this.deviceService.getDeviceById(+id).status;
  }

}
