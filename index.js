// Your code here

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

const createEmployeeRecords = (array) => {
    return array.map(element => {
        return createEmployeeRecord(element)   
    });
}

const createTimeInEvent = (record, timeIn) => {
    const [date, hour] = timeIn.split(" ");
    
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return record;
}

const createTimeOutEvent = (record, timeOut) => {
    const [date, hour] = timeOut.split(" ");
    
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });

    return record;
}

const hoursWorkedOnDate = (record, workedDate) => {
    let inTime = record.timeInEvents.find((element) => {
        return element.date === workedDate;
    })

    let outTime = record.timeOutEvents.find((element) => {
        return element.date === workedDate;
    })

    return (outTime.hour - inTime.hour) / 100;
}

const wagesEarnedOnDate = (record, workedDate) => {
    let wage = hoursWorkedOnDate(record, workedDate)
    * record.payPerHour
    return parseFloat(wage.toString())
}

const allWagesFor = (record) => {
    let dates = record.timeInEvents.map(element => {
        return element.date
    })

    let wage = dates.reduce((total, date) => {
        return (total + wagesEarnedOnDate(record, date))
    }, 0)

    return wage
}

const calculatePayroll = (records) => {
    return records.reduce(function(total, record){
        return total + allWagesFor(record)
    }, 0)
}

const findEmployeeByFirstName = (array, firstName) => {
    return array.find((employee) => {
       return employee.firstName === firstName
    })
}