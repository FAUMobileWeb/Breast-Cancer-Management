// Removes all Pres data from localStorage 
$("#btnClearPresHistory").click(function () {
  localStorage.removeItem("tbPres");
  listPres();
  alert("All Prescriptions have been deleted.");
});

/* The value of the Submit Pres button is used
 * to determine which operation should be
 * performed
 */
$("#btnAddPres").click(function () {
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
  $("#btnSubmitPres").val("Add").button(
    "refresh");
});

$("#frmNewPresForm").submit(function () {
  var formPresOperation = $("#btnSubmitPres").val();

  if (formPresOperation == "Add") {
    addPres();
    $.mobile.changePage("#pagePres");
  } else if (formPresOperation == "Edit") {
    editPres($("#btnSubmitPres").attr(
      "indexToEdit"));
    $.mobile.changePage("#pagePres");
    $("#btnSubmitPres").removeAttr(
      "indexToEdit");
  }

  /*Must return false, or else submitting form
   * results in reloading the page
   */
  return false;
});

$("#pageNewPresForm").on("pageshow", function () {
  //We need to know if we are editing or adding a Pres everytime we show this page
  //If we are adding a Pres we show the form with blank inputs
  var formPresOperation = $("#btnSubmitPres").val();

  if (formPresOperation == "Add") {
    clearPresForm();
  } else if (formPresOperation == "Edit") {
    //If we are editing a Pres we load the stored data in the form
    showPresForm($("#btnSubmitPres").attr(
      "indexToEdit"));
  }
});

