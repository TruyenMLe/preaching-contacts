import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/dashboard']);
  }

}
