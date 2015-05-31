"use strict"

function createButtons() {
  $("span.actionButtonLabel").each(function(i, span) {

    if (span.innerText === "Submit") {

      var $button = $("<button type='button'>FreeAgent Invoice</button>")
        .click(onClick)

      $(span).parent().parent()
        .prepend($button)

    }
  })
}

function onClick() {
  var timesheet = retrieveTimesheet()
  console.log(timesheet)
}

function retrieveTimesheet() {
  var $table = $("table.dayAsColumnEntryTable").eq(1)
    , totalDaysWorked = parseInt($table.find("td:last").text())
    , friday = $table.find("th").eq(6).text()
    , fridayDate = retrieveDate(friday)

  return {
    days: totalDaysWorked,
    weekEndDate: fridayDate
  }
}

/**
 * Retrieves a date object from a string such as "Fri 01/06/15"
 */
function retrieveDate(str) {

  str = str.substr(4)

  var dateParts = str.split("/")
    , day = parseInt(dateParts[0])
    , month = parseInt(dateParts[1]) - 1
    , year = parseInt("20" + dateParts[2])

    , date = new Date(year, month, day)

  return date
}

createButtons()