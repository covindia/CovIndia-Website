Notification.requestPermission(function(status) {
  console.log("Notification permission status:", status);
});

function displayNotification() {
  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification("Thanks for subscribing for to our notifications.");
    });
  }
}

var apiData = [];
var apiStateData = [];
var mapTotalData = [];
var dailyCases = [];
var stateCases = [];
var hardStateCases = [
  { "Andhra Pradesh": 2 },
  { Maharashtra: 49 },
  { Chhattisgarh: 18 },
  { Chandigarh: 17 },
  { Pondicherry: 16 },
  { "West Bengal": 15 },
  { Odisha: 14 },
  { Uttarakhand: 13 },
  { Karnataka: 15 },
  { Punjab: 11 },
  { "Jammu and Kashmir": 10 },
  { "Tamil Nadu": 9 },
  { Ladakh: 8 },
  { "Uttar Pradesh": 19 },
  { Telangana: 13 },
  { Rajasthan: 7 },
  { Kerala: 28 },
  { Haryana: 17 },
  { Delhi: 12 }
];

var now = new Date();
var millisTill20 =
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 45, 0, 0) -
  now;

var ctx = document.getElementById("myChart").getContext("2d");

var ctxDaily = document.getElementById("newDailyCases").getContext("2d");

var stateCtx = document.getElementById("stateCases").getContext("2d");

const createTempGraph = () => {
  var localMapData = [];
  for (state in hardStateCases) {
    localMapData.push({
      x: Object.keys(hardStateCases[state])[0],
      y: Object.values(hardStateCases[state])[0]
    });
  }
  return localMapData;
};

const sort_by_key = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const createMapArr = queryParam => {
  var localMapData = [];
  for (dataPoint in apiData) {
    localMapData.push({
      x: apiData[dataPoint]["day"].replace("2020-", ""),
      y: apiData[dataPoint]["summary"]["total"]
    });
  }
  return localMapData;
};

const createNewaDailyArr = () => {
  var localMapData = [];
  for (dataPoint in apiData) {
    nextIndex = (parseInt(dataPoint) + 1).toString();
    if (nextIndex !== apiData.length.toString()) {
      localMapData.push({
        x: apiData[nextIndex]["day"].replace("2020-", ""),
        y:
          apiData[nextIndex]["summary"]["total"] -
          apiData[dataPoint]["summary"]["total"]
      });
    }
  }
  return localMapData;
};

const createStateArr = () => {
  var localData = [];
  for (dataPoint in apiStateData) {
    let data = apiStateData[dataPoint];
    console.log(data);
    localData.push({
      x: data.loc,
      y: data.confirmedCasesIndian + data.confirmedCasesForeign
    });
  }
  return localData;
};

Chart.defaults.global.defaultFontColor = "white";

// stateCases = createTempGraph();
// stateCases = sort_by_key(stateCases, "y");
// stateCases.splice(0, 9);
// var myLineChart = new Chart(stateCtx, {
//   type: "bar",
//   data: {
//     labels: stateCases.map(function(e) {
//       return e.x;
//     }),
//     datasets: [
//       {
//         label: "Total Cases",
//         data: stateCases.map(function(e) {
//           return e.y;
//         }),
//         backgroundColor: "rgba(240, 223, 135, 0.5)",
//         borderColor: "#FFF222",
//         borderWidth: 1
//       }
//     ]
//   },
//   scaleFontColor: "#FFFFFF",
//   options: {
//     // responsive: false,
//     maintainAspectRatio: false,
//     title: {
//       display: true,
//       text: "Most affected states"
//     },
//     animation: {
//       duration: 2000,
//       easing: "linear"
//     },
//     scales: {
//       xAxes: [
//         {
//           scaleLabel: {
//             display: true,
//             labelString: "State"
//           },
//           gridLines: {
//             color: "#660066",
//             zeroLineColor: "white",
//             zeroLineWidth: 2
//           },
//           ticks: {
//             autoSkip: true
//           }
//         }
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             color: "#660066",
//             zeroLineColor: "white",
//             zeroLineWidth: 2
//           },
//           scaleLabel: {
//             display: true,
//             labelString: "Total Cases"
//           },
//           ticks: {
//             autoSkip: true,
//             maxTicksLimit: 4
//           }
//         }
//       ]
//     }
//   }
// });
$.when(
  $.ajax("https://api.rootnet.in/covid19-in/stats/daily").then(response => {
    apiData = response["data"];
    mapTotalData = createMapArr();
    dailyCases = createNewaDailyArr();

    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: mapTotalData.map(function(e) {
          return e.x;
        }),
        datasets: [
          {
            label: "Total Cases",
            data: mapTotalData.map(function(e) {
              return e.y;
            }),
            backgroundColor: "rgba(240, 223, 135, 0.5)",
            borderColor: "#FFF222",
            borderWidth: 1
          }
        ]
      },
      scaleFontColor: "#FFFFFF",
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Total Cases in India"
        },
        animation: {
          duration: 2000,
          easing: "linear"
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Days"
              },
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2
              },
              scaleLabel: {
                display: true,
                labelString: "Total Cases"
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4
              }
            }
          ]
        }
      }
    });
    var dailyChart = new Chart(ctxDaily, {
      type: "line",
      data: {
        labels: dailyCases.map(function(e) {
          return e.x;
        }),
        datasets: [
          {
            label: "Daily New Cases",
            data: dailyCases.map(function(e) {
              return e.y;
            }),
            backgroundColor: "rgba(240, 223, 135, 0.5)",
            borderColor: "#FFF222",
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Daily new cases in India"
        },
        animation: {
          duration: 2000,
          easing: "linear"
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4
              },
              scaleLabel: {
                display: true,
                labelString: "Days"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4
              },
              scaleLabel: {
                display: true,
                labelString: "Daily Cases"
              }
            }
          ]
        }
      }
    });
  })
);

function iOS() {
  var iDevices = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }

  return false;
}

if (iOS()) {
  jQuery(document).ready(function() {
    jQuery('meta[name="viewport"]').attr(
      "content",
      "width=device-width, initial-scale=0.5"
    );
  });
}
