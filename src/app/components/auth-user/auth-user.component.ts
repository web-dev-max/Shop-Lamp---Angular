import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-auth-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputText,
    FloatLabel,
    PasswordModule
  ],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.scss'
})
export class AuthUserComponent {
  isLoginMode = false;
  userForm: FormGroup;
  nameControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private userApiServices: UserApiService,
  ) {
    this.nameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.userForm = this.fb.group({
      name: this.isLoginMode ? null : this.nameControl,
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.userForm.removeControl('name');
    } else {
      this.userForm.addControl('name', this.nameControl);
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.userApiServices.userLogin(this.userForm.value).subscribe();
    } else {
      this.userApiServices.userRegister(this.userForm.value).subscribe();
    }
  }
}
