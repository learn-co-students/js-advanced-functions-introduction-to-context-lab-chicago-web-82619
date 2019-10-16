const createEmployeeRecord = (arr) => {
    const newEE = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return newEE
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

const createTimeInEvent = (ee, stamp) => {
    let [date, hour] = stamp.split(' '); 

    ee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return ee
}

const createTimeOutEvent = (ee, stamp) => {
    let [date, hour] = stamp.split(' ');
    ee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return ee;
}

const hoursWorkedOnDate = (ee, date) => {
    let timeIn = ee.timeInEvents.find(function(event) {
        return event.date === date;
    });
    let timeOut = ee.timeOutEvents.find(function(event){
        return event.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (ee, date) => {
    let hours = hoursWorkedOnDate(ee, date);
    return hours * ee.payPerHour;
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(function(ee){
        return ee.firstName === firstName
    });
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}