import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../entities/project';
import { TaskModel } from '../../entities/task';
import { Users } from '../../entities/users';
import { ViewTaskService } from '../view-task/view-task.service';
import { ParenTask } from '../../entities/parent-task';
import { AddUserComponent } from '../../user/add-user/add-user.component';
import { AddUserService } from '../../user/add-user/add-user.service';
import { Message } from 'primeng/api';
import { TaskService } from '../../utilities/common-service';


@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [ViewTaskService, AddUserService]
})

export class AddTaskComponent implements OnInit {
    formMode: String = 'Add Task';
    btnMode: String = 'Add';
    msgs: Message[] = [];
    selectedProject: string = '';
    selectedUser: string = '';
    selectedTask: string = '';
    selectedUserId: Number = null;
    selectedPTaskId: Number = null;
    selectedProjectId: Number = null;

    projectsList: Project[] = [];
    parentTasksList: ParenTask[] = [];

    usersList: Users[] = [];

    private myForm: FormGroup;
    private addTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private taskService: TaskService,
        private service: ViewTaskService,
        private userService: AddUserService
    ) {



        // check the route for edit and then subscribe to data service
        if (this.router.url === '/edittask') {
            if (this.taskService.task !== null) {
                this.editMode();
                this.onFormEditInit(this.taskService.task);

            }
        }

        else {
            this.onFormInit();
            this.enableControls();
        }
        
        // this.addTaskForm.valueChanges.subscribe(() => {
        //     if (this.addTaskForm.controls['IsParentTaskControl'].value === true) {
        //         this.disableControls();
        //     }
        //     else {
        //         this.enableControls();


        //     }
        // });
    }
    handleChange(event)
        {
            console.log(this.addTaskForm.get('IsParentTaskControl').value);
            debugger;
            if (this.addTaskForm.get('IsParentTaskControl').value==false)
            {
                this.enableControls();
            } 
            else{
                this.disableControls();
            }
        }

    disableControls() {
        this.addTaskForm.get('priorityControl').disable();
        this.addTaskForm.get('priorityDisplayControl').disable();
        this.addTaskForm.get('StartDateControl').disable();
        this.addTaskForm.get('EndDateControl').disable();
    }
    enableControls()
    {
        this.addTaskForm.get('priorityControl').enable();
        this.addTaskForm.get('StartDateControl').enable();
        this.addTaskForm.get('EndDateControl').enable();
        this.addTaskForm.get('priorityDisplayControl').enable();
    }
    onFormInit() {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [0],
            ProjectIdControl: [null, Validators.required],
            taskNameControl: [null, Validators.required],
            IsParentTaskControl: [false],
            priorityControl: [null, Validators.required],
            priorityDisplayControl: [null],
            ParentTaskControl: [null],
            StartDateControl: [null, Validators.required],
            EndDateControl: [null, Validators.required],
            UserIdControl: [null]
        });
    }
    onFormEditInit(task: TaskModel) {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [task.taskId],
            ProjectIdControl: [task.projectId, Validators.required],
            taskNameControl: [task.taskName, Validators.required],
            IsParentTaskControl: [task.parentId === null ? true : false],
            priorityControl: [task.priority, Validators.required],
            priorityDisplayControl: [task.priority],
            ParentTaskControl: [task.parentId],
            StartDateControl: [task.endDate, Validators.required],
            EndDateControl: [task.startDate, Validators.required],
            UserIdControl: [task.userId]
        });
        this.selectedProject = task.projectName;
        this.selectedUser = task.userName;
        this.selectedPTaskId = task.parentId;
        this.selectedTask = task.parentName;
    }

    ngOnInit() {
        this.getAllProject();
        this.getAllParentTask();
        this.getAllUsers();
    }

    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { this.projectsList = data; });
    }
    getAllParentTask() {
        this.projectsList = [];
        this.service.getAllParentTasks()
            .subscribe(data => { debugger; this.parentTasksList = data; });
    }

    getAllUsers() {
        this.usersList = [];
        this.userService.getUsers()
            .subscribe(data => { this.usersList = data; });
    }



    clearDate(): void {
        // Clear the date using the patchValue function
        this.addTaskForm.reset();
    }

    selectProject(projectName, projectId) {
        this.selectedProjectId = projectId;
        this.selectedProject = projectName;
        this.addTaskForm.patchValue({
            ProjectIdControl: projectId
        });
    }

    assignUser(userId, userName) {
        this.selectedUserId = userId;
        this.selectedUser = userName;
        this.addTaskForm.patchValue({
            UserIdControl: userId
        });
    }

    selectPTask(pTaskId, ptaskName) {
        this.selectedPTaskId = pTaskId;
        this.selectedTask = ptaskName;
        this.addTaskForm.patchValue({
            ParentTaskControl: pTaskId
        });
    }

    addTaskSubmit() {


        this.service.updateTask({
            taskId: this.addTaskForm.get('TaskId').value,
            endDate: this.addTaskForm.get('EndDateControl').value,
            projectId: this.addTaskForm.get('ProjectIdControl').value,
            startDate: this.addTaskForm.get('StartDateControl').value,
            parentId: this.addTaskForm.get('ParentTaskControl').value,
            priority: this.addTaskForm.get('priorityControl').value,
            status: true,
            taskName: this.addTaskForm.get('taskNameControl').value,
            userId: this.addTaskForm.get('UserIdControl').value
        })
            .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); this.clearDate(); });

    }

    editMode() {

        this.formMode = 'Edit Task';
        this.btnMode = 'Update';
    }

    showMessage(status: boolean, message: string) {
        this.msgs = [];
        if (status === true) {
            this.msgs.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.msgs.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.getAllProject();

    }


}