import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private taskBlock = new BehaviorSubject<any>(null);
  taskMessage = this.taskBlock.asObservable();

  constructor() { }


  sendTaskBlock(block: any) {
      this.taskBlock.next(block);
  }

  clearTaskBlock() {
      this.taskBlock = null;
  }

}