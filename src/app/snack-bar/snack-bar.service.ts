import { Injectable, EventEmitter } from '@angular/core';

import { IMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  notifier = new EventEmitter<IMessage>();

  notify(message: IMessage) {
    this.notifier.emit(message);
  }
}
