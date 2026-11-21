import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
}

@Component({
  imports: [HeaderComponent,AgGridAngular,Footer],
  selector: 'app-aggrid',
  styleUrl: './aggrid.css',
  templateUrl: './aggrid.html',

})
export class AGGrid {
  private http = inject(HttpClient);

  rowData = signal<User[]>([]);
  searchText = signal('');
  
  colDefs: ColDef[] = [
    { field: 'id', width: 90 },
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'website' },
    { headerName: 'Company', valueGetter: p => p.data.company.name },
    { headerName: 'City', valueGetter: p => p.data.address.city },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 120,
  };

  onGridReady(_: GridReadyEvent) {
    console.log("aaa");
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => (this.rowData.set(data)));
  }
  onSearch(event: Event) {
      this.searchText.set((event.target as HTMLInputElement).value);
  }
}
