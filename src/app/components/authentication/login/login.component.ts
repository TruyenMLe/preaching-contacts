import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: '',
    password: ''
  });
  submitted: boolean;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      };

      this.authService.authenticate(credentials)
        .subscribe(() => this.router.navigate(['/dashboard']));
    }
  }

}