function loadPresuserPresInformation() {
  try {
    var userPres = JSON.parse(localStorage.getItem(
      "userPres"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
  if (userPres != null) {
    $("#divuserPresSectionPres").empty();
    var today = new Date();
    var dob = new Date(userPres.dob);
    var age = Math.floor((today - dob) / (
      365.25 * 24 * 60 * 60 * 1000));

    //Display appropriate Cancer Stage
    if (userPres.CancerStage == "StageOne") {
      userPres.CancerStage = "Stage I";
    } else if (userPres.CancerStage == "StageTwo") {
      userPres.CancerStage = "Stage II";
    } else if (userPres.CancerStage == "StageThree") {
      userPres.CancerStage = "Stage III";
    } 
	 else if (userPres.CancerStage == "StageFour") {
      userPres.CancerStage = "Stage IV";
    }else {
      userPres.CancerStage = "Not Sure";
    }

	
	//Display appropriate Cancer Type
	 if (userPres.CancerType == "Tubular") {
      userPres.CancerType = "Tubular";
    } else if (userPres.CancerType == "Mucinous") {
      userPres.CancerType = "Mucinous";
    } else if (userPres.CancerType == "Medullary") {
      userPres.CancerType = "Medullary";
    } 
	 else if (userPres.CancerType == "Cribriform") {
      userPres.CancerType = "Cribriform";
    }else {
      userPres.CancerType = "Not Sure";
    }

	
	
	
    //Display appropriate BRCA1 Range
    if (userPres.BRCA1 == "pos1") {
      userPres.BRCA1 = "Positive";
    } else if (userPres.BRCA1 == "neg1") {
      userPres.BRCA1 = "Negative";
    }else {
      userPres.BRCA1 = "Not Sure";
    }
   
    //Display appropriate BRCA2 Range
    if (userPres.BRCA2 == "pos2") {
      userPres.BRCA2 = "Positive";
    } else if (userPres.BRCA2 == "neg2") {
      userPres.BRCA2 = "Negative";
    }else {
      userPres.BRCA2 = "Not Sure";
    }
	
	//Display appropraite HER2 range
	
	 if (userPres.HER2 == "zero") {
      userPres.HER2 = "0";
    } else if (userPres.HER2 == "one") {
      userPres.HER2 = "+1";
    } else if (userPres.HER2 == "two") {
      userPres.HER2 = "+2";
    } 
	 else if (userPres.HER2 == "three") {
      userPres.HER2 = "+3";
    }else {
      userPres.HER2 = "Not Sure";
    }

	
	

    $("#divuserPresSectionPres").append("userPres's Name:" +
      userPres.FirstName + " " + userPres.LastName +
      "<br>age: " + age +
      "<br>Health Card Number: " + userPres.HealthCardNumber +
      "<br>Cancer Type: " + userPres.CancerType +
      "<br>Cancer Stage: " + userPres.CancerStage +
	  "<br>BRCA1: " + userPres.BRCA1 +
	  "<br>BRCA2: " + userPres.BRCA2 +
	  "<br>HER2: " + userPres.HER2
	  );
    $("#divuserPresSectionPres").append(
      "<br><a href='#pageUserInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>"
    );
    $('#divuserPresSectionPres [data-role="button"]').button(); // 'Refresh' the button
  }
}

function clearPresForm() {
  $('#datPresDate').val("");
  $('#txtPres').val("");
 
  return true;
}

function compareDatesPres(a, b) {
  var x = new Date(a.Date);
  var y = new Date(b.Date);

  if (x > y) {
    return 1;
  } else {
    return -1;
  }
}

function listPres() {
  try {
    var tbPres = JSON.parse(localStorage.getItem(
      "tbPres"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  //Load previous Press, if they exist
  if (tbPres != null) {
    //Order the Press by date
    tbPres.sort(compareDatesPres);

    //Initializing the table
    $("#tblPres").html(
      "<thead>" +
      "   <tr>" +
      "     <th>Date Prescribed</th>" +
      "     <th> Presciption </th>" +         
      "     <th>Edit / Delete</th>" +
      "   </tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    //Loop to insert the each Pres in the table
    for (var i = 0; i < tbPres.length; i++) {
      var prec = tbPres[i];
      $("#tblPres tbody").append("<tr>" +
        "  <td>" + prec.Date + "</td>" +
        "  <td>" + prec.Pres + "</td>" +
        "</td>" +
        "  <td><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewPresForm' onclick='callEditPres(" +
        i +
        ")' data-icon='edit' data-iconpos='notext'></a>" +
        "  <a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDeletePres(" +
        i +
        ")' data-icon='delete' data-iconpos='notext'></a></td>" +
        "</tr>");
    }

    $('#tblPres [data-role="button"]').button(); // 'Refresh' the buttons. Without this the delete/edit buttons wont appear
  } else {
    tbPres = []; //If there is no data,set an empty array
    $("#tblPres").html("");
  }
  return true;
}

function showPresForm(indexPres) {
  try {
    var tbPres = JSON.parse(localStorage.getItem(
      "tbPres"));
    var prec = tbPres[indexPres];
    $('#datPresDate').val(prec.Date);
    $('#txtPres').val(prec.Pres);
    
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

/* Checks that userPress have entered all valid info
 * and that the date they have entered is not in
 * the future
 */
function checkPresForm() {
  //for finding current date 
  var dp = new Date();
  var month = dp.getMonth() + 1;
  var date = dp.getDate();
  var currentDate = dp.getFullYear() + '/' +
    (('' + month).length < 2 ? '0' : '') +
    month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

  if (($("#txtPres").val() != "") &&
    ($("#datPresDate").val() != "") &&
    ($("#datPresDate").val() <= currentDate)) {
    return true;
  } else {
    return false;
  }
}

function callEditPres(indexPres) {
  $("#btnSubmitPres").attr("indexToEdit",
    indexPres);
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
  $("#btnSubmitPres").val("Edit").button(
    "refresh");
}

// Delete the given index and re-display the table
function callDeletePres(indexPres) {
  deletePres(indexPres);
  listPres();
}

function addPres() {
  if (checkPresForm()) {
    var Pres = {
      "Date": $('#datPresDate').val(),
      "Pres": $('#txtPres').val()
    };

    try {
      var tbPres = JSON.parse(localStorage.getItem(
        "tbPres"));
      if (tbPres == null) {
        tbPres = [];
      }
      tbPres.push(Pres);
      tbPres.sort(compareDatesPres);
      localStorage.setItem("tbPres", JSON.stringify(
        tbPres));
      alert("Saving Information");
      clearPresForm();
      listPres();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }

  return true;
}

function deletePres(indexPres) {
  try {
    var tbPres = JSON.parse(localStorage.getItem(
      "tbPres"));

    tbPres.splice(indexPres, 1);

    if (tbPres.length == 0) {
      /* No items left in Press, remove entire 
       * array from localStorage
       */
      localStorage.removeItem("tbPres");
    } else {
      localStorage.setItem("tbPres", JSON.stringify(
        tbPres));
    }
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

function editPres(indexPres) {
  if (checkPresForm()) {
    try {
      var tbPres = JSON.parse(localStorage.getItem(
        "tbPres"));
      tbPres[indexPres] = {
        "Date": $('#datPresDate').val(),
        "Pres": $('#txtPres').val(),
        
      }; //Alter the selected item in the array
      tbPres.sort(compareDatesPres);
      localStorage.setItem("tbPres", JSON.stringify(
        tbPres)); //Saving array to local storage
      alert("Saving Information");
      clearPresForm();
      listPres();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }
}