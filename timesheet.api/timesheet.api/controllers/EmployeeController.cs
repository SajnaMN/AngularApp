using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using timesheet.business;
using timesheet.model;

namespace timesheet.api.controllers
{
    [Route("api/v1/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var items = this.employeeService.GetEmployees();
            return new ObjectResult(items);
        }

        [HttpGet("gettask")]
        public IActionResult GetTask()
        {
            var items = this.employeeService.GetTask();
            return new ObjectResult(items);
        }

        [HttpGet("getemployeet")]
        public IActionResult GetEmployeeTaskDetail()
        {
            var items = this.employeeService.GetEmployeeTaskDetail();
            return new ObjectResult(items);
        }

        [HttpGet("getemployeetask/{empid}")]
        public IActionResult GetEmployeeTaskDetails(int Empid)
        {
            var items = this.employeeService.GetEmployeeTask(Empid);
            return new ObjectResult(items);
        }

        [HttpGet("getemployeetaskcal")]
        public IActionResult GetEmployeeTaskDetailCal()
        {
            var items = this.employeeService.GetEmployeeTaskDetailCal();
            return new ObjectResult(items);
        }

        [HttpPost("savedetails")]
        public IActionResult SaveEmployeeTaskDetails([FromBody]List<EmployeeTaskDetail> employeeTaskDetail)
        {
            var items = this.employeeService.SetEmployeeTask(employeeTaskDetail);
            return new ObjectResult(items);
        }
    }
}