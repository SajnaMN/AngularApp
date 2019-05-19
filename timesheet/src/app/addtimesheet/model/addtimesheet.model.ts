

export class TaskModel {
    id: number;
    name: string;
}

export class EmployeeModel {
    id: number;
    code: string;
    name: string;
}

export class TaskDatesModel {
    date: Date;
    dayName: string;
}

export class EmpTaskDatesModel {
    date: Date;
    dayName: string;
}

export class TaskDetailsModel {
    empId: number;
    taskId: number;  
    taskName: string;   
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
}

export class EmployeeTaskDetailsModel{
    empId: number;
    taskId: number;
    taskDate: Date;
    hours: number;
}
