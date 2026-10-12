import { Component,OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-demodetails',
  styleUrl: './demodetails.css',
  templateUrl: './demodetails.html',
})
export class Demodetails {
  constructor(private route:ActivatedRoute,private router :Router){}
  id:number | undefined
  ngOnInit(){
    this.id= Number(this.route.snapshot.paramMap.get("id"));
    this.route.paramMap.subscribe((param) =>
    {
         this.id = Number(param.get("id"));
    });
  }
}
