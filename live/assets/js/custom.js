// Notification.requestPermission(function(status) {
//   console.log("Notification permission status:", status);
// });

// function displayNotification() {
//   if (Notification.permission == "granted") {
//     navigator.serviceWorker.getRegistration().then(function(reg) {
//       reg.showNotification("Thanks for subscribing for to our notifications.");
//     });
//   }
// }

var apiData = [];
var apiStateData = [];
var mapTotalData = [];
var dailyCases = [];
var stateCases = [];
var hardStateCases = [];

var now = new Date();
var millisTill20 =
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 45, 0, 0) -
  now;

var ctx = document.getElementById("myChart").getContext("2d");

var ctxDaily = document.getElementById("newDailyCases").getContext("2d");

var stateCtx = document.getElementById("stateCases").getContext("2d");

console.log(ctx);

const createTempGraph = () => {
  var localMapData = [];
  for (state in hardStateCases) {
    localMapData.push({
      x: state,
      y: hardStateCases[state]
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
      x: dataPoint.replace("/2020", "").replace("/03", " Mar"),
      y: apiData[dataPoint]
    });
  }
  return localMapData;
};

const createNewaDailyArr = () => {
  var localMapData = [];
  var localCounter = [];
  var pureVals = [];
  objOfObjs = apiData;
  const arrayOfObj = Object.entries(objOfObjs).map(e => ({ [e[0]]: e[1] }));
  arrayOfObj.forEach((item, index) => {
    localCounter.push(Object.values(item)[0]);
    pureVals.push(localCounter.reduce((a, b) => a + b, 0));
  });
  arrayOfObj.forEach((item, index) => {
    localMapData.push({
      x: Object.keys(item)[0]
        .replace("/2020", "")
        .replace("/03", " Mar"),
      y: pureVals[index]
    });
  });
  return localMapData;
};

const createStateArr = () => {
  var localData = [];
  for (dataPoint in apiStateData) {
    let data = apiStateData[dataPoint];
    localData.push({
      x: data.loc,
      y: data.confirmedCasesIndian + data.confirmedCasesForeign
    });
  }
  return localData;
};

Chart.defaults.global.defaultFontColor = "white";

$.when(
  $.ajax("https://v1.api.covindia.com/states-affected-numbers").then(
    response => {
      hardStateCases = response;
      stateCases = createTempGraph();
      stateCases = sort_by_key(stateCases, "y");
      stateCases.splice(0, 14);
      var barGraph = new Chart(stateCtx, {
        type: "bar",
        data: {
          labels: stateCases.map(function(e) {
            return e.x;
          }),
          datasets: [
            {
              label: "Total Cases",
              data: stateCases.map(function(e) {
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
          // responsive: false,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Most affected states",
            fontSize: 20
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
                  labelString: "State"
                },
                gridLines: {
                  color: "#660066",
                  zeroLineColor: "white",
                  zeroLineWidth: 2
                },
                ticks: {
                  autoSkip: true
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
    }
  )
);

$.when(
  $.ajax("https://v1.api.covindia.com/daily-dates").then(response => {
    apiData = response;
    dailyCases = createMapArr();
    mapTotalData = createNewaDailyArr();
    dailyCases.pop();
    mapTotalData.pop();
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
        // responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Total Cases in India",
          fontSize: 20
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
                labelString: "Date"
              },
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2,
                drawTicks: true
              },
              ticks: {
                callback: function(value, index, values) {
                  if (index + 1 === values.length) {
                    return value;
                  }
                  if (index % 4 === 0) {
                    return value;
                  }
                }
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
          text: "Daily new cases in India",
          fontSize: 20
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
                callback: function(value, index, values) {
                  if (index + 1 === values.length) {
                    return value;
                  }
                  if (index % 4 === 0) {
                    return value;
                  }
                }
              },
              scaleLabel: {
                display: true,
                labelString: "Date"
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

// if (iOS()) {
//   jQuery(document).ready(function() {
//     jQuery('meta[name="viewport"]').attr(
//       "content",
//       "width=device-width, initial-scale=0.5"
//     );
//   });
// }
