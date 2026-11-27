import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  CellClickedEvent,
  CellValueChangedEvent,
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
    { field: 'id', width: 10 },
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'website' },
    { headerName: 'Company', valueGetter: p => p.data.company.name },
    { headerName: 'City', valueGetter: p => p.data.address.city },
    {
      headerName: 'Edit',
      cellRenderer: () => '<button class="edit-btn">Edit</button>',
      onCellClicked: (e) => console.log("Edit"),
      editable: false,      // this stops the empty edit box
      sortable: false,
      filter: false,        // removes the filter icon from the header
      resizable: false,
      flex: 0,
      width: 110,
      cellClass: 'no-focus-border',
    },
    {
      headerName: 'Delete',
      cellRenderer: () => '<button class="delete-btn">Delete</button>',
      onCellClicked: (e) => (this.deleteData(e)),
      editable: false,      // this stops the empty edit box
      sortable: false,
      filter: false,        // removes the filter icon from the header
      resizable: false,
      flex: 0,
      width: 110,
      cellClass: 'no-focus-border',
    }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 120,
    editable: true
  };
  onGridReady(_: GridReadyEvent) {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => (this.rowData.set(data)));
  }
  onSearch(event: Event) {
      this.searchText.set((event.target as HTMLInputElement).value);
  }
  onCellValueChanged(event: CellValueChangedEvent<User>) {
      console.log(`${event.colDef.field}: ${event.oldValue} → ${event.newValue}`);
  }
  deleteData(event : CellClickedEvent){
     const Id = event.data.id;
     console.log(Id);
  }
}
