import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PasswordValidator } from './password.validators';
import { EmailValidator } from './email.validator';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  form;

  constructor(fb: FormBuilder, private db: AngularFireDatabase, private auth: AuthService, private router: Router) {

    this.form = fb.group({
      fullName: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email],
        [EmailValidator.emailShouldUnique(this.db)]
      ],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required]]
    }, {
      validators: PasswordValidator.passwordShouldMatch
    })
  }

  get fullName() {
    return this.form.get('fullName');
  }
  get email() {
    return this.form.get('email');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get password() {
    return this.form.get('password');
  }
  get repeatPassword() {
    return this.form.get('repeatPassword');
  }

  registerUser(data) {
    this.auth.registerUser(data);
    this.router.navigate(['/main-website']);

    //// Navigate to main website page
  }

  loginWithGoogle() {
    console.log("Login With Google");
  }
}
