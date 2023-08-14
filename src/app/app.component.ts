import { Component} from '@angular/core';
//  import animation libraries
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  weatherData: any; // Define the weatherData property
  title = 'weatherApp';
}
