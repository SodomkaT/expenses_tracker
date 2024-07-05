import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbIconModule} from "@nebular/theme";

@Component({
  selector: 'app-logo',
  standalone: true,
    imports: [CommonModule, NbIconModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

}
