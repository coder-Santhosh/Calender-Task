const calender = document.querySelector(".caln"),
  month_year = document.querySelector(".month-year"),
  _days = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  today_btn = document.querySelector(".today"),
  go_btn = document.querySelector(".go"),
  date = document.querySelector(".date"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventFormBtn = document.querySelector(".add-event-btn");
  
let today = new Date(),
  month = today.getMonth(),
  year = today.getFullYear(),
  activeDay;

const Months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const eventsArr = [
  {
    day: 10,
    month: 9,
    year: 2023,

    events: [
      {
        title: "welcome to Event 1",
        time: "12:00 pm",
      },
      {
        title: "welcome to Event 2",
        time: "02:00 pm",
      },
    ],
  },

  {
    day: 20,
    month: 9,
    year: 2023,

    events: [
      {
        title: "welcome to Event 3",
        time: "12:00 pm",
      },
      {
        title: "welcome to Event 4",
        time: "02:00 pm",
      },
    ],
  }
];

// let eventsArr =  []; // set an empty array
// getEvents();  // call get items from local storage

function Calender(){
    const prevMlastDay = new Date(year, month, 0);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1,0);
      const prevMdates = firstDay.getDay();
      const prevMdate  = prevMlastDay.getDate();
      const firstDate = firstDay.getDate();
      const lastDate = lastDay.getDate();
      const nextMdates = 7 - lastDay.getDay() -1;

    month_year.innerHTML = Months[month]+" "+year;
    let dayss = ' ';
    for(let n = prevMdates; n >0; n--){
        dayss += `<div class= "day prev-date" > ${prevMdate -n +1} </div>`;
    }

    // current month days
    for(let x = 1; x <= lastDate; x++){
        
        let event = false;
        eventsArr.forEach( (eventObj) => {
          if(eventObj.day === x && eventObj.month === month+1 && eventObj.year === year){
            event = true;
          }
        })

        if(x === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()){
          activeDay = x;
          getEventActiveDay(x);
          updateEvents(x);
          if(event){
            dayss += `<div class= "day activ task" data-date= ${x}> ${x} </div>`;
          }

          else{
            dayss += `<div class= "day activ" data-date= ${x}> ${x} </div>`;
          }
        }
        else{
          if(event){
            dayss += `<div class= "day task" data-date= ${x}> ${x} </div>`;
          }

          else{
            dayss += `<div class= "day" data-date= ${x}> ${x} </div>`;
          }
          // dayss += `<div class= "day" data-date=${x}> ${x} </div>`;
        }
    }

    for(let y=1; y <= nextMdates; y++){
      dayss += `<div class= "day next-date"> ${y} </div>`;
    }
    _days.innerHTML = dayss;

    // add listner after calendar initialized
    addListner();
}

Calender();

function prevMonth(){
  month--;
  if(month<0){
    month=11;
    year--;
  }
  Calender();
}

function nextMonth(){
  month++;
  if(month>11){
    month=0;
    year++;
  }
  Calender();
}

prev.addEventListener("click",prevMonth);
next.addEventListener("click",nextMonth);

today_btn.addEventListener("click",() =>{
  date.value = "";
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  Calender();
})

date.addEventListener('input', () => {
  // Remove all non-numeric characters
  let numericValue = date.value.replace(/\D/g, "");
  if (numericValue.length > 8) {
    // numericValue = numericValue.substring(0, 8);
    numericValue = numericValue.slice(0, 8);
  }
  // Insert hyphens after every two digits
  let formattedValue = numericValue
    .replace(/^(.{2})(.{0,2})(.{0,4})$/, (_, p1, p2, p3) => {
      let parts = [p1];
      if (p2) parts.push(p2);
      if (p3) parts.push(p3);
      return parts.join('-');
    })
    .substr(0, 10);

    date.value = formattedValue;
});

go_btn.addEventListener("click", () =>{
  const dates = date.value.split("-");
  console.log(dates)
  if(dates.length===3){
    if(dates[1]>0 && dates[1]<13 && dates[2].length === 4){
      const godate = parseInt(dates[0]);
      month = dates[1] - 1;
      year = dates[2];
      Calender();
      // updateEvents(godate);
      const selectedDate = _days.querySelector(`.day[data-date="${parseInt(dates[0])}"]`);
      // selectedDate.classList.add('flicker');
    //   _days.querySelectorAll('.day').forEach(dateElement => {
    //     dateElement.classList.remove('selected');
    // });

    // Add the .selected class to the selected date
    selectedDate.classList.add('flicker');

    //   setTimeout(() => {
    //     selectedDateElement.classList.remove('flicker');
    // }, 3000);

    selectedDate.addEventListener('animationend', () => {
      selectedDate.classList.remove('flicker');
  }, {once: true})
      return;
    }
  }
    alert("Enter Valid date");
})

const addEventBtn = document.querySelector(".add-event-form-btn"),
  addEventContainer = document.querySelector(".add-event"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventName = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", ()=>{
  addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", ()=>{
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e)=>{
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target)){  
  addEventContainer.classList.remove("active");
  }
});

addEventName.addEventListener("input", (e)=>{
  addEventName.value = addEventName.value.slice(0,20);
});

addEventFrom.addEventListener('input', (e)=>{
  addEventFrom.value = addEventFrom.value.replace(/[^\d:]/g, "");
  if(addEventFrom.value.length === 2){
    addEventFrom.value += ":";
  }
  if(addEventFrom.value.length>5){
    addEventFrom.value = addEventFrom.value.slice(0,5);
  }
});

addEventTo.addEventListener('input', (e)=>{
  addEventTo.value = addEventTo.value.replace(/[^\d:]/g, "");
  if(addEventTo.value.length === 2){
    addEventTo.value += ":";
  }
  if(addEventTo.value.length>5){
    addEventTo.value = addEventTo.value.slice(0,5);
  }
});

// func to add listner on days after rendered
function addListner(){
  const days = document.querySelectorAll(".day"); 
  days.forEach( (day) => {
    day.addEventListener("click", (e) =>{
      // set current day as active day
      activeDay = Number(e.target.innerHTML);

      // call activeEventDay after click
      getEventActiveDay(e.target.innerHTML);

      //display events for that day
      // updateEvents(activeDay);
      updateEvents(Number(e.target.innerHTML));

      //remove active class from alredy active day class
      days.forEach( (day) => {
        day.classList.remove("activ");
      });

      //if prev month day clicked goto prev month and add active day class
      if(e.target.classList.contains("prev-date")){
        prevMonth();

        setTimeout( () =>{
          //select all days of that month
          const days = document.querySelectorAll(".day");

          // after going to prev month add actve day to clicked
          days.forEach( (day) => {
            if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML){
              day.classList.add("activ");
            }
          });
        }, 100);
      }

      // for next month days clicked
      else if(e.target.classList.contains("next-date")){
        nextMonth();
  
        setTimeout( () =>{
          //select all days of that month
          const days = document.querySelectorAll(".day");

          // after going to next month add actve day to clicked
          days.forEach( (day) => {
            if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML){
              day.classList.add("activ");
            }
          });
        }, 100);
      }

      // remaining current month days
      else{
        e.target.classList.add("activ");
      }
    });
  });
}

function getEventActiveDay(date){
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + Months[month] + " " + year;
}

// func to show events of that day
function updateEvents(date){
  let events = "";
  eventsArr.forEach( (event) =>{
    // gett events of active day
    if(date === event.day && month+1 === event.month && year === event.year){
      // then display event on document
      event.events.forEach( (event) => {
        events += `<div class="event">
          <div class="title">
              <i class = "fas fa-circle"></i>
              <h2 class="e-title">${event.title}</h2>
          </div>
          <div class="e-time">${event.time}</div>
       </div>`;
      });
    }
  });

  // if no events
  if( events === ""){
    events += `<div class = "no-event">
                  <h3>no events</h3>
               </div>`;
  }

  eventsContainer.innerHTML = events;

  // save events when updateEvent called
  eventStorage();
}

// func to add events after filling event form
addEventFormBtn.addEventListener("click", () => {
  const eventName = addEventName.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  if(eventName === '' && eventTimeFrom === '' || eventTimeTo === ''){
    alert("Please Fill The Fields");
    // return;
  }

  const timeFrom = eventTimeFrom.split(":"),
    timeTo = eventTimeTo.split(":");

  if(timeFrom.length !== 2 || timeTo.length !== 2 || timeFrom[0] > 23 || timeFrom[1] > 59 || timeTo[0] > 23 || timeTo[1] > 59){
      alert("Invalid Time Format");
  }

  const timeFromFormat = convertTime(eventTimeFrom),
    timeToFormat = convertTime(eventTimeTo);

  const newEvent = {
    title : eventName,
    time : timeFromFormat + " - " + timeToFormat,
  };

  let eventAdded = false;

  // check eventsArr not empty
  if(eventsArr.length > 0){
    // check any current day has already event then add to that
    eventsArr.forEach( (evt) =>{
      if(evt.day === activeDay && evt.month === month+1 && evt.year === year){
        // pust to events
        evt.events.push(newEvent);
        eventAdded = true;
      }
    })
  }

  //if event array empty or current day has no event
  if(!eventAdded){
    // push to eventArr since it is empty
    eventsArr.push({
      day: activeDay,
      month: month+1,
      year: year,
      events :[newEvent],
    });
  }

  // once a event added remove the active class from events form
  addEventContainer.classList.remove("active");
  // clear all form fields
  addEventName.value = '';
  addEventFrom.value = '';
  addEventTo.value = '';

  //show current added event
  updateEvents(activeDay);

  // also to add task class to newly added event
  const activeEventDay = document.querySelector(".day.activ");
  if(!activeEventDay.classList.contains("task")){
    activeEventDay.classList.add("task");
  }
});

// func to convert time format
function convertTime(time){
  let timeArr = time.split(":"),
    timeHr = timeArr[0],
    timeMin = timeArr[1],
    timeFormat = timeHr <= 12 ? "AM" : "PM";
  
  timeHr = timeHr%12 || 12;
  time = timeHr + ":" + timeMin + " " + timeFormat;
  return time;

}

// func to delete the event
eventsContainer.addEventListener("click", (e) =>{
  if(e.target.classList.contains("event")){
    const evtName = e.target.children[0].children[1].innerHTML;
    // get evt name and search in array by name and delete
    eventsArr.forEach((event) =>{
      if(event.day===activeDay && event.month === month+1 && event.year === year){
        event.events.forEach((item , index) =>{
          if(item.title === evtName){
            event.events.splice(index, 1);
          }
        });

      // if no remaining events than remove completeday and also the task class
      if(event.events.length === 0){
        eventsArr.splice(eventsArr.indexOf(event),1);

        // also remove the task class
        const activeEventDay = document.querySelector(".day.activ");
        if(activeEventDay.classList.contains("task")){
          activeEventDay.classList.remove("task");
        }
      }
      }
    });

    // after deleting from array update event
    updateEvents(activeDay);
  }
});

// local storage for events
function eventStorage(){
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// to get events from local storage
function getEvents(){
  if(localStorage.getItem("events" === null)){
    return ;
  }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  
}