import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { NameHandler } from '../name-handler/name-handler';
import { FormsModule } from '@angular/forms';
import { single } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  imports: [HeaderComponent,Footer,NameHandler,FormsModule],
  standalone: true,
  selector: 'app-input-ref',
  styleUrl: './input-ref.css',
  templateUrl: './input-ref.html',
})
export class InputRef {
  username = signal('');
  userNames = signal<string[]>([]);

  addNames(){
    const name = this.username().trim();
    if (!name || this.userNames().includes(name)) return;
   
    this.userNames.update(names => [...names, name]);
    // const newArr = [...this.userNames()];
    // newArr.push(name);
    // this.userNames.set(newArr);
     this.username.set(''); 
  }
  selectedUser(id:string){
    this.username.set(id);
  }

}
