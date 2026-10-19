import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [HeaderComponent,Footer,ReactiveFormsModule],
  selector: 'app-nameform',
  styleUrl: './nameform.css',
  templateUrl: './nameform.html',
})
export class Nameform {
  constructor(){
    this.name.reset();
    console.log("First Step Executed.")
  }
  name = new FormControl("name");
  getName(){
    const name = this.name.value == null ? "" : this.name;
    console.log(name);
    alert('Name: ' + name);
  }
}
