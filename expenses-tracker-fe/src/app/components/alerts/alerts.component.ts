import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAlertModule} from "@nebular/theme";
import {BehaviorSubject} from "rxjs";
import {AlertsService} from "../../core/services/alerts.service";
import {Alert} from "../../core/models/alerts.model";

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, NbAlertModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

  alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

  constructor(
    private alertService: AlertsService
  ) {
    this.alertService.alerts$.subscribe(alerts => {
      this.alerts$.next(alerts);
    });
  }

  close(idx: number) {
    this.alertService.dismissByIndex(idx);
  }

}
