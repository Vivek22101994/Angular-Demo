import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { NameHandler } from '../name-handler/name-handler';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [HeaderComponent,Footer,NameHandler,FormsModule],
  standalone: true,
  selector: 'app-input-ref',
  styleUrl: './input-ref.css',
  templateUrl: './input-ref.html',
})
export class InputRef {
  username = '';
}
