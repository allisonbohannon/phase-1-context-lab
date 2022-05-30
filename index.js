/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: [],
    }
}; 

function createEmployeeRecords(arr) {
    const recordsArray = arr.map(record => createEmployeeRecord(record))
    return recordsArray; 
}; 

function createTimeInEvent(dateStamp) {
    this.timeInEvents = [...this.timeInEvents, {
        type: 'TimeIn', 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10),
    }]
    return this; 
}; 

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents = [...this.timeOutEvents, {
        type: 'TimeOut', 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10),
    }]
    return this; 
}; 

function hoursWorkedOnDate(dateStamp) {
    console.log(this)
    let startEvent = this.timeInEvents.find(event => event.date === dateStamp)
    let endEvent = this.timeOutEvents.find(event => event.date === dateStamp)
    return (endEvent.hour - startEvent.hour)/100;   
}; 

function wagesEarnedOnDate(dateStamp) {
    const hours = hoursWorkedOnDate.call(this, dateStamp);
    return hours * this.payPerHour; 
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}; 

function calculatePayroll(arr) {
    return arr.reduce((prevValue, currentValue) => prevValue + allWagesFor.call(currentValue), 0)
}; 

