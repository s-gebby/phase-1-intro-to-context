// Define a function to create an employee record
// Define a function to create an employee record
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Define a function to process an array of arrays into an array of employee records
function createEmployeeRecords(employeeData) {
  return employeeData.map((data) => createEmployeeRecord(data));
}

// Define a function to create a time in event for an employee
function createTimeInEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

// Define a function to create a time out event for an employee
function createTimeOutEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

// Define a function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Define a function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Define a function to calculate all wages for an employee
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  return datesWorked.reduce(
    (totalWages, date) => totalWages + wagesEarnedOnDate(employee, date),
    0
  );
}

// Define a function to calculate payroll for multiple employees
function calculatePayroll(employees) {
  return employees.reduce(
    (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
    0
  );
}
