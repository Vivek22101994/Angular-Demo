import { Component,EventEmitter,Input, Output, output, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-name-handler',
  styleUrl: './name-handler.css',
  templateUrl: './name-handler.html',
})
export class NameHandler {
  @Input() tname: string = '';
  @Input() index!: number;
  @Output() selectedUser = new EventEmitter();
  
  select(id:string){
    this.selectedUser.emit(id);
  }
  
}
