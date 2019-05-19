import { Component, OnInit } from '@angular/core';
import { EmployeeModel, TaskModel, TaskDetailsModel, TaskDatesModel, EmpTaskDatesModel, EmployeeTaskDetailsModel } from './model/addtimesheet.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
    selector: 'app-addtimesheet',
    templateUrl: './addtimesheet.component.html',
    styleUrls: ['./addtimesheet.component.scss']
})
export class AddtimesheetComponent implements OnInit {
    taskList: any;
    taskDatesModel: TaskDatesModel[];
    empTaskDatesModel: EmpTaskDatesModel[] = [];
    employeeList: any;
    employeeTaskDetails: TaskDetailsModel[] = [];
    employeeTaskDetailsNew: TaskDetailsModel[] = [];
    employeeTaskDetailsModel: any;
    TaskDateMasterList: any[];
    employeeId: number;
    days: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    Sunday: number = 0;
    Monday: number = 0;
    Tuesday: number = 0;
    Wednesday: number = 0;
    Thursday: number = 0;
    Friday: number = 0;
    Saturday: number = 0;
    Service: any;
    ModalService: any;

    constructor(private employeeService: EmployeeService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.employeeId = parseInt(this.route.snapshot.queryParams["empid"]);
        this.GetEmployeeList();
        // this.GetTaskList();
        // this.GetEmployeeTaskDetails();
    }

    GetEmployeeList() {
        this.employeeService.getallemployees()
            .subscribe(data => {
                this.employeeList = data;
                this.GetTaskList();
            });
        //this.employeeList = [{ id: 1, code: '001', name: 'Emp 1' }, { id: 2, code: '', name: 'Emp 1' }, { id: 3, code: '', name: 'Emp 1' }];
    }

    GetTaskList() {
        this.employeeService.gettask()
            .subscribe(data => {
                this.taskList = data;
                this.GetEmployeeTaskDetails();
            });
        //this.taskList = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }, { id: 3, name: 'Task 3' }];
    }

    GetEmployeeTaskDetails() {     
        this.empTaskDatesModel =  []; 
        this.employeeTaskDetails = [];
        // this.employeeTaskDetailsModel = [{ empId: 1, taskId: 1,  date: new Date('2019-05-12'), dayName: 'sunday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-13'), dayName: 'monday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-14'), dayName: 'tuesday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-15'), dayName: 'wednesday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-16'), dayName: 'thursday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-17'), dayName: 'friday', hour: 1 },
        // { empId: 1, taskId: 1, date: new Date('2019-05-18'), dayName: 'saturday', hour: 1 }];
        this.employeeService.getemployeetaskdetails(this.employeeId)
            .subscribe(data => {
                this.employeeTaskDetailsModel = data;
                if (this.employeeTaskDetailsModel.length == 0) {
                    let Currentday: number = new Date().getDay();
                    let WeekStart: Date = new Date();
                    WeekStart.setDate(new Date().getDate() - Currentday);
                    for (let i = 0; i < 7; i++) {
                        this.empTaskDatesModel.push({ dayName: this.days[i], date: WeekStart });
                        WeekStart.setDate(WeekStart.getDate() + 1);
                    }
                }
                this.employeeTaskDetailsModel.forEach(obj => {
                    if (this.empTaskDatesModel.findIndex(p => p.dayName == this.days[new Date(obj.taskDate).getDay()]) == -1) {
                        let dname: string = this.days[new Date(obj.taskDate).getDay()];
                        this.empTaskDatesModel.push({ dayName: dname, date: obj.taskDate });
                    }
                });

                let empTaskdet: TaskDetailsModel;
                this.employeeTaskDetailsModel.forEach(obj => {
                    if (this.employeeTaskDetails.findIndex(p => p.taskId == obj.taskId) == -1) {
                        empTaskdet = new TaskDetailsModel();
                        empTaskdet.taskId = obj.taskId;
                        empTaskdet.taskName = this.taskList.find(q => q.id == obj.taskId).name;
                    }
                    else {
                        empTaskdet = this.employeeTaskDetails.find(p => p.taskId == obj.taskId);
                    }
                    empTaskdet[this.days[new Date(obj.taskDate).getDay()]] = obj.hours;

                    if (this.employeeTaskDetails.findIndex(p => p.taskId == obj.taskId) == -1) {
                        if (empTaskdet) { this.employeeTaskDetails.push(empTaskdet); }
                    }
                });
                //this.CalculateSum();
            });
    }


    AddNewTask() {
        let empTaskDet: TaskDetailsModel = new TaskDetailsModel();
        empTaskDet.taskId = 0;
        this.employeeTaskDetailsNew = this.employeeTaskDetailsNew.concat(empTaskDet);
    }

    CalculateSum() {
        this.Sunday = 0;
        this.Monday = 0;
        this.Tuesday = 0;
        this.Wednesday = 0;
        this.Thursday = 0;
        this.Friday = 0;
        this.Saturday = 0;
        this.employeeTaskDetails.forEach(obj => {
            this.Sunday += (obj.sunday ? obj.sunday : 0);
            this.Monday += (obj.monday ? obj.monday : 0);
            this.Tuesday += (obj.tuesday ? obj.tuesday : 0);
            this.Wednesday += (obj.wednesday ? obj.wednesday : 0);
            this.Thursday += (obj.thursday ? obj.thursday : 0);
            this.Friday += (obj.friday ? obj.friday : 0);
            this.Saturday += (obj.saturday ? obj.saturday : 0);
        });

        this.employeeTaskDetailsNew.forEach(obj => {
            this.Sunday += (+(obj.sunday ? obj.sunday : 0));
            this.Monday += (+(obj.monday ? obj.monday : 0));
            this.Tuesday += (+(obj.tuesday ? obj.tuesday : 0));
            this.Wednesday += (+(obj.wednesday ? obj.wednesday : 0));
            this.Thursday += (+(obj.thursday ? obj.thursday : 0));
            this.Friday += (+(obj.friday ? obj.friday : 0));
            this.Saturday += (+(obj.saturday ? obj.saturday : 0));
        });

        this.Sunday = this.Sunday ? this.Sunday : 0;
        this.Monday = this.Monday ? this.Monday : 0;
        this.Tuesday = this.Tuesday ? this.Tuesday : 0;
        this.Wednesday = this.Wednesday ? this.Wednesday : 0;
        this.Thursday = this.Thursday ? this.Thursday : 0;
        this.Friday = this.Friday ? this.Friday : 0;
        this.Saturday = this.Saturday ? this.Saturday : 0;
    }

    SaveTaskDetails() {
        this.employeeTaskDetailsModel= [];
        this.employeeTaskDetailsNew.forEach(obj => {
            this.empTaskDatesModel.forEach(elm => {
                let emptaskdet: EmployeeTaskDetailsModel = new EmployeeTaskDetailsModel();
                //emptaskdet.taskDetId = 0;
                
                emptaskdet.empId = this.employeeId;
                emptaskdet.taskId = obj.taskId;
                emptaskdet.taskDate = new Date(elm.date); 
                emptaskdet.hours = +obj[elm.dayName];
                this.employeeTaskDetailsModel.push(emptaskdet);
            });
        });
        this.employeeService.saveemployeedetails(this.employeeTaskDetailsModel)
            .subscribe(data => {
                this.GetEmployeeTaskDetails();
            })
    }

    BackToList() { { this.router.navigate(['/emplist']); } }
}
