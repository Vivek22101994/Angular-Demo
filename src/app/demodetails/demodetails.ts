import { Component,inject,OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common/common-service';

@Component({
  imports: [],
  selector: 'app-demodetails',
  styleUrl: './demodetails.css',
  templateUrl: './demodetails.html',
})
export class Demodetails {
  commonService = inject(CommonService);
  constructor(private route:ActivatedRoute,private router :Router){
     this.commonService.subject.subscribe({
      next:(val)=>{
           console.log(val);
      }
    });
  }
  id:number | undefined
  category : string | null = null 
  ngOnInit(){
    this.id= Number(this.route.snapshot.paramMap.get("id"));
    this.route.paramMap.subscribe((param) =>
    {
         this.id = Number(param.get("id"));
    });
    this.route.queryParamMap.subscribe((param) =>
    {
         this.category = param.get("category");
    });
  }
}
