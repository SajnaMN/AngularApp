using System;
using System.Linq;
using timesheet.data;
using timesheet.model;


namespace timesheet.business
{
    public class TaskDetailsService
    {
        public TimesheetDb db { get; }

        public TaskDetailsService(TimesheetDb dbContext)
        {
            this.db = dbContext;
        }

        public IQueryable<Task> GetTask()
        {
            return this.db.Tasks;
        }
    }
}
