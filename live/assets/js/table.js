var stateData = [];
$.when(
  $.ajax("https://v1.api.covindia.com/daily-states-complete").then(
    response => {
      console.log(response);
      stateData = response;
      const data = Object.keys(stateData).map(key => {
        return [
          key,
          stateData[key].TotalCases,
          stateData[key].NewCases,
          stateData[key].TotalDeaths,
          stateData[key].NewDeaths
        ];
      });
      var table = $("#states").DataTable({
        data: data,
        pageLength: 5,
        dom: "Bfrtip",
        buttons: ["copyHtml5", "csvHtml5", "pdfHtml5", "excelHtml5"],
        paging: false,
        title: "Confirmed Cases and Deaths by state in India"
      });
      table
        .buttons()
        .container()
        .appendTo("#states_wrapper .col-md-6:eq(0)");
    }
  )
);
