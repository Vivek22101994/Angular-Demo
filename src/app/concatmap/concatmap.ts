import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, exhaustMap, from, Subject } from 'rxjs';

interface UserData {
  id: number;
  title: string;
}


@Component({
  imports: [HeaderComponent, Footer],
  selector: 'app-concatmap',
  styleUrl: './concatmap.css',
  templateUrl: './concatmap.html',
})

export class Concatmap {
  userDatas: UserData[] = [];
  private nameClick$ = new Subject<void>();
  constructor(private http: HttpClient) {
    this.http.get<UserData[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      concatMap(posts => from(posts)),
      concatMap(user => this.http.get<UserData>('https://jsonplaceholder.typicode.com/posts/' + user.id))
    ).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Operation Compleacted");
      }
    })
  }
  ngOnInit() {
    this.nameClick$.pipe(
      exhaustMap(() => this.http.get<UserData>('https://jsonplaceholder.typicode.com/posts').pipe(
        delay(3000)
      ))
    ).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Event Complated");
      }
    });
  }
  getName() {
    this.nameClick$.next();
  }
  ngOnDestroy() {
    this.nameClick$.complete();
  }
}
