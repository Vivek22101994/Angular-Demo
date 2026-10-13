import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { CommonService } from '../common/common-service';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name : string
  }
  address:{
    city:string
  }
}
@Component({
  imports:[HeaderComponent,Footer],
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // Signal initialized with an empty array, typed as User[]
  users = signal<User[]>([]);
  loading = signal(true);
  error = signal('');
  commonService = inject(CommonService);
  constructor(private http: HttpClient) {

     this.commonService.subject.subscribe({
      next:(val)=>{
           console.log(val);
      }
    });
  }
  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.users.set(data);   // set() replaces the whole value
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load users');
          this.loading.set(false);
        }
      });
  }
  deleteData(id: number, event: Event): void {
     event.preventDefault();
     const currentUsers = [...this.users()];        // copy the array first
     const index = currentUsers.findIndex(c=> c.id === id);
     if (index !== -1) {
         currentUsers.splice(index, 1);                // mutate the copy, not the original
         this.users.set(currentUsers);                 // set the new array
     }
  }
}