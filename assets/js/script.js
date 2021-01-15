var schedule = [];

// count for tasks array
var index = 0;
// start the scheduler at 9am
var startSchedule = 9;
// end the scheduler at 5pm
var endSchedule = 17;
var timeArrInt = [];
var timeArr = [];

// get today's date    
var dateToday = moment().format("dddd, MMMM Do");

// gets time rounded down to nearest hour 0-23 format
var timeNow = moment().startOf('hour').format("HA");

// gets time as integer 0-23 hour format
var timeNowInt = parseInt(timeNow.replace(/\D/g,''));

// puts today's date in jumbotron
var addDateToJumbotron = function() {
    // add today's date to jumbotron
    var addDate = $("<p>").text(dateToday);
    $(".jumbotron").append(addDate);
}

// creates the hour time intervals to go on schedule
var createHourSlots = function () {
    // start time and end times to show in scheduler by hour - formated 0-23
    var startTime = moment().startOf("date").add(startSchedule,"h").format("HA");
    var endTime = moment().startOf("date").add(endSchedule,"h").format("HA");
    
    // creates the time interval array by hours from startTime to endTime 
    for (i=0; i<(parseInt(endTime) - parseInt(startTime) + 1); i++) {
        // integer times as 0-23 hours
        timeArrInt[i] = i + parseInt(startTime);
        // moment times from 9am to 5pm
        timeArr[i] = moment(startTime, "ha").add(i, 'h').format("hA");
    }
}

var loadSchedule = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!schedule) {
        schedule = [];
    }
};

// save schedule to localStorage
var saveSchedule = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var checkTextEntry = function(hourSlot) {
    var textFromStorage='';
    for (j = 0; j < schedule.length; j++) {
        if (hourSlot === schedule[j].scheduleHr) {
            textFromStorage = schedule[j].scheduleText;
        }
    }
    return textFromStorage;
}

var createSchedule = function() {

    addDateToJumbotron();

    createHourSlots();

    loadSchedule();

    // initializes all times in the timeArr as being in past
    var formClass = "past";
    
    // create elements that make up a the schedule 
    for (i = 0; i < timeArr.length; i++) {
        if (timeNowInt === timeArrInt[i]) {
            formClass = "present";
        } else if (timeNowInt < timeArrInt[i]) {
            formClass = "future";
        } else {
            formClass = "past";
        }

        var textEntry = checkTextEntry(timeArr[i]);
        
        var hourRow = $("<div>").attr({"class": "row time-block", "id": "hour-row-"+i.toString() });
      
        var hourCol = $("<div>").attr("class", "hour col-1");
        var hourDisplay = $("<p>").text(timeArr[i]);
        hourDisplay.attr("id", "time-" + i.toString());
        hourCol.append(hourDisplay);

        var formCol = $("<form>").attr("class", "col-11 " + formClass);
        var formRow = $("<div>").attr("class", "row");
        var taskInput = $("<textarea>").attr({"class": "description col-11", 
            "id": "task-" + i.toString(), "form": "task-" + i.toString(), "name": "textEntry"});
        taskInput.val(textEntry);
        
        var saveBtn = $("<button>").attr({"class": "saveBtn col-1", "type": "button", "id": "button-" + i.toString()});
        var saveBtnImg = $("<i>").attr("class", "fas fa-save");
        saveBtn.append(saveBtnImg);

        formRow.append(taskInput, saveBtn);
        formCol.append(formRow);
        hourRow.append(hourCol, formCol);
        
        // append to container on page
        $(".container").append(hourRow);
    }
// end of createSchedule function
};

// listen for submit on a task and then save it to
$(".container").on("click", "button", function(event) {

    var indexStr = $(this).attr("id").replace("button-", "");
    var index = parseInt(indexStr);
    var tempObj = {};
    
    // get index by removing button- from the id and then find task-# id
    scheduleText = $("#task-"+ indexStr).val().trim();
    scheduleHr = $("#time-" + indexStr).text();
   
    // checking if text was already writtn in the hour slot, and if so, it is 
    // replacing it with the new text
    var hourFound = false;
    if (schedule) {
        for (i = 0; i < schedule.length; i++) {
            if (scheduleHr === schedule[i].scheduleHr) {
                schedule[i].scheduleText = scheduleText;
                hourFound = true;
            }
        }
    }
    tempObj.scheduleHr = scheduleHr;
    tempObj.scheduleText = scheduleText;
    if (!hourFound) {
        schedule.push(tempObj);
    }
    
    saveSchedule();

});

  createSchedule();

