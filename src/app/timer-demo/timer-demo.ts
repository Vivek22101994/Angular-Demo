
import { Component,inject,OnInit,signal} from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonService } from '../common/common-service';

@Component({
  imports: [HeaderComponent,Footer],
  standalone: true,
  selector: 'app-timer-demo',
  styleUrl: './timer-demo.css',
  templateUrl: './timer-demo.html',
})
export class TimerDemo implements OnInit {
  commonService = inject(CommonService);
  constructor(){
   
  }
   userData = signal({"id":12,"name":"vivek","city":"Surat"});
   counter = signal(0);
   min=signal(0);
   name=signal("test");
   private timer: any;
   ngOnInit() {
     this.timer = setInterval(() => {         
          this.counter.update(value=>value + 1);
          if(this.counter() === 60){
               this.min.update(value=>value + 1);
               this.counter.set(0);
          }
       },1000);
   }
   ngOnDestroy() {
       clearInterval(this.timer) // cleanup, or the timer leaks
  }
  handleClick(event:Event){
     const cityName = (event.target as HTMLSelectElement).value;
     const currentUsers = {...this.userData()};
     currentUsers.city = cityName;
     this.userData.set(currentUsers);    
  }
}
