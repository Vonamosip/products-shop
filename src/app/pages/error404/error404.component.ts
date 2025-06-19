import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-error404',
  imports: [RouterModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {

  constructor() { }

  goBack(): void {
    window.history.back();
  }
}
