using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace timesheet.model
{
    public class EmployeeTaskDetail
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int? TaskDetId { get; set; }

        [Required]
        public int EmpId { get; set; }

        [Required]
        public int TaskId { get; set; }

        [Required]
        public DateTime TaskDate { get; set; }

        [Required]
        public int Hours { get; set; }
    }

}
