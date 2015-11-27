var LineChart = function () {
  var context;
  var margin = { top: 40, left: 75, right: 0, bottom: 75 };
  var chartHeight, chartWidth, yMax, xMax, data;
  var maxYValue = 0;
  var ratio = 0;
  var renderType = { lines: 'lines', points: 'points' };

  var render = function(canvasId, dataObj) {
    data = dataObj;
    getMaxDataYValue();
    var canvas = document.getElementById(canvasId);
    chartHeight = canvas.getAttribute('height');
    chartWidth = canvas.getAttribute('width');
    xMax = chartWidth - (margin.left + margin.right);
    yMax = chartHeight - (margin.top + margin.bottom);
    ratio = yMax / maxYValue;
    context = canvas.getContext("2d");
    renderChart();
  };

  var renderChart = function () {
    renderBackground();
    renderText();
    renderLinesAndLabels();

    //render data based upon type of renderType(s) that client supplies
    if (data.renderTypes == undefined || data.renderTypes == null) {
      data.renderTypes = [renderType.lines];
    }
    
    for (var i = 0; i < data.renderTypes.length; i++) {
      renderData(data.renderTypes[i]);
    }
  };

  var getMaxDataYValue = function () {
    for (var i = 0; i < data.dataPoints.length; i++) {
      if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y;
    }
  };

  var renderBackground = function() {
    var lingrad = context.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
    lingrad.addColorStop(0.0, '#D4D4D4');
    lingrad.addColorStop(0.2, '#fff');
    lingrad.addColorStop(0.8, '#fff');
    lingrad.addColorStop(1, '#D4D4D4');
    context.fillStyle = lingrad;
    context.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
    context.fillStyle = 'black';
  };

  var renderText = function() {
    var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
    context.font = labelFont;
    context.textAlign = "center";

    //title
    var txtSize = context.measureText(data.title);
    context.fillText(data.title, (chartWidth / 2), (margin.top / 2));

    //x-axis text
    txtSize = context.measureText(data.xLabel);
    context.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

    //y-axis text
    context.save();
    context.rotate(-Math.PI / 2);
    context.font = labelFont;
    context.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
    context.restore();
  };

  var renderLinesAndLabels = function () {
    //vertical guide lines
    var yInc = yMax / data.dataPoints.length;
    var yPos = 0;
    var yLabelInc = (maxYValue * ratio) / data.dataPoints.length;
    var xInc = getXInc();
    var xPos = margin.left;
    for (var i = 0; i < data.dataPoints.length; i++) {
      yPos += (i == 0) ? margin.top : yInc;
      //draw horizontal lines
      drawLine(margin.left, yPos, xMax, yPos, '#E8E8E8');

      //y axis labels
      context.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
      var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
      var txtSize = context.measureText(txt);
      context.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);

      //x axis labels
      txt = data.dataPoints[i].x;
      txtSize = context.measureText(txt);
      context.fillText(txt, xPos, yMax + (margin.bottom / 3));
      xPos += xInc;
    }

    //y-axis
    drawLine(margin.left, margin.top, margin.left, yMax, 'black');

    //x-axis
    drawLine(margin.left, yMax, xMax, yMax, 'black');
  };

  var renderData = function(type) {
    var xInc = getXInc();
    var prevX = 0, 
      prevY = 0;

    for (var i = 0; i < data.dataPoints.length; i++) {
      var pt = data.dataPoints[i];
      var ptY = (maxYValue - pt.y) * ratio;
      if (ptY < margin.top) ptY = margin.top;
      var ptX = (i * xInc) + margin.left;

      if (i > 0 && type == renderType.lines) {
        //draw connecting lines
        drawLine(ptX, ptY, prevX, prevY, 'black', 2);
      }

      if (type == renderType.points) {
        var radgrad = context.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
        radgrad.addColorStop(0, 'Green');
        radgrad.addColorStop(0.9, 'White');
        context.beginPath();
        context.fillStyle = radgrad;
        //render circle
        context.arc(ptX, ptY, 8, 0, 2 * Math.PI, false)
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#000';
        context.stroke();
        context.closePath();
      }

      prevX = ptX;
      prevY = ptY;
    }
  };

  var getXInc = function() {
    return Math.round(xMax / data.dataPoints.length) - 1;
  };

  var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
    if (strokeStyle != null) context.strokeStyle = strokeStyle;
    if (lineWidth != null) context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
  };

  return {
    renderType: renderType,
    render: render
  };
} ();
