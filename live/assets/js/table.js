var stateData = [];
$.when(
  $.ajax("https://v1.api.covindia.com/daily-states-complete").then(
    response => {
      //console.log(response);
      stateData = response;
      countryTotal = 0
      countryNew = 0
      countryDeaths = 0
      countryNewDeaths = 0
      const data = Object.keys(stateData).map(key => {
        countryTotal += stateData[key].TotalCases
        countryNew += stateData[key].NewCases
        countryDeaths += stateData[key].TotalDeaths
        countryNewDeaths += stateData[key].NewDeaths
        return [
          key,
          stateData[key].TotalCases,
          stateData[key].NewCases,
          stateData[key].TotalDeaths,
          stateData[key].NewDeaths
        ];
      });
      data.unshift(["India", countryTotal, countryNew, countryDeaths, countryNewDeaths])
      var table = $("#states").DataTable({
        data: data,
        pageLength: 5,
        dom: "Bfrtip",
        buttons: ["copyHtml5", "csvHtml5", "pdfHtml5", "excelHtml5"],
        paging: false,
        title: "Confirmed Cases and Deaths by state in India",
        "order": [[1, "desc"]],
        columnDefs: [
          {
            "targets": 0,
            render: function (data, type, full, meta) {
              if (type === 'display' && data == 'India') {
                var rowIndex = meta.row + 1;
                $('#states tbody tr:nth-child(' + rowIndex + ')').addClass('tableTotal');
                return data;
              } else {
                return data;
              }
            }
          }
        ]
      });



      table
        .buttons()
        .container()
        .appendTo("#states_wrapper .col-md-6:eq(0)");


      const options = [
        {
          text: "Select a state...",
          selected: true
        }
      ]
      data.map(item => {
        options.push({
          text: item[0],
          value: item[0]
        })
      })

      let optionList = document.getElementById('stateDropdown')
      let optionListMob = document.getElementById("stateDropdownMob")
      options.forEach(option => {
        optionList.add(new Option(option.text, option.value, option.selected))
        optionListMob.add(new Option(option.text, option.value, option.selected))
      })
    }
  )
);
