import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SnackBarService } from './snack-bar/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message = new FormControl('');

  constructor(
    private snackBarService: SnackBarService
  ) { }

  notify() {
    if (this.message.value) {
      this.snackBarService.notify({ text: this.message.value, time: 3000 });
    }
  }

}
