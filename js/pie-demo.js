(function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var data = { "Mombasa": 75, "Eldoret": 68, "Mandera": 32,
               "Nairobi": 95, "Lodwar": 20, "Embu": 51};
  var center = [canvas.width / 2, canvas.height / 2];
  var radius = Math.min(canvas.width, canvas.height) / 2;
  var pie_data = createPieChart(canvas, context, data);

  $("canvas").mousemove(function (e) {
    var x = e.pageX - $("canvas").offset().left | 0;
    var y = e.pageY - $("canvas").offset().top | 0;
    var from_center_x = x - center[0];
    var from_center_y = y - center[1];
    var from_center = Math.sqrt(Math.pow(Math.abs(from_center_x), 2) +
                                Math.pow(Math.abs(from_center_y), 2 ));

    if (from_center <= radius) {
      var angle = Math.atan2(from_center_y, from_center_x);

      if (angle < 0) {
          angle = 2 * Math.PI + angle;
      }

      for (var slice in pie_data) {
        if (angle >= pie_data[slice]["start_angle"] &&
            angle <= pie_data[slice]["end_angle"]) {
            $("div.slice_value").text(pie_data[slice]["value"]);
            return;
        }
      }
    }
  });
}());