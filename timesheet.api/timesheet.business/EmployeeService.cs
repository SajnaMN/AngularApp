using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using timesheet.data;
using timesheet.model;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace timesheet.business
{
    public class EmployeeService
    {
        public TimesheetDb db { get; }

        public EmployeeService(TimesheetDb dbContext)
        {
            this.db = dbContext;
        }

        public IQueryable<Employee> GetEmployees()
        {
            return this.db.Employees;
        }
        
        public IQueryable<model.Task> GetTask()
        {
            return this.db.Tasks;
        }

        public IQueryable<EmployeeTaskDetail> GetEmployeeTaskDetail()
        {
            return this.db.EmployeeTaskDetails;
        }

        public IQueryable<EmployeeTaskDetail> GetEmployeeTask(int empid)
        {
            return this.db.EmployeeTaskDetails.Where(s => s.EmpId == empid);
        }

        public List<EmployeeTaskDetailCal> GetEmployeeTaskDetailCal()
        {
            List<EmployeeTaskDetailCal> result = this.db.EmployeeTaskDetails.GroupBy(l => l.EmpId).Select(cl => new EmployeeTaskDetailCal
            {
                EmpId = cl.First().EmpId,
                WeekAverage = (cl.Sum(c => c.Hours)/7).ToString(),
                WeekTotal = cl.Sum(c => c.Hours).ToString(),
            }).ToList();
            return result;
        }

        public int SetEmployeeTask(List<EmployeeTaskDetail> employeeTaskDetail)
        {
            try
            {
                db.EmployeeTaskDetails.AddRange(employeeTaskDetail);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
