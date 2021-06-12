// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function buildTable(data) {
  // Fill up the table row and data like level 1
  tbody.html("");

  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}



// Keep Track of all filters
var filters = {};

function checkFilters() {

  // Save the element, value, and id of the filter that was changed
  var searchedObject = d3.select(this).select("input");
  var searchValue = searchedObject.property("value");
  var filterTag = searchedObject.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (searchValue) {
    filters[filterTag] = searchValue;
  }
  else {
    delete filters[filterTag];
  }

  // Create a filter function
  filterTable();

}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Place holder for searched items

  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // build the table using the filtered Data again
  buildTable(filteredData);
}

// Create an event listener to handle changes
d3.selectAll(".filter").on("change", checkFilters);

// reloading of the table
buildTable(tableData);