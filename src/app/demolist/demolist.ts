import { HttpClient } from '@angular/common/http';
import { Component,OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';

@Component({
  imports: [HeaderComponent,Footer],
  selector: 'app-demolist',
  styleUrl: './demolist.css',
  templateUrl: './demolist.html',
})
export class Demolist {
   constructor(private http:HttpClient,private router:Router){}
   listData=signal<any>([]);
   private backupList: any = [];
   isLoading=signal(true);
   isError = signal(false);
   isDeleted = signal(false);
   deletedid: number | undefined;
   private hideTimer?: ReturnType<typeof setTimeout>;
   ngOnInit(){
    console.log("hellp");
     this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe
     ({
       next:(data)=>{
          this.listData.set(data);       
       },
       error:(error)=>{
           console.log("Something Went Wrong While Load Data",error);
           this.isLoading.set(false);
           this.isError.set(true);
       },
       complete:()=>{
           console.log("Load Complate");
           this.isLoading.set(false);
       }  
     }); 
   };
   handleClick(id:number){
       this.deletedid = id;
       this.backupList = [...this.listData()];
       this.isDeleted.set(true);      
       this.listData.update(list => list.filter((d: any) => d.id !== id));
       clearTimeout(this.hideTimer);
       this.hideTimer = setTimeout(()=>{
            // Call The Delete API Logic
            this.isDeleted.set(false);
       },2000)
      // this.router.navigate(["/details",id]);
   };
   handleRevart(){
       this.listData.set(this.backupList);
       this.isDeleted.set(false);
   }
   ngOnDestroy() {
     clearTimeout(this.hideTimer);
   }
}
