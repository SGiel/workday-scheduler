var tasks = {
    taskText: '',
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

// start time and end times to show in scheduler by hour - formated in military time
startTime = moment().startOf("date").add(startSchedule,"h").format("HA");
endTime = moment().startOf("date").add(endSchedule,"h").format("HA");

// cretes the time interval array by hours from startTime to endTime
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
    for (i = 0; i < timeArr.length; i++) {
        var hourRow = $("<div>").attr({"class": "row time-block", "id": "hour-row-"+i.toString() });
      
        var hourCol = $("<div>").attr({"class": "hour col-1", "id": "time-"+i.toString()});
        var hourDisplay = $("<p>").text(timeArr[i]);
        hourCol.append(hourDisplay);

        var formCol = $("<form>").attr({"class": "col-11 past", "id": "task-" + i.toString()});
        var formRow = $("<div>").attr("class", "row");
        var taskInput = $("<textarea>").attr({"class": "description col-11", "form": "task-" + i.toString(), "name": "textEntry"});
        
        var saveBtn = $("<button>").attr({"class": "saveBtn col-1", "type": "button", "id": "button-" + i.toString()});
        var saveBtnImg = $("<span>").attr("class", "fas fa-save");
        saveBtn.append(saveBtnImg);

        formRow.append(taskInput, saveBtn);
        formCol.append(formRow);
        hourRow.append(hourCol, formCol);
        
        // append to container on page
        $(".container").append(hourRow);
    }


  };

  // listen for submit on a task and then save it to
 //$()

  createSchedule();

