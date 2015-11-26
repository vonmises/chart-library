function BarChart(context) {  
  var that = this;
  var startArr;
  var endArr;
  
  // draw method updates the canvas with the current display
  var draw = function (arr) {
    var numOfBars = arr.length;
    var barWidth;
    var barHeight;
    var border = 2;
    var ratio;
    var maxBarHeight;
    var gradient;
    var largestValue;
    var graphAreaWidth = that.width;
    var graphAreaHeight = that.height;
    var i;
    
    context.canvas.width = that.width;
    context.canvas.height = that.height;

    context.fillStyle = that.backgroundColor;
    context.fillRect(0, 0, that.width, that.height);

    // if x axis labels exist then make room
    if (that.xAxisLabelArr.length) {
      graphAreaHeight -= 40;
    }

    // bar dimensions
    barWidth = graphAreaWidth / numOfBars - that.margin * 2;
    maxBarHeight = graphAreaHeight - 25;

    // largest value in the bar array
    var largestValue = 0;
    for (i = 0; i < arr.length; i += 1) {
      if (arr[i] > largestValue) {
        largestValue = arr[i];
      }
    }
    
    // for each bar...
    for (i = 0; i < arr.length; i += 1) {
      // set the ratio of current bar compared to the maximum
      if (that.maxValue) {
        ratio = arr[i] / that.maxValue;
      } else {
        ratio = arr[i] / largestValue;
      }
    
      barHeight = ratio * maxBarHeight;

      // bar background
      context.fillStyle = "#333";      
      context.fillRect(that.margin + i * that.width / numOfBars,
        graphAreaHeight - barHeight,
        barWidth,
        barHeight);

      // draw bar colour if it is large enough to be visible
      if (barHeight > border * 2) {
        gradient = context.createLinearGradient(0, 0, 0, graphAreaHeight);
        gradient.addColorStop(1-ratio, that.colors[i % that.colors.length]);
        gradient.addColorStop(1, "#ffffff");

        context.fillStyle = gradient;

        context.fillRect(that.margin + i * that.width / numOfBars + border,
          graphAreaHeight - barHeight + border,
          barWidth - border * 2,
          barHeight - border * 2);
      }

      // write bar value
      context.fillStyle = "#333";
      context.font = "bold 12px sans-serif";
      context.textAlign = "center";

      context.fillText(parseInt(arr[i],10),
      i * that.width / numOfBars + (that.width / numOfBars) / 2,
      graphAreaHeight - barHeight - 10);

      // draw bar label if it exists
      if (that.xAxisLabelArr[i]) {      
          context.fillStyle = "#333";
          context.font = "bold 12px sans-serif";
          context.textAlign = "center";

          context.fillText(that.xAxisLabelArr[i],
          i * that.width / numOfBars + (that.width / numOfBars) / 2,
          that.height - 10);
        }
      }
    };

  // public properties and methods

  this.maxValue;
  this.margin = 5;
  this.colors = ["#FF4136", "#0074D9", "#85144B", "#01FF70", "#307D7E", "#FFDC00"];
  this.curArr = [];
  this.backgroundColor = "#fff";
  this.xAxisLabelArr = [];
  this.yAxisLabelArr = [];
  this.animationInterval = 100;
  this.animationSteps = 10;

  // update method sets the end bar array and starts the animation
  this.update = function (newArr) {

    // if length of target and current array is different 
    if (that.curArr.length !== newArr.length) {
      that.curArr = newArr;
      draw(newArr);
    } else {
        // set the starting array to the current array
        startArr = that.curArr;
        // set the target array to the new array
        endArr = newArr;
    }
  }; 
}