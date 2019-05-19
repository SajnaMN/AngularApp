using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace timesheet.model
{
    public class EmployeeTaskDetailCal
    {
        public int EmpId { get; set; }
        
        public string WeekTotal { get; set; }

        public string WeekAverage { get; set; }

    }
}
