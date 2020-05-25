var labels = [];
var tested = [];
var positive = [];

$.when(
  $.ajax("https://v1.api.covindia.com/testing-data").then((response) => {
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
          borderColor: "#660066",
          borderWidth: 1,
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
  })
);

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
          fontColor: '#660066'
        },
       ticks: {
         fontColor: '#660066',
         beginAtZero: true,
         callback: function(value, index, values) {
          return value + '%';
      }
       }
      }
    ],
  },
};
