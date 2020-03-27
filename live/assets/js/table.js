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
      var table = $("#states").DataTable({
        data: data,
        pageLength: 5,
        dom: "Bfrtip",
        buttons: ["copyHtml5", "csvHtml5", "pdfHtml5", "excelHtml5"],
        paging: false
      });
      table
        .buttons()
        .container()
        .appendTo("#states_wrapper .col-md-6:eq(0)");
    }
  )
);
