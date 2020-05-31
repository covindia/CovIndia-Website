var labels = [];
var tested = [];
var positive = [];

function testing_data() {
    response = {"date":["07/04","08/04","09/04","10/04","11/04","12/04","13/04","14/04","15/04","16/04","17/04","18/04","19/04","20/04","21/04","24/04","25/04","26/04","27/04","28/04","29/04","30/04","01/05","02/05","03/05","04/05","05/05","06/05","07/05","08/05","09/05","10/05","11/05","12/05","13/05","14/05","15/05","16/05","17/05","18/05","19/05","20/05","21/05","22/05","23/05","24/05","25/05","26/05","27/05"],"tested":[16242,16242,16242,16242,17739,16255,21523,26875,29304,27984,31735,36520,29016,31914,31913,35000,37398,45212,40038,49575,53342,57931,70617,71841,69306,59301,82647,83982,78742,78491,83423,85349,63197,83960,92543,90704,90822,94246,91535,73353,99290,105794,101303,101286,112880,106285,88229,90536,113543],"positive":[576,626,765,883,860,755,1251,1017,879,1187,830,1503,1522,1229,1521,1411,1843,1592,1565,1904,1704,1789,2398,2445,3055,3638,2968,3608,3345,3381,3166,4294,3614,3558,3752,3949,3814,4857,5065,4656,6155,5541,6243,6552,6649,7148,6407,6041,7198],"percentage":[3.546,3.854,4.71,5.437,4.848,4.645,5.812,3.784,3.0,4.242,2.615,4.116,5.245,3.851,4.766,4.031,4.928,3.521,3.909,3.841,3.194,3.088,3.396,3.403,4.408,6.135,3.591,4.296,4.248,4.308,3.795,5.031,5.719,4.238,4.054,4.354,4.199,5.154,5.533,6.347,6.199,5.238,6.163,6.469,5.89,6.725,7.262,6.672,6.339]}
    labels = response.date;
    tested = response.tested;
    positive = response.positive;
    percentagePositive = response.percentage
    console.log(percentagePositive)
   
    var barChartData = {
      labels: labels,
      datasets: [
        {
          label: "% positive",
          data: percentagePositive,
          type: "line",
          yAxisID: 'right',
          borderColor: "#cc99cc",
          borderWidth: 3,
          pointRadius: 2,
          pointBackgroundColor: "#cecece"
        },
        {
          label: "Positive",
          data: positive,
          backgroundColor: "#00ffff",
          yAxisID: 'left'
        },
        {
          label: "Negative",
          data: tested,
          backgroundColor: "#9a8a0e",
          yAxisID: 'left'
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
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    labels: {
      filter: function(legendItem, data){
        return !legendItem.text.includes("% positive")
      }  
    }
    
  },
  tooltips: {
    // Disable the on-canvas tooltip
    enabled: false,

    custom: function(tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = "<table style = 'background-color: rgba(0, 0, 0, 0.7); border-radius: 10px; padding: 5px;'></table>";
            document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
            tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
            var titleLines = tooltipModel.title || [];
            var bodyLines = tooltipModel.body.map(getBody);

            var innerHtml = '<thead>';

            innerHtml += '</thead><tbody>';


            bodyLines.forEach(function(body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = 'background:' + '#cecece';
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 20px';
                var span = '<span style="' + style + '"></span>';
                let count;
                if(body[0].split(":")[0].trim() === "Negative"){
                  count = tested.findIndex(item => item == body[0].split(":")[1].trim())
                  innerHtml += '<tr><td>' + body + '</td></tr><tr><td>' + (100 - percentagePositive[count]) +'%' + '</td></tr>';
                }
                
                else if (body[0].split(":")[0].trim() === "Positive"){
                  count = positive.findIndex(item => item == body[0].split(":")[1].trim())
                  innerHtml += "<tr><td>" + body + '</td></tr><tr><td>' + percentagePositive[count] +'%' + '</td></tr>';
                }
                else {
                  innerHtml += '<tr><td>' + body + '</td></tr><tr><td>'
                }
                
                

            });
            innerHtml += '</tbody>';

            var tableRoot = tooltipEl.querySelector('table');
            tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
    }
  },
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
        id: 'left',
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: "Total Number of Tests",
        },
        position: 'left'
      },
      {
        id: 'right',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: "Percentage Positive",
          fontColor: '#cc99cc'
        },
       ticks: {
         fontColor: '#cc99cc',
         callback: function(value, index, values) {
          return value + '%';
      }
       }
      }
    ],
  },
};
