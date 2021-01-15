import { ChuckNorrisService } from './services/chuckNorris.service';
import { Component } from '@angular/core';
import { SwUpdate} from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animal-farming-register';
  joke: any;

  constructor(updates: SwUpdate, private chuckNorrisService: ChuckNorrisService) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    })
  }

  ngOnInit() {
    this.chuckNorrisService.gimmeJokes().subscribe(res => {
      this.joke = res;
    })
  }
}
