function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));
    var MSLevel = 0;

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var MassSize = tbRecords[i].MassSize;

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, MSLevel, MassSize);

  }
}

function drawAdviceCanvas(ctx, MSLevel, MassSize) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current Mass Size is " + MassSize +
    "mm.", 25, 320);
  levelAwrite(ctx, MassSize);
  levelAMeter(ctx, MassSize);
  /*if (MSLevel == "StageA") {
    ctx.fillText(
      "Your target TSH range is: 0.01-0.1 mlU/L",
      25, 350);
    levelAwrite(ctx, TSH);
    levelAMeter(ctx, TSH);
  } else if (MSLevel == "StageB") {
    ctx.fillText(
      "Your target TSH range is: 0.1-0.5 mlU/L",
      25, 350);
    levelBwrite(ctx, TSH);
    levelBMeter(ctx, TSH);
  } else if (MSLevel == "StageC") {
    ctx.fillText(
      "Your target TSH range is: 0.35-2.0 mlU/L",
      25, 350);
    levelCwrite(ctx, TSH);
    levelCMeter(ctx, TSH);
  } */
}

//For deciding what to write for given values of TSH level A
function levelAwrite(ctx, MassSize) {
  if ((MassSize >= 0.0) && (MassSize <= 10.0)) {
    writeAdvice(ctx, "green");
  } else if ((MassSize > 10.1) && (MassSize <= 30.0)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}



function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "Please consult with your family";
    adviceLine2 = "physician urgently.";
  } else if (level == "yellow") {
    adviceLine1 =
      "Contact family physician and get his opinion";
    adviceLine2 = "on what to do.";
  } else if (level = "green") {
    adviceLine1 =
      "Keep an eye on the mass and make sure it";
	adviceLine2 =
		"is not growing exponetially.";
  }
  ctx.fillText("Your Mass Size is in the " + level +
    " range.", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}

function levelAMeter(ctx, MassSize) {
  if (MassSize <= 40) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 40, MassSize)
      .Set("chart.colors.ranges", [
        [30.1, 40.0, "red"],
        [10.1, 30.0, "yellow"],
        [0.00, 10.0, "#0f0"]
      ]);
  } else {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, MassSize, MassSize)
      .Set("chart.colors.ranges", [
        [0.0, 10.0, "#0f0"],
        [10.1, 30.0, "yellow"],
        [30.1, MassSize, "red"]
      ]);
  }
  drawMeter(cg);
}



// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", " mm")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Mass Size")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}