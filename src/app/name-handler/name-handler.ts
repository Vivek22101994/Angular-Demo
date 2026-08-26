import { Component,Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-name-handler',
  styleUrl: './name-handler.css',
  templateUrl: './name-handler.html',
})
export class NameHandler {
  @Input() tname: string = '';

}
