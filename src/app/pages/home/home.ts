import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // 1. Add ActivatedRoute
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  username = '';
  password = '';

  loading = signal(false);
  error = signal('');

  private apiUrl = 'http://localhost:5012';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute // 2. Inject ActivatedRoute
  ) {}

  handleSubmit(): void {
    this.error.set('');

    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      this.error.set('Username and Password are required.');
      return;
    }

    this.loading.set(true);

    this.http
      .post(
        `
        /api/Auth/login`,
        { username: trimmedUsername, password: trimmedPassword },
        { withCredentials: true, observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.status === 200) {
            // 3. Read returnUrl from query params, fallback to dashboard
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigateByUrl(returnUrl);
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