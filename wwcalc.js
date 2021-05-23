//This document calculates the war weight when the user inputs their numbers

var num;
var warWeight;
var warWeightBox = document.forms.wwcalc;
"use strict"; // interpret contents in JavaScript strict mode
var dateObject = new Date();
var countdown;
var info = [];
var arrayString;
var origin;
var waitForUser;


function warWeightCalc() {
	num = document.getElementById("wwcalc");
	warWeight = 5 * num.value;
	warWeight = warWeight / 1000;
	
	//check to see if the num is negative
	try {
		if(warWeight < 0) {
			throw "Please enter a number greater than 0(Your number should at least be in the thousands).";
		}
		else {
			document.getElementById("errorMessage").innerHTML = "";
		}
	}
	catch (msg) {
		// displays an error message
		warWeight = "";
		document.getElementById("errorMessage").innerHTML = msg;
	}
	
	document.getElementById("warweight").innerHTML = warWeight;
}

function checkboxes() {
	if(document.getElementById("yesAnswer").checked) {
		document.getElementById("response").innerHTML = "Add ZzCruiserRS#7345 on discord!";
	} else {
		document.getElementById("response").innerHTML = "";
	}
}

function registerInfo(event) {
	var callerElement = event.srcElement;
	var pageEvent = callerElement.value;
	if(callerElement.checked) {
		info.push(pageEvent);
	} else {
		for (var i = 0; i < info.length; i++) {
			if (info[i] === pageEvent) {
				info.splice(i,1);
			}
		}
	}
}

function convertToString() {
	arrayString = info.toString();
}

function displayCalendar(whichMonth) {
	var date;
	var dateToday = new Date();
	var daysOfWeek;
	var daysInMonth;
	var dateCells;
	var captionValue;
	var month;
	var year;
	var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	if (whichMonth === -1) {
		dateObject.setMonth(dateObject.getMonth() -1);
	} else if (whichMonth === 1) {
		dateObject.setMonth(dateObject.getMonth() + 1);
	}
	
	month = dateObject.getMonth();
	year = dateObject.getFullYear();
	dateObject.setDate(1);
	daysOfWeek = dateObject.getDay();
	captionValue = monthArray[month] + " " + year;
	document.querySelector("#cal table caption").innerHTML = captionValue;
	
	if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
		//January, March, May, July, August, October, December
		daysInMonth = 31;
	} else if (month === 1) {
		if (year % 4 === 0) {
			//Leap year test
			if (year % 100 === 0) {
				//Year ending in 00 not a leap year unless divisible by 400
				if (year % 400 === 0) {
					daysInMonth = 29;
				} else {
					daysInMonth = 28;
				}	
			} else {
				daysInMonth = 29;
			}	
		} else {
			daysInMonth = 28;
		}
	} else {
		//Apr, Jun, Sep, Nov
		daysInMonth = 30;
	}
	
	dateCells = document.getElementsByTagName("td");
	for (var i = 0; i < dateCells.length; i++) {
		// clear existing data tables
		dateCells[i].innerHTML = "";
		dateCells[i].className = "";
	}
	
	for (var i = daysOfWeek; i < daysInMonth + daysOfWeek; i++) {
		// add dates to days cells
		dateCells[i].innerHTML = dateObject.getDate();
		dateCells[i].className = "date";
		if (dateToday < dateObject) {
			dateCells[i].className = "futuredate";
		}
		date = dateObject.getDate() + 1;
		dateObject.setDate(date);
	}
	
	dateObject.setMonth(dateObject.getMonth()-1);
	//reset month to month shown
	document.getElementById("cal").style.display = "block";
	//display calendar if it's not already visible
}

function selectDate(event) {
	if (event === undefined) {
		event = window.event;
	}
	var callerElement = event.target || event.srcElement;
	if(callerElement.innerHTML === "") {
		// cell contains no date, so don't close the calendar
		document.getElementById("cal").style.display = "block";
		return false;
	}
	dateObject.setDate(callerElement.innerHTML);
	
	var fullDateToday = new Date();
	var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
	var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
	if (selectedDate >= dateToday) {
		document.getElementById("cal").style.display = "block";
		return false;
	}
	document.getElementById("tripDate").value = dateObject.toLocaleDateString();
	
	hideCalendar();
	updateCountdown();
	
	date = dateObject.toLocaleDateString();
}

function hideCalendar() {
	document.getElementById("cal").style.display = "none";
}

function prevMo() {
	displayCalendar(-1);
}

function nextMo() {
	displayCalendar(1);
}

function updateCountdown() {
	var dateToday = new Date();
	var dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
	var dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()); 
	
	
	//days
	var daysUntil = Math.floor((dateFrom - dateTo) / 86400000);
	document.getElementById("countdown").innerHTML = "You started playing " + daysUntil + " days ago!";
	
}

function resetForm() {
	warWeightCalc();
	createEventListeners();
	
}

function createEventListeners() {
	
	document.getElementById("wwcalc").addEventListener("change", warWeightCalc, false);
	
		var dateField = document.getElementById("tripDate");
	if (dateField.addEventListener) {
		dateField.addEventListener("click", displayCalendar, false);
	} else if (dataField.attachEvent) {
		dateField.attachEvent("onclick", displayCalendar);
	}
	
	var dateCells = document.getElementsByTagName("td");
	if (dateCells[0].addEventListener) {
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].addEventListener("click", selectDate, false);
		} 
	} else if (dateCells[0].attachEvent) {
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].attachEvent("onclick", selectDate);
		}
	}
	
	//close button
	var closeButton = document.getElementById("close");
	if (closeButton.addEventListener) {
		closeButton.addEventListener("click", hideCalendar, false);
	} else if (closeButton.attachEvent) {
		closeButton.attachEvent("onclick", hideCalendar);
	}
	
	//switching months on calendar
	var prevLink = document.getElementById("prev");
	var nextLink = document.getElementById("next");
	if (prevLink.addEventListener) {
		prevLink.addEventListener("click", prevMo, false);
		nextLink.addEventListener("click", nextMo, false);
	} else if (prevLink.attachEvent) {
		prevLink.attachEvent("onclick", prevMo);
		nextLink.attachEvent("onclick", nextMo);
	}
	
	var yes = document.getElementById("yesAnswer")
	if (yesAnswer.addEventListener) {
		yesAnswer.addEventListener("click", checkboxes, false);
	} else if (yesAnswer.attachEvent) {
		yesAnswer.attachEvent("onclick", checkboxes);
	}
	
	//For the array
	var array = document.getElementsByName("info");
	if (array[0].addEventListener) {
      for (var i = 0; i < array.length; i++) {
         array[i].addEventListener("change", registerInfo, false);
      }
   } else if (array[0].attachEvent) {
      for (var i = 0; i < array.length; i++) {
         array[i].attachEvent("onchange", registerInfo);
      }
   }
   
   var button = document.getElementById("submit");
   if (button.addEventListener) {
	   button.addEventListener("click", convertToString, false);
   } else if (button.attachEvent) {
	   button.attachEvent("onclick", convertToString);
   }
   
   geoTest();
}

//resets form 
 if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent ("onload", createEventListeners);
}