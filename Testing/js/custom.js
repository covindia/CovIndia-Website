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

setTimeout(function() {
  displayNotification();
}, millisTill20);
Chart.defaults.global.defaultFontColor = "white";
$.when(
  $.ajax("https://thevirustracker.com/free-api?countryTimeline=IN").then(
    response => {
      apiData = response["timelineitems"][0];
      mapTotalData = createMapArr("total_cases");
      dailyCases = createMapArr("new_daily_cases");
      dailyCases.pop();
      mapTotalData.pop();
      mapTotalData.splice(0, 38);
      dailyCases.splice(0, 38);
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
              borderWidth: 2
            }
          ]
        },
        scaleFontColor: "#FFFFFF",
        options: {
          title: {
            display: true,
            text: "Date vs Cases"
          },
          animation: {
            duration: 2000,
            easing: "linear",
            onProgress: function(animation) {
              progress.value =
                animation.animationObject.currentStep /
                animation.animationObject.numSteps;
            },
            onComplete: function() {
              progress.style.display = "none";
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255,255,255, 0.4)"
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
              label: "Total New Cases",
              data: dailyCases.map(function(e) {
                return e.y;
              }),
              backgroundColor: "rgba(240, 223, 135, 0.5)",
              borderColor: "#FFF222",
              borderWidth: 2
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Date vs New Cases"
          },
          animation: {
            duration: 2000,
            easing: "linear",
            onProgress: function(animation) {
              progressDaily.value =
                animation.animationObject.currentStep /
                animation.animationObject.numSteps;
            },
            onComplete: function() {
              progressDaily.style.display = "none";
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255,255,255, 0.4)"
                }
              }
            ]
          }
        }
      });
    }
  )
);

var ctx = document.getElementById("myChart").getContext("2d");
var progress = document.getElementById("animationProgress");

var ctxDaily = document.getElementById("newDailyCases").getContext("2d");
var progressDaily = document.getElementById("newDailyCasesAni");

const createMapArr = queryParam => {
  var localMapData = [];
  for (dataPoint in apiData) {
    localMapData.push({
      x: dataPoint.replace("/2020", ""),
      y: apiData[dataPoint][queryParam]
    });
  }
  return localMapData;
};
