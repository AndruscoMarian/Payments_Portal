import { Component } from '@angular/core';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation],
})
export class AppComponent {
  title = 'payment-portal';
}
