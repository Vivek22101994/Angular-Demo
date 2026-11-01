import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable, Subject, concat, of,
  catchError, debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

interface UserData {
  id: number;
  title: string;
}
@Component({
  imports: [NgSelectModule, AsyncPipe, FormsModule,HeaderComponent,Footer],
  selector: 'app-multiselect',
  styleUrl: './multiselect.css',
  template: `
    <app-header></app-header>
    <h2 style="text-align:center">Multi Select Serverside Demo</h2>
    <br/>
    <ng-select
      [items]="(items$ | async) ?? []"
      bindLabel="title"
      bindValue="id"
      [multiple]="true"
      [loading]="loading"
      [typeahead]="search$"
      [minTermLength]="2"
      [virtualScroll]="true"
      typeToSearchText="Type 2+ characters to search"
      [(ngModel)]="selectedIds">
    </ng-select>
    <br/>
    <button type="button" class="form-control" style="width:10%" (click)="getValues()">Get values</button>
     <button type="button" class="form-control" style="width:10%" (click)="ClearValues()">Clear values</button>
    <app-footer></app-footer>
  `
})
export class Multiselect {

items$!: Observable<UserData[]>;
  search$ = new Subject<string>();
  loading = false;
  selectedIds: number[] = [];

  constructor(private http: HttpClient) {
    this.items$ = 
      this.search$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(term =>
          this.http.get<UserData[]>('https://jsonplaceholder.typicode.com/posts/',{ params:{ title_like: term } }).pipe(
            catchError(() => of([])),
            tap(() => (this.loading = false))
          )
        )
      );
  }
  getValues(){  
    console.log(this.selectedIds);
  }
  ClearValues(){
    this.selectedIds = [];
    console.log(this.selectedIds);
  }
}
