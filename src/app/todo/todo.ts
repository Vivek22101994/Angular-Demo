import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  imports: [HeaderComponent,Footer],
  selector: 'app-todo',
  styleUrl: './todo.css',
  templateUrl: './todo.html',
})
export class Todo {
  userData = signal([{"id":1,"name":"vivek"}])
  name = signal('');
  handleClick(){
  if(this.name()){
    const obj = {
       id: this.name().length,
       name: this.name().toString()
   } 
   const newarr = [...this.userData()];
   newarr.push(obj);
   this.userData.set(newarr);
   this.name.set('');
  } 
  }
  handleDeleteClick(id:number){
    const newarr = [...this.userData()];
    const index = newarr.findIndex(x=>x.id === id);
    if(index != -1){
          newarr.splice(index,1);
          this.userData.set(newarr);
    }
  }
}
