var stateData = [];
function daily_states_complete() {
      response = {"Uttar Pradesh":{"TotalCases":7701,"NewCases":0,"TotalDeaths":213,"NewDeaths":0},"Haryana":{"TotalCases":2041,"NewCases":118,"TotalDeaths":20,"NewDeaths":0},"Rajasthan":{"TotalCases":8693,"NewCases":76,"TotalDeaths":194,"NewDeaths":1},"Jammu and Kashmir":{"TotalCases":2341,"NewCases":0,"TotalDeaths":28,"NewDeaths":0},"Karnataka":{"TotalCases":2922,"NewCases":0,"TotalDeaths":49,"NewDeaths":0},"Kerala":{"TotalCases":1209,"NewCases":0,"TotalDeaths":10,"NewDeaths":0},"Andhra Pradesh":{"TotalCases":3569,"NewCases":108,"TotalDeaths":60,"NewDeaths":0},"Maharashtra":{"TotalCases":65168,"NewCases":0,"TotalDeaths":2197,"NewDeaths":0},"Telangana":{"TotalCases":2499,"NewCases":0,"TotalDeaths":77,"NewDeaths":0},"Tamil Nadu":{"TotalCases":21184,"NewCases":0,"TotalDeaths":160,"NewDeaths":0},"Delhi":{"TotalCases":18549,"NewCases":0,"TotalDeaths":416,"NewDeaths":0},"Punjab":{"TotalCases":2233,"NewCases":0,"TotalDeaths":44,"NewDeaths":0},"Uttarakhand":{"TotalCases":749,"NewCases":0,"TotalDeaths":5,"NewDeaths":0},"Orissa":{"TotalCases":1948,"NewCases":129,"TotalDeaths":7,"NewDeaths":0},"Ladakh":{"TotalCases":77,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"West Bengal":{"TotalCases":5130,"NewCases":0,"TotalDeaths":309,"NewDeaths":0},"Puducherry":{"TotalCases":61,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"Chandigarh":{"TotalCases":291,"NewCases":2,"TotalDeaths":4,"NewDeaths":0},"Chhattisgarh":{"TotalCases":447,"NewCases":0,"TotalDeaths":1,"NewDeaths":0},"Gujarat":{"TotalCases":16356,"NewCases":0,"TotalDeaths":1007,"NewDeaths":0},"Himachal Pradesh":{"TotalCases":317,"NewCases":4,"TotalDeaths":5,"NewDeaths":0},"Madhya Pradesh":{"TotalCases":7891,"NewCases":0,"TotalDeaths":343,"NewDeaths":0},"Bihar":{"TotalCases":3565,"NewCases":0,"TotalDeaths":21,"NewDeaths":0},"Manipur":{"TotalCases":66,"NewCases":6,"TotalDeaths":0,"NewDeaths":0},"Mizoram":{"TotalCases":1,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"Goa":{"TotalCases":70,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"Andaman and Nicobar":{"TotalCases":33,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"Jharkhand":{"TotalCases":593,"NewCases":0,"TotalDeaths":5,"NewDeaths":0},"Assam":{"TotalCases":1273,"NewCases":56,"TotalDeaths":4,"NewDeaths":0},"Arunachal Pradesh":{"TotalCases":4,"NewCases":1,"TotalDeaths":0,"NewDeaths":0},"Tripura":{"TotalCases":282,"NewCases":11,"TotalDeaths":0,"NewDeaths":0},"Meghalaya":{"TotalCases":27,"NewCases":0,"TotalDeaths":1,"NewDeaths":0},"Dadra and Nagar Haveli":{"TotalCases":2,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"States Unassigned":{"TotalCases":5491,"NewCases":448,"TotalDeaths":0,"NewDeaths":0},"Sikkim":{"TotalCases":1,"NewCases":0,"TotalDeaths":0,"NewDeaths":0},"Nagaland":{"TotalCases":43,"NewCases":7,"TotalDeaths":0,"NewDeaths":0}}
      //console.log(response);
      console.log("Dummy")
      stateData = response;
      countryTotal = 0;
      countryNew = 0;
      countryDeaths = 0;
      countryNewDeaths = 0;      
      const data = Object.keys(stateData).map((key) => {
        countryTotal += stateData[key].TotalCases;
        countryNew += stateData[key].NewCases;
        countryDeaths += stateData[key].TotalDeaths;
        countryNewDeaths += stateData[key].NewDeaths;        
        return [
          key,
          stateData[key].TotalCases,
          stateData[key].TotalDeaths,
          stateData[key].NewCases,
          stateData[key].NewDeaths,          
        ];
      });
      data.unshift([
        "India",
        countryTotal,
        countryDeaths,
        countryNew,
        countryNewDeaths,        
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
