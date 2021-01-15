import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ChuckNorrisService } from 'src/app/services/chuckNorris.service';

@Component({
  selector: 'app-chuck-norris-joke',
  templateUrl: './chuck-norris-joke.component.html',
  styleUrls: ['./chuck-norris-joke.component.scss']
})
export class ChuckNorrisJokeComponent implements OnInit {
  joke: any;

  constructor(updates: SwUpdate, private chuckNorrisService: ChuckNorrisService) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.chuckNorrisService.gimmeJokes().subscribe(res => {
      this.joke = res;
    });
  }
}
