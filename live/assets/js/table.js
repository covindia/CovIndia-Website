// $("#states").DataTable({
//   ajax: "https://test.api.covindia.com/daily-states-complete",
//   columns: [{ data: "NewCases" }]
// });

console.log("Table JS");

var stateData = [];
$.when(
  $.ajax("https://test.api.covindia.com/daily-states-complete").then(
    response => {
      console.log(response);
      stateData = response;
      const data = Object.keys(stateData).map(key => {
        return [
          key,
          stateData[key].NewCases,
          stateData[key].NewDeaths,
          stateData[key].TotalCases,
          stateData[key].TotalDeaths
        ];
      });
      console.log(data);
      $("#states").DataTable({
        data: data,
        pageLength: 5
      });
      console.log(data);
    }
  )
);
