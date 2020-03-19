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
var mapTotalData = [];
var dailyCases = [];

var now = new Date();
var millisTill20 =
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 45, 0, 0) -
  now;

var ctx = document.getElementById("myChart").getContext("2d");

var ctxDaily = document.getElementById("newDailyCases").getContext("2d");

const createMapArr = queryParam => {
  var localMapData = [];
  for (dataPoint in apiData) {
    console.log(apiData[dataPoint]);
    localMapData.push({
      x: apiData[dataPoint]["day"].replace("2020-", ""),
      y: apiData[dataPoint]["summary"]["total"]
    });
  }
  return localMapData;
};

Chart.defaults.global.defaultFontColor = "white";
$.when(
  $.ajax("https://api.rootnet.in/covid19-in/stats/daily").then(response => {
    apiData = response["data"];
    mapTotalData = createMapArr();
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
        responsive: true,
        responsive: true,
        title: {
          display: true,
          text: "Date vs Total Cases in India"
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
                maxTicksLimit: 8
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
    // Chart.helpers.retinaScale(myLineChart);
    // var dailyChart = new Chart(ctxDaily, {
    //   type: "line",
    //   data: {
    //     labels: dailyCases.map(function(e) {
    //       return e.x;
    //     }),
    //     datasets: [
    //       {
    //         label: "Daily New Cases",
    //         data: dailyCases.map(function(e) {
    //           return e.y;
    //         }),
    //         backgroundColor: "rgba(240, 223, 135, 0.5)",
    //         borderColor: "#FFF222",
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     title: {
    //       display: true,
    //       text: "Date vs New Cases in India"
    //     },
    //     animation: {
    //       duration: 2000,
    //       easing: "linear"
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           gridLines: {
    //             color: "#660066",
    //             zeroLineColor: "white",
    //             zeroLineWidth: 2
    //           },
    //           ticks: {
    //             autoSkip: true,
    //             maxTicksLimit: 8
    //           },
    //           scaleLabel: {
    //             display: true,
    //             labelString: "Days"
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
    //           ticks: {
    //             autoSkip: true,
    //             maxTicksLimit: 4
    //           },
    //           scaleLabel: {
    //             display: true,
    //             labelString: "Daily Cases"
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  })
);
