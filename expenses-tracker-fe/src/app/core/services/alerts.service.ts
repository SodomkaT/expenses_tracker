import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Alert} from "../models/alerts.model";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

  constructor() { }

  showAlert(msg: string, status?: 'basic' | 'primary' | 'success' | 'info' |'danger' | 'warning' | 'control', dismissible?: boolean, timeout?: number) {
    const alert: Alert = {
      message: msg,
      status: status || 'info',
      dismissible: dismissible || false
    };
    this.alerts$.next([...this.alerts$.value, alert]);
    if (timeout) {
      setTimeout(() => {
        this.dismissByIndex(this.alerts$.value.indexOf(alert));
      }, timeout);
    }
  }

  clear() {
    this.alerts$.next([]);
  }

  dismissByIndex(index: number) {
    const alerts = this.alerts$.value;
    alerts.splice(index, 1);
    this.alerts$.next(alerts);
  }
}
