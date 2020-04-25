const randomScalingFactor = () => {
  return Math.floor(Math.random() * 20);
};

var positive = [
  576,
  626,
  764,
  884,
  859,
  755,
  1251,
  1017,
  879,
  1190,
  830,
  1406,
  1539,
  1246,
  1558,
  1304,
  1652,
  1390,
];

var tested = [
  16242,
  16242,
  16242,
  16242,
  17739,
  16255,
  21523,
  26875,
  29304,
  27984,
  31735,
  36520,
  29016,
  31914,
  31913,
  18680,
  18680,
  40495,
];

var barChartData = {
  labels: [
    "07/04",
    "08/04",
    "09/04",
    "10/04",
    "11/04",
    "12/04",
    "13/04",
    "14/04",
    "15/04",
    "16/04",
    "17/04",
    "18/04",
    "19/04",
    "20/04",
    "21/04",
    "22/04",
    "23/04",
    "24/04",
  ],
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
        stacked: true, // this should be set to make the bars stacked
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

var testGraph = document.getElementById("testGraph").getContext("2d");
var testGraphMobile = document.getElementById("testingMobile").getContext("2d");

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
