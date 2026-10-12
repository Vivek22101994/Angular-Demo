import { Component,signal } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [HeaderComponent,Footer,FormsModule,CommonModule],
  selector: 'app-adduser',
  styleUrl: './adduser.css',
  templateUrl: './adduser.html',
})
export class Adduser {
  fullName = '';
  email = '';
  password = ''; 
  confirmPassword = '';
  role = '';
  phone = '';
  loading = signal(false);
  error = signal('');


  constructor(
    private http: HttpClient,
  ) {}

  handleSubmit(): void {
    this.error.set('');
    const trimmedUsername = this.fullName.trim();
    const trimmedPassword = this.password.trim();
    const trimmedEmail= this.email.trim();

    if (!trimmedUsername) {
      this.error.set('Username required.');
      return;
    }
    if (!trimmedEmail) {
      this.error.set('Email required.');
      return;    
    }
    if (!trimmedPassword) {
      this.error.set('Password required.');
      return;    
    }
    this.loading.set(true);
    const payload = {
    fullName: trimmedUsername,
    email: trimmedEmail,
    password: trimmedPassword,
    username: trimmedUsername,
    role: 'admin'
  };

  this.http
      .post(
        `/api/Auth/saveUser`,
         payload,
        { withCredentials: true, observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.status === 200) {
            this.error.set('Success');    
            this.email = '';
            this.password = '';
            this.fullName = '';
                  
          } else {
            this.error.set('Invalid Access');
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message || 'Login failed. Please try again.');
        },
      });
  }
}
