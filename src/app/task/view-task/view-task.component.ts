import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router } from '@angular/router';
import { TaskModel } from '../../entities/task';
import { Project } from '../../entities/project';
import { ViewTaskService } from './view-task.service';
import { TaskService } from '../../utilities/common-service';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css'],
    providers: [ ViewTaskService,ConfirmationService]
})

export class ViewTaskComponent implements OnInit {
    msgs: Message[] = [];

    tasksList: TaskModel[] = [];

    projectsList: Project[] = [];
    selectedProject: String;
    selectedProjectId: Number;

    constructor(private router: Router, private taskService:TaskService, private service: ViewTaskService,private confirmationService:ConfirmationService) { }
    ngOnInit() {
        this.getAllProject();
    }
    assignProject(projName, projId) {
        this.selectedProjectId = projId;
        this.selectedProject = projName;
        this.getAllTask(projId);
    }

    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { this.projectsList = data; });
    }

    getAllTask(id: Number) {
        this.service.getAllTasks()
            .subscribe(data => {
                this.tasksList = data.filter(
                    task => task.projectId === id);
            });
    }
    editTask(task: TaskModel) {
        this.taskService.task=task;
        this.router.navigate(['/edittask']);
        
    }
    endTask(task: TaskModel) {
  
        this.confirmationService.confirm({
            message: 'Are you sure that you want to end this task?',
            accept: () => {
                task.status=false;
                this.service.updateTask(task)
                    .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); });
            }
        });
    }

    showMessage(status: boolean, message: string) {
        this.msgs = [];
        if (status === true) {
            this.msgs.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.msgs.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.getAllTask(this.selectedProjectId);

    }
}