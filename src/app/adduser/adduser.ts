import { Component,signal } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [HeaderComponent,Footer,FormsModule,CommonModule,NgTemplateOutlet],
  selector: 'app-adduser',
  styleUrl: './adduser.css',
  templateUrl: './adduser.html',
})
export class Adduser {
  showPassword = false;
  showConfirmPassword = false;
  fullName = '';
  email = '';
  password = ''; 
  confirmPassword = '';
  role = '';
  phone = '';
  loading = signal(false);
  error = signal('');

  constructor(private http: HttpClient) {
   
  }

  private validate() : string | null {
     const EMAIL_REGEX   = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
     if (!this.fullName.trim()) return 'Username required.';
     if(this.fullName.trim().split(/\s+/).length <= 1) return "Please Prvoide Full Name"
     const email = this.email.trim();
     if (!email) return 'Email required.';
     if (!EMAIL_REGEX.test(email)) return 'Enter a valid email address.';
     if (!this.password) return 'Password required.';
     if (this.password.length < 8) return 'Password must be at least 8 characters.';
     if (this.password != this.confirmPassword) return 'Password and Confirm Password must match.';
     return null;
}

  handleSubmit(): void {
    const message = this.validate();
    if(message != null)
    {
        this.error.set(message);
        return
    }   
    const trimmedUsername = this.fullName.trim();
    const trimmedPassword = this.password.trim();
    const trimmedEmail= this.email.trim();

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
            this.phone='';
                  
          } else {
            this.error.set('Invalid Access');
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message || 'Save failed. Please try again.');
        },
      });
  }
}
