import { Component } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from "@nebular/theme";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {LogoComponent} from "../logo/logo.component";
import {AuthService} from "../../core/services/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {AlertsService} from "../../core/services/alerts.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbLayoutModule,
    RouterOutlet,
    LogoComponent,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  standalone: true
})
export class LoginFormComponent {

  passwordVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  registerMode = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  regForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordAgain: new FormControl('', [Validators.required]),
  }, {
    validators: (form) => {
      if (form.get('password')?.value !== form.get('passwordAgain')?.value) {
        form.get('passwordAgain')?.setErrors({passwordsNotMatch: true});
        return {passwordsNotMatch: true};
      }
      return null;
    }

  });

  constructor(
    private alertsService: AlertsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  togglePasswordVisibility() {
    this.passwordVisible$.next(!this.passwordVisible$.value);
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.signIn(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.alertsService.showAlert('Logged in successfully', 'success', false, 2000);
        this.router.navigate(['/']);
      },
      error: () => {
        this.alertsService.showAlert('Invalid email or password', 'danger', false, 2000);
      }
    });
  }

  register() {
    this.registerMode = true;
  }

  signUp() {
    if (this.regForm.invalid) {
      return;
    }
    this.authService.signUp(this.regForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.alertsService.showAlert('Registered successfully', 'success', false, 2000);
      },
      error: () => {
        this.alertsService.showAlert('Invalid email or password', 'danger', false, 2000);
      }
    });
  }
}
