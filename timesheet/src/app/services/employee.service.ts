import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeTaskDetailsModel } from '../addtimesheet/model/addtimesheet.model';

@Injectable()
export class EmployeeService {
   
    private baseapi = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getallemployees() {
        //return this.http.get(this.baseapi + "/employee/getall");
        return this.http.get(this.baseapi + "/employee/getall");
    }

    gettask() {
        //return this.http.get(this.baseapi + "/employee/getall");
        return this.http.get(this.baseapi + "/employee/gettask");
    }
    
    getemployeetaskdetails(Empid: number) {
        //return this.http.get(this.baseapi + "/employee/getall");
        return this.http.get(this.baseapi + "/employee/getemployeetask/" + Empid);
    }
    
    getemployeetaskdetailCal() {
        //return this.http.get(this.baseapi + "/employee/getall");
        return this.http.get(this.baseapi + "/employee/getemployeetaskcal");
    }
        
    saveemployeedetails(employeeTaskDetailsModel: any) {
        return this.http.post(this.baseapi + "/employee/savedetails", employeeTaskDetailsModel);
    }
}