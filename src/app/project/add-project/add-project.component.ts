import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Project } from '../../entities/project';
import { Users } from '../../entities/users';
import { AddProjectService } from './add-project.service';
import { Message, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css'],
    providers: [AddProjectService,ConfirmationService,DatePipe]
})

export class AddProjectComponent implements OnInit {
    msgs: Message[] = [];
    projectsList: Project[];
    usersList: Users[];
    startDate:Date;
    public addOrUpdateBtn: string = 'Add';


    private addProjectForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private service: AddProjectService, private confirmationService: ConfirmationService,private datePipe: DatePipe) {
    }

    ngOnInit() {

        this.formInit();
        this.getUsers();
        this.getAllProject();

    }
    formInit()
    {
        this.addProjectForm = this.formBuilder.group({
            projectId: [0, Validators.required],
            projectNameControl: [null, Validators.required],
            checkDatesControl: [null],
            startDateControl: [this.datePipe.transform(Date.now(),'yyyy-MM-dd').toString()],
            endDateControl: [this.datePipe.transform(Date.now()+86400000,'yyyy-MM-dd').toString()],
            status: ["Active"],
            priorityControl: [null, Validators.required],
            selectedManagerControl: [null, Validators.required],
            selectedManagerName: [null, Validators.required],
            priorityDisplayControl: [null]
        });
    }

    getUsers() {
        this.usersList = [];
        this.service.getUsers()
            .subscribe(data => { this.usersList = data; });
    }
    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { this.projectsList = data; });
    }


    updateProject(project: Project) {
        this.addOrUpdateBtn = 'Update';
        this.addProjectForm = this.formBuilder.group({
            projectId: [project.projectId, Validators.required],
            projectNameControl: [project.projectName, Validators.required],
            checkDatesControl: [project.endDate === null && project.startDate === null ? false : true],
            startDateControl: [this.datePipe.transform(project.startDate,'yyyy-MM-dd').toString()],
            endDateControl:  [this.datePipe.transform(project.endDate,'yyyy-MM-dd').toString()],
            status: [project.status],
            priorityControl: [project.priority, Validators.required],
            selectedManagerControl: [project.managerId, Validators.required],
            selectedManagerName: [project.managerName, Validators.required],
            priorityDisplayControl: [null]
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
        this.addProjectReset();

    }



    addProjectReset() {
        this.addProjectForm.reset();
        this.formInit();
        this.addOrUpdateBtn = 'Add';
    }

    addProjectSubmit() {

        this.service.updateProject({
            projectId: this.addProjectForm.get('projectId').value,
            endDate: this.addProjectForm.get('endDateControl').value,
            startDate: this.addProjectForm.get('startDateControl').value,
            managerId: this.addProjectForm.get('selectedManagerControl').value,
            priority: this.addProjectForm.get('priorityControl').value,
            projectName: this.addProjectForm.get('projectNameControl').value,
            status: this.addProjectForm.get('status').value
        })
            .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); });

    }



    assignManager(userId: number, mgrName: string) {

        this.addProjectForm.patchValue({
            selectedManagerControl: userId,
            selectedManagerName: mgrName
        });
    }

    suspendProject(project: Project) {
  
        this.confirmationService.confirm({
            message: 'Are you sure that you want to suspend project : ' + project.projectName + '?',
            accept: () => {
                project.status="Suspended";
                this.service.updateProject(project)
                    .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); });
            }
        });
    }






}