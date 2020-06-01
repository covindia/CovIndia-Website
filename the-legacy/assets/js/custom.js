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

try {
  var ctxMob = document.getElementById("myChartMobile").getContext("2d");
  var ctxDailyMobile = document
    .getElementById("newDailyCasesMobile")
    .getContext("2d");
} catch (err) {
  console.log(err);
}

const createTempGraph = () => {
  var localMapData = [];
  for (state in hardStateCases) {
    localMapData.push({
      x: state,
      y: hardStateCases[state],
    });
  }
  return localMapData;
};

const sort_by_key = (array, key) => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const createMapArr = (queryParam) => {
  var localMapData = [];
  for (dataPoint in apiData) {
    localMapData.push({
      x: dataPoint.replace("/2020", ""),
      y: apiData[dataPoint],
    });
  }
  return localMapData;
};

const createNewaDailyArr = () => {
  var localMapData = [];
  var localCounter = [];
  var pureVals = [];
  objOfObjs = apiData;
  const arrayOfObj = Object.entries(objOfObjs).map((e) => ({ [e[0]]: e[1] }));
  arrayOfObj.forEach((item, index) => {
    localCounter.push(Object.values(item)[0]);
    pureVals.push(localCounter.reduce((a, b) => a + b, 0));
  });
  arrayOfObj.forEach((item, index) => {
    localMapData.push({
      x: Object.keys(item)[0].replace("/2020", ""),
      y: pureVals[index],
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
      y: data.confirmedCasesIndian + data.confirmedCasesForeign,
    });
  }
  return localData;
};

Chart.defaults.global.defaultFontColor = "white";

// $.when(
//   $.ajax("https://v1.api.covindia.com/states-affected-numbers").then(
//     response => {
//       hardStateCases = response;
//       stateCases = createTempGraph();
//       stateCases = sort_by_key(stateCases, "y");
//       stateCases.splice(0, 14);
//       var barGraph = new Chart(stateCtx, {
//         type: "bar",
//         data: {
//           labels: stateCases.map(function (e) {
//             return e.x;
//           }),
//           datasets: [
//             {
//               label: "Total Cases",
//               data: stateCases.map(function (e) {
//                 return e.y;
//               }),
//               backgroundColor: "rgba(240, 223, 135, 0.5)",
//               borderColor: "#FFF222",
//               borderWidth: 1
//             }
//           ]
//         },
//         scaleFontColor: "#FFFFFF",
//         options: {
//           // responsive: false,
//           maintainAspectRatio: false,
//           title: {
//             display: true,
//             text: "Most affected states",
//             fontSize: 20
//           },
//           animation: {
//             duration: 2000,
//             easing: "linear"
//           },
//           scales: {
//             xAxes: [
//               {
//                 scaleLabel: {
//                   display: true,
//                   labelString: "State",
//                 },
//                 gridLines: {
//                   color: "#660066",
//                   zeroLineColor: "white",
//                   zeroLineWidth: 2,

//                 },
//                 ticks: {
//                   autoSkip: true,
//                   fontSize: 10

//                 }
//               }
//             ],
//             yAxes: [
//               {
//                 gridLines: {
//                   color: "#660066",
//                   zeroLineColor: "white",
//                   zeroLineWidth: 2
//                 },
//                 scaleLabel: {
//                   display: true,
//                   labelString: "Total Cases"
//                 },
//                 ticks: {
//                   autoSkip: true,
//                   maxTicksLimit: 4
//                 }
//               }
//             ]
//           }
//         }
//       });
//       try {
//         var barGraph = new Chart(stateGraphMobile, {
//           type: "bar",
//           data: {
//             labels: stateCases.map(function (e) {
//               return e.x;
//             }),
//             datasets: [
//               {
//                 label: "Total Cases",
//                 data: stateCases.map(function (e) {
//                   return e.y;
//                 }),
//                 backgroundColor: "rgba(240, 223, 135, 0.5)",
//                 borderColor: "#FFF222",
//                 borderWidth: 1
//               }
//             ]
//           },
//           scaleFontColor: "#FFFFFF",
//           options: {
//             // responsive: false,
//             maintainAspectRatio: false,
//             title: {
//               display: true,
//               text: "Most affected states",
//               fontSize: 20
//             },
//             animation: {
//               duration: 2000,
//               easing: "linear"
//             },
//             scales: {
//               xAxes: [
//                 {
//                   scaleLabel: {
//                     display: true,
//                     labelString: "State"
//                   },
//                   gridLines: {
//                     color: "#660066",
//                     zeroLineColor: "white",
//                     zeroLineWidth: 2
//                   },
//                   ticks: {
//                     autoSkip: true
//                   }
//                 }
//               ],
//               yAxes: [
//                 {
//                   gridLines: {
//                     color: "#660066",
//                     zeroLineColor: "white",
//                     zeroLineWidth: 2
//                   },
//                   scaleLabel: {
//                     display: true,
//                     labelString: "Total Cases"
//                   },
//                   ticks: {
//                     autoSkip: true,
//                     maxTicksLimit: 4
//                   }
//                 }
//               ]
//             }
//           }
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   )
// );

function daily_dates() {
    response = {"02/03/2020":12,"04/03/2020":15,"07/03/2020":1,"08/03/2020":11,"09/03/2020":2,"10/03/2020":16,"11/03/2020":1,"12/03/2020":11,"13/03/2020":12,"14/03/2020":22,"15/03/2020":7,"16/03/2020":13,"17/03/2020":16,"18/03/2020":23,"19/03/2020":25,"20/03/2020":63,"21/03/2020":69,"22/03/2020":82,"23/03/2020":86,"24/03/2020":73,"25/03/2020":81,"26/03/2020":77,"27/03/2020":153,"28/03/2020":124,"29/03/2020":124,"30/03/2020":174,"31/03/2020":272,"01/04/2020":407,"02/04/2020":528,"03/04/2020":581,"04/04/2020":545,"05/04/2020":621,"06/04/2020":479,"07/04/2020":576,"08/04/2020":626,"09/04/2020":765,"10/04/2020":883,"11/04/2020":860,"12/04/2020":755,"13/04/2020":1250,"14/04/2020":1017,"15/04/2020":879,"16/04/2020":1187,"17/04/2020":830,"18/04/2020":1503,"19/04/2020":1522,"20/04/2020":1229,"21/04/2020":1520,"22/04/2020":1286,"23/04/2020":1649,"24/04/2020":1411,"25/04/2020":1843,"26/04/2020":1657,"27/04/2020":1565,"28/04/2020":1904,"29/04/2020":1702,"30/04/2020":1789,"01/05/2020":2398,"02/05/2020":2524,"03/05/2020":3055,"04/05/2020":3638,"05/05/2020":2967,"06/05/2020":3575,"07/05/2020":3341,"08/05/2020":3381,"09/05/2020":3157,"10/05/2020":4291,"11/05/2020":3592,"12/05/2020":3547,"13/05/2020":3707,"14/05/2020":3926,"15/05/2020":3795,"16/05/2020":4837,"17/05/2020":5034,"18/05/2020":4633,"19/05/2020":5905,"20/05/2020":5741,"21/05/2020":6220,"22/05/2020":6549,"23/05/2020":6599,"24/05/2020":7152,"25/05/2020":6402,"26/05/2020":6042,"27/05/2020":7194,"28/05/2020":7232,"29/05/2020":8079,"30/05/2020":8413,"31/05/2020":966};
    apiData = response;
    dailyCases = createMapArr();
    mapTotalData = createNewaDailyArr();
    // dailyCases.pop();
    // mapTotalData.pop();
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: mapTotalData.map(function (e) {
          return e.x;
        }),
        datasets: [
          {
            label: "Total Cases",
            data: mapTotalData.map(function (e) {
              return e.y;
            }),
            backgroundColor: "rgba(240, 223, 135, 0.5)",
            borderColor: "#FFF222",
            borderWidth: 1,
          },
        ],
      },
      scaleFontColor: "#FFFFFF",
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
       },
       hover: {
          mode: 'index',
          intersect: false
       },
        // responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
       },
        title: {
          display: true,
          text: "Total Cases",
          fontSize: 20,
        },
        animation: {
          duration: 1000,
          easing: "linear",
        },
        scales: {
          xAxes: [
            {              
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2,
                drawTicks: true,
              },
              ticks: {
                callback: function (value, index, values) {
                  if (value === values[values.length - 1]) {
                    //console.log(value);
                    return value;
                  } else if (index % 4 === 0) {
                    return value;
                  }
                },
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2,
              },              
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4,
              },
            },
          ],
        },
      },
    });
    try {
      var myLineChart = new Chart(ctxMob, {
        type: "line",
        data: {
          labels: mapTotalData.map(function (e) {
            return e.x;
          }),
          datasets: [
            {
              label: "Total Cases",
              data: mapTotalData.map(function (e) {
                return e.y;
              }),
              backgroundColor: "rgba(240, 223, 135, 0.5)",
              borderColor: "#FFF222",
              borderWidth: 1,
            },
          ],
        },
        scaleFontColor: "#FFFFFF",
        options: {
          // responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
         },
         hover: {
            mode: 'index',
            intersect: false
         },
          legend: {
            display: false
         },
          maintainAspectRatio: false,
          legend: {
            display: false
         },
          title: {
            display: true,
            text: "Total Cases",
            fontSize: 20,
          },
          animation: {
            duration: 1000,
            easing: "linear",
          },
          scales: {
            xAxes: [
              {                
                gridLines: {
                  color: "#660066",
                  zeroLineColor: "white",
                  zeroLineWidth: 2,
                  drawTicks: true,
                },
                ticks: {
                  callback: function (value, index, values) {
                    if (index + 1 === values.length) {
                      return value;
                    }
                    if (index % 4 === 0) {
                      return value;
                    }
                  },
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "#660066",
                  zeroLineColor: "white",
                  zeroLineWidth: 2,
                },                
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 4,
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    var dailyChart = new Chart(ctxDaily, {
      type: "bar",
      data: {
        labels: dailyCases.map(function (e) {
          return e.x;
        }),
        datasets: [
          {
            data: dailyCases.map(function (e) {
              return e.y;
            }),
            backgroundColor: "#9a8a0e",            
          },
        ],
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
       },
       hover: {
          mode: 'index',
          intersect: false
       },
        maintainAspectRatio: false,
        legend: {
          display: false
       },
        title: {
          display: true,
          text: "Daily new cases",
          fontSize: 20,
        },
        animation: {
          duration: 1000,
          easing: "linear",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2,
              },
              ticks: {                
                callback: function (value, index, values) {
                  if (index + 1 === values.length) {
                    return value;
                  }
                  if (index % 4 === 0) {
                    return value;
                  }
                },
              },              
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "#660066",
                zeroLineColor: "white",
                zeroLineWidth: 2,
              },
              ticks: {
                max : 7000,
                autoSkip: true,
                maxTicksLimit: 8,
                stepSize: 1000,
              },              
            },
          ],
        },
      },
    });
    try {
      var dailyChart = new Chart(ctxDailyMobile, {
        type: "bar",
        data: {
          labels: dailyCases.map(function (e) {
            return e.x;
          }),
          datasets: [
            {              
              data: dailyCases.map(function (e) {
                return e.y;
              }),
              backgroundColor: "#9a8a0e",              
            },
          ],
        },
        options: {
          tooltips: {
            mode: 'index',
            intersect: false
         },
         hover: {
            mode: 'index',
            intersect: false
         },
          maintainAspectRatio: false,
          legend: {
            display: false
         },
          title: {
            display: true,
            text: "Daily new cases",
            fontSize: 20,
          },
          animation: {
            duration: 1000,
            easing: "linear",
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "#660066",
                  zeroLineColor: "white",
                  zeroLineWidth: 2,
                },
                ticks: {
                  callback: function (value, index, values) {
                    if (index + 1 === values.length) {
                      return value;
                    }
                    if (index % 4 === 0) {
                      return value;
                    }
                  },
                },                
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "#660066",
                  zeroLineColor: "white",
                  zeroLineWidth: 2,
                },
                ticks: {
                  max : 7000,
                  autoSkip: true,
                  maxTicksLimit: 8,
                  stepSize: 1000,
                },                
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
}

function iOS() {
  var iDevices = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
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

// Add something to given element placeholder
function addToPlaceholder(toAdd, el) {
  el.attr('placeholder', el.attr('placeholder') + toAdd);
  // Delay between symbols "typing" 
  return new Promise(resolve => setTimeout(resolve, 100));
}

// Cleare placeholder attribute in given element
function clearPlaceholder(el) {
  el.attr("placeholder", "");
}

// Print one phrase
function printPhrase(phrase, el) {
  return new Promise(resolve => {
      // Clear placeholder before typing next phrase
      clearPlaceholder(el);
      let letters = phrase.split('');
      // For each letter in phrase
      letters.reduce(
          (promise, letter, index) => promise.then(_ => {
              // Resolve promise when all letters are typed
              if (index === letters.length - 1) {
                  // Delay before start next phrase "typing"
                  setTimeout(resolve, 1000);
              }
              return addToPlaceholder(letter, el);
          }),
          Promise.resolve()
      );
  });
} 

// Print given phrases to element
function printPhrases(phrases, el) {
  // For each phrase
  // wait for phrase to be typed
  // before start typing next
  phrases.reduce(
      (promise, phrase) => promise.then(_ => printPhrase(phrase, el)), 
      Promise.resolve()
  );
}

// Start typing
function run() {
  let phrases = [
      "Hyderabad",
      "Raipur",
      "Patna",
      "Indore",
      "Search your district here"
  ];

  printPhrases(phrases, $('#searchBar'));
}

run();


// Function to add commas in numbers Indian style \m/
function indiancomma(x){
  x=x.toString();
  var lastThree = x.substring(x.length-3);
  var otherNumbers = x.substring(0,x.length-3);
  if(otherNumbers != '')
      lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  console.log("Comma Here")
  console.log(res)
  return res;
}


// async function last2weeks() {
//   var twoweeksData = {};
//   $.ajax("https://v1.api.covindia.com/past-two-weeks").then(
//     (response) => {
//       twoweeksData = response;
//       console.log(twoweeksData);
//       console.log(twoweeksData["splitPoints"][3]);
//       console.log("here 2 weeks"); 
//       clearData(districtData);
//       renderData(twoweeksData);
//       $('.clickable').tooltip();

//       $('.clickable').tooltip({
//         open: function (e, o) {
//           $(o.tooltip).mouseover(function (e) {
//             $('.clickable').tooltip('close');
//           });
//           $(o.tooltip).mouseout(function (e) {});
//         },
//         close: function (e, o) {},
//         show: {
//           duration: 800
//         }
//       });

//       try {
//         $(".Delhi").attr('data-original-title', 'Delhi' + ' | Infected: ' + twoweeksData['Delhi']
//           .infected + ' | Deaths: ' + twoweeksData['Delhi'].dead);
//       } catch {
//         var a = 1;
//       }
//       try {
//         $(".Mumbai").attr('data-original-title', 'Mumbai' + ' | Infected: ' + twoweeksData[
//           'Mumbai'].infected + ' | Deaths: ' + twoweeksData['Mumbai'].dead);
//       } catch {
//         var a = 1;
//       }
//       let lmao = 'Mumbai-Unique'
//       $('#' + lmao).tooltip().mouseover();
//       $("#Chennai").tooltip().mouseover()
//       $('#Delhi-Unique').tooltip().mouseover();
//       setMaxLegend(twoweeksData["splitPoints"][3]);
//     }
//   );
//   $(".twoweeksbut").prop("disabled", true);  
// }



