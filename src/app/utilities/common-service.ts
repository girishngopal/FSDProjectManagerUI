import { Injectable } from '@angular/core';
import { TaskModel } from '../entities/task';


@Injectable()
export class TaskService {

    public task:TaskModel;
    constructor(){
        
    }
}