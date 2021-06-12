// from data.js
const tableData = data;

// get table references with d3.select()
const tbody = d3.select("tbody");

function buildTable(data){

  tbody.html("");

  data.forEach((dataRow) => {
    // Append a row to the table body
    const row = tbody.append("tr");
  
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
        cell.text(val);
      }
    );
  });

}

  // Create a function to handle clicks

  function handleClick() {
    const date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    }
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }
  
  // Create an event listener to record the clicks
  d3.selectAll("#filter-btn").on("click", handleClick);
  
  // Build the table when the page loads
  buildTable(tableData);