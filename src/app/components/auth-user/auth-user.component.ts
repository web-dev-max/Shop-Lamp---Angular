import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.scss'
})
export class AuthUserComponent {
  isLoginMode = true;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', this.isLoginMode ? null : [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.userForm.removeControl('name');
    } else {
      this.userForm.addControl('name', new FormControl('', Validators.required));
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Форма отправлена:', this.userForm.value);
    } else {
      console.log('Форма невалидна');
    }
  }
}
