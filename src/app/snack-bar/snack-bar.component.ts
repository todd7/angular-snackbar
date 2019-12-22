import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable, timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { SnackBarService } from './snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackBarComponent implements OnInit {

  snackVisibility = 'hidden';

  message: string;

  constructor(
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.snackBarService.notifier
      .pipe(
        tap(message => {
          this.snackVisibility = 'visible';
          this.message = message.text;
        }),
        switchMap(message => timer(message.time))
      )
      .subscribe(() => {
        this.snackVisibility = 'hidden';
      });
  }
}
