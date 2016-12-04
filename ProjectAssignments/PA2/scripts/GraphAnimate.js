function drawGraph() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    setupCanvas();

    var TSHarr = new Array();
    var Datearr = new Array();
    getTSHhistory(TSHarr, Datearr);

    var tshLower = new Array(2);
    var tshUpper = new Array(2);
    getTSHbounds(tshLower, tshUpper);

    drawLines(TSHarr, Datearr)
    labelAxes();
  }
}

function setupCanvas() {

  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

}

function getTSHhistory(TSHarr, Datearr) {
  var tbRecords = JSON.parse(localStorage.getItem(
    "tbRecords"));

  tbRecords.sort(compareDates);

  for (var i = 0; i < tbRecords.length; i++) {
    var date = new Date(tbRecords[i].Date);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var m = date.getMonth() + 1;
    var d = date.getDate() + 1;

    //The x-axis label
    Datearr[i] = (m + "/" + d);

    //The point to plot
    TSHarr[i] = parseFloat(tbRecords[i].MassSize);
  }
}

function getTSHbounds(tshLower, tshUpper) {
  //Get users cancer stage
  var user = JSON.parse(localStorage.getItem(
    "user"));
  var TSHLevel = user.TSHRange;

  /*These lines show upper and lower bounds
   * of acceptable TSH levels (for each
   * stage)
   */
  if (TSHLevel == "StageA") {
    tshUpper[0] = tshUpper[1] = 0.1;
    tshLower[0] = tshLower[1] = 0.01;
  } else if (TSHLevel == "StageB") {
    tshUpper[0] = tshUpper[1] = 0.5;
    tshLower[0] = tshLower[1] = 0.1;
  } else {
    tshUpper[0] = tshUpper[1] = 2.0;
    tshLower[0] = tshLower[1] = 0.35;
  }
}

function drawLines(TSHarr, Datearr) {
  var TSHline = new RGraph.Line("GraphCanvas",
      TSHarr)
    .Set("labels", Datearr)
    .Set("colors", ["#fc6dff"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "blue";
  ctx.fillText("Date(MM/DD)", 400, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("Mass Size", -250, 10);
}