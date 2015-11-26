(function () {
  var random = Math.random;

  var context = document.getElementById("bar_chart").getContext("2d");

  var graph = new BarChart(context);
  graph.width = 800;
  graph.height = 400;
  graph.maxValue = 30;
  graph.margin = 2;
  graph.xAxisLabelArr = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September",
  "October", "November", "December"];
  graph.update([random() * 30, random() * 30, random() * 30, random() * 30,
  random() * 30, random() * 30, random() * 30, random() * 30,
  random() * 30, random() * 30, random() * 30, random() * 30]);
}());