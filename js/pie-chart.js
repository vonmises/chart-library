function createPieChart(canvas, context, data){
  var colours = ["#FF4136", "#0074D9", "#85144B", "#01FF70", "#307D7E", "#FFDC00"];
  var center = [canvas.width / 2, canvas.height / 2];
  var radius = Math.min(canvas.width, canvas.height) / 2;
  var previous_position = 0, next_position = 0, total = 0;
  // numerical index for data[] and colours[], string i for pie_data[]
  var index = 0;
  var pie_data = [];
  var keys;

  for (var i in data) { total += data[i]; }

  keys = Object.keys(data);

  for (var i in data) {
    pie_data[i] = [];
    pie_data[i]["key"] = keys[index]; // keys of original data source
    pie_data[i]["colour"] = colours[index];
    pie_data[i]["value"] = data[i]; // values of original data source
    pie_data[i]["start_angle"] = 2 * Math.PI * previous_position;
    pie_data[i]["end_angle"] = 2 * Math.PI * (
    previous_position + (data[i] / total));
    previous_position += data[i] / total;
    index++;
  }

  index = 0;
  previous_position = 0;

  for (var i in data){
    next_position = previous_position + (Math.PI * 2 * (data[index] / total));
    context.beginPath();
    context.moveTo(center[0], center[1]);
    context.arc(center[0], center[1], radius, pie_data[i]["start_angle"],
    pie_data[i]["end_angle"], false);
    context.lineTo(center[0], center[1]);
    context.fillStyle = colours[index];
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "#fff";
    context.stroke();
    previous_position = next_position;
    index++;
  }

  return pie_data;
}