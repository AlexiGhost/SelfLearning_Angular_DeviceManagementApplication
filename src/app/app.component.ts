import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'animal-farming-register';
  seconds = 0;
  counterSubscription!: Subscription;
  constructor() {

  }
  ngOnInit(): void {
     const counter = interval(1000);
     this.counterSubscription = counter.subscribe(
      value => {
        this.seconds = value;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
