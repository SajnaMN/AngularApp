import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee.component';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';

const routes: Routes = [

    // { path: '', redirectTo: 'emplist' },
    { path: 'emplist', component: EmployeeListComponent },
    { path: 'addtask', component: AddtimesheetComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }