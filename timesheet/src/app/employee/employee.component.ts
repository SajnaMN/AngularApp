import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDetails } from './model/employee.model';
import { Router } from '@angular/router';

@Component({
    selector: 'employee-list',
    templateUrl: 'employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class EmployeeListComponent implements OnInit {
    employeedetails: any;
    employees: any;
    employeeTaskCalDetails: any;

    constructor(private employeeService: EmployeeService, private router: Router) { }

    ngOnInit() {
        this.getmploeeDetails();
    }

    getmploeeDetails() {
        this.employeeService.getallemployees().subscribe(data => {
            this.employeedetails = data;

            this.employeeService.getemployeetaskdetailCal()
                .subscribe(data => {
                    this.employeeTaskCalDetails = data;

                    this.employeedetails.forEach(obj => {
                        obj.weeklyTotalEffort = this.employeeTaskCalDetails.find(q => q.empId == obj.id)?this.employeeTaskCalDetails.find(q => q.empId == obj.id).weekTotal : 0;
                        obj.weeklyAverageEffort = this.employeeTaskCalDetails.find(q => q.empId == obj.id)? (this.employeeTaskCalDetails.find(q => q.empId == obj.id).weekAverage):0;
                    });
                });

        }); 
    }

    addTaskSheet(empid: number) {
        this.router.navigate(['/addtask'], { queryParams: { empid: empid } });
    }
}