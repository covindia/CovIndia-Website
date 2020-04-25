var labels = [];
var tested = [];
var positive = [];

$.when(
  $.ajax("https://v1.api.covindia.com/testing-data").then((response) => {
    labels = response.date;
    tested = response.tested;
    positive = response.positive;
    var barChartData = {
      labels: labels,
      datasets: [
        {
          label: "Positive",
          data: positive,
          backgroundColor: "#00ffff",
        },
        {
          label: "Negative",
          data: tested,
          backgroundColor: "#9a8a0e",
        },
      ],
    };
    var testGraph = document.getElementById("testGraph").getContext("2d");
    var testGraphMobile = document
      .getElementById("testingMobile")
      .getContext("2d");

    var chart = new Chart(testGraph, {
      type: "bar",
      data: barChartData,
      options: options,
    });

    var chartMob = new Chart(testGraphMobile, {
      type: "bar",
      data: barChartData,
      options: options,
    });
  })
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: "Daily Testing Data",
    fontSize: 20,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: "Total Number of Tests",
        },
      },
    ],
  },
};
