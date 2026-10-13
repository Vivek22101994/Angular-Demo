import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class CommonService {
  subject = new BehaviorSubject<string>('');  
}
