var tasks = {
    taskText: '',
    taskId: 0,
    taskHr: '',
}
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

var timeNow = moment().startOf('hour').format("HA");
//console.log(dateToday);

// create startTime variable of 9am current day
var Time0 = moment().startOf('date');

// start time and end time formated in military time
startTime = moment().startOf("date").add(startSchedule,"h").format("HA");
endTime = moment().startOf("date").add(endSchedule,"h").format("HA");


for (i=0; i<(parseInt(endTime) - parseInt(startTime) + 1); i++) {
    // integer times as military time
    timeArrInt[i] = i + parseInt(startTime);
    // moment times from 9am to 5pm
    timeArr[i] = moment(startTime, "ha").add(i, 'h').format("hA");
}
var addDateToJumbotron = function() {
    // add today's date to jumbotron
    var addDate = $("<p>").text(dateToday);
    $(".jumbotron").append(addDate);
}


var createSchedule = function() {

    addDateToJumbotron();

    // create elements that make up a the schedule 
    var scheduleRow = $("<div>").attr("class", "row");
    var scheduleCol = $("<div>").attr("class", "schedule col-8 offset-2");
   
    for (i = 0; i < timeArr.length; i++) {
        var hourRow = $("<div>").attr({"class": "row", "id": "hour-row-"+i.toString() });
      
        var hourCol = $("<div>").attr({"class": "hour col-1", "id": "time-"+i.toString()});
        var hourDisplay = $("<p>").text(timeArr[i]);
        hourCol.append(hourDisplay);

        var taskCol = $("<form>").attr({"class": "col-10", "id": "task-" + i.toString()});
        var taskInput = $("<textarea>").attr({"class": "description", "form": "task-" + i.toString(), "name": "textEntry"});
        taskCol.append(taskInput);
        
        var saveCol = $("<div>").attr({"class": "col-1", "id": "save-" + i.toString()});
        var saveBtn = $("<button>").attr({"class": "saveBtn", "type": "button", "id": "button-" + i.toString()});
        var saveBtnImg = $("<span>").attr("class", "fas fa-save");
        saveBtn.append(saveBtnImg);
        saveCol.append(saveBtn);

        hourRow.append(hourCol, taskCol, saveCol);
        
        scheduleCol.append(hourRow);
    }
    scheduleRow.append(scheduleCol);
 
    // append to container on the page
    $(".container").append(scheduleRow);

  };

  createSchedule();

