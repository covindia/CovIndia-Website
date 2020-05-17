var stateData = [];
$.when(
  $.ajax("https://v1.api.covindia.com/table-data").then(
    (response) => {
      //console.log(response);
      stateData = response;
      countryTotal = 0;
      countryNew = 0;
      countryDeaths = 0;
      countryNewDeaths = 0;
      countryCured = 0;
      const data = Object.keys(stateData).map((key) => {
        countryTotal += stateData[key].TotalCases;
        countryNew += stateData[key].NewCases;
        countryDeaths += stateData[key].TotalDeaths;
        countryNewDeaths += stateData[key].NewDeaths;
        countryCured += stateData[key].curedTotal;
        return [
          key,
          stateData[key].TotalCases,
          stateData[key].TotalDeaths,
          stateData[key].NewCases,
          stateData[key].NewDeaths,
          stateData[key].curedTotal,
        ];
      });
      data.unshift([
        "India",
        countryTotal,
        countryDeaths,
        countryNew,
        countryNewDeaths,
        countryCured,
      ]);
      var table = $("#states").DataTable({
        data: data,
        pageLength: 5,
        dom: "Bfrtip",
        scrollY: "400px",
        scrollCollapse: true,
        scrollX: false,
        paging: false,
        title: "State-Wise Table",
        order: [[1, "desc"]],
        columnDefs: [
          {
            targets: 0,
            render: function (data, type, full, meta) {
              if (type === "display" && data == "India") {
                var rowIndex = meta.row + 1;
                $("#states tbody tr:nth-child(" + rowIndex + ")").addClass(
                  "tableTotal"
                );
                return data;
              } else {
                return data;
              }
            },
          },
          {
            targets: [1, 2],
            render: function (data, type, full, meta) {
              var increaseInfo =
                '<span class="increase">' + full[meta.col + 2] + "</span>";
              var totalCases = "<span>" + data + "</span>";
              return type === "display" ? increaseInfo + totalCases : data;
            },
          },
        ],
      });

      const options = [
        {
          text: "Select a state...",
          selected: true,
        },
      ];
      data.map((item) => {
        options.push({
          text: item[0],
          value: item[0],
        });
      });

      let optionList = document.getElementById("stateDropdown");
      let optionListMob = document.getElementById("stateDropdownMob");

      options.forEach((option) => {
        console.log(option);
        optionList.add(new Option(option.text, option.value, option.selected));
        optionListMob.add(
          new Option(option.text, option.value, option.selected)
        );
      });
    }
  )
);
