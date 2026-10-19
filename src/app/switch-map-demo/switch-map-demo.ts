import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap, tap } from 'rxjs';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

interface UserData {
  id: number;
  title: string;
}

@Component({
  imports: [HeaderComponent, Footer, ReactiveFormsModule],
  selector: 'app-switch-map-demo',
  styleUrl: './switch-map-demo.css',
  templateUrl: './switch-map-demo.html',
})
export class SwitchMapDemo {
  users: UserData[] = [];
  loading = false;
  name = new FormControl('', { nonNullable: true });

  constructor(private http: HttpClient) {
    this.name.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(''),                       // loads the initial list immediately
        tap(() => (this.loading = true)),
        switchMap(value =>
          this.http
            .get<UserData[]>('https://jsonplaceholder.typicode.com/posts', {
              params: { title_like: value },
            })
            .pipe(
              catchError(err => {
                console.error(err);
                return of([] as UserData[]); // keeps the stream alive after an error
              })
            )
        ),
        takeUntilDestroyed()                 // auto-unsubscribes, no timer to clear
      )
      .subscribe(res => {
        this.users = res;
        this.loading = false;
      });
  }
}