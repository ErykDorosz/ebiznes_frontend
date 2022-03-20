import { Component, OnInit } from '@angular/core';
import { AuthService, LoginRequest } from '../../../core/openapi';
import { UserStateService } from '../../core/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  error = '';
  loginData: LoginRequest = {
    password: '',
    username: ''
  }

  constructor(private authService: AuthService,
              private userStateService: UserStateService) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginData.password || !this.loginData.username) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData).subscribe({
      next: response => {
        this.loading = false;
        this.userStateService.onLogin(response.token);
      },
      error: err => {
        if (err.status === 401) {
          this.error = 'Invalid credentials!';
        } else {
          this.error = 'Error occured! Please try again.'
        }
        this.loading = false;
      }
    })
  }
}
