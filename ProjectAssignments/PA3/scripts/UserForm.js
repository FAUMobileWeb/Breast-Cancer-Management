$("#btnUserClear").click(function () {
  clearUserForm();
});

$("#frmUserForm").submit(function () { //Event : submitting the form
  saveUserForm();
  return true;
});

function checkUserForm() { //Check for empty fields in the form
  //for finding current date 
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' +
    (('' + month).length < 2 ? '0' : '') +
    month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

  if (($("#txtFirstName").val() != "") &&
    ($("#txtLastName").val() != "") &&
    ($("#txtHealthCardNumber").val() != "") &&
    ($("#datBirthdate").val() != "") && ($(
      "#datBirthdate").val() <= currentDate) &&
    ($("#slcCancerType option:selected").val() !=
      "Select Cancer Type") &&
    ($("#slcCancerStage option:selected").val() !=
      "Select Cancer Stage") &&
    ($("#slcBRCA1 option:selected").val() !=
      "Select BRCA1 type") &&
	  
	($("#slcBRCA2 option:selected").val() !=
      "Select BRCA2 type") &&
	  
	  $("#slcHER2 option:selected").val() !=
      "Select HER2 type")
	  {
    return true;
  } else {
    return false;
  }
}

function saveUserForm() {
  if (checkUserForm()) {
    var user = {
      "FirstName": $("#txtFirstName").val(),
      "LastName": $("#txtLastName").val(),
      "HealthCardNumber": $(
        "#txtHealthCardNumber").val(),
      "NewPassword": $("#changePassword").val(),
      "DOB": $("#datBirthdate").val(),
      "CancerType": $(
        "#slcCancerType option:selected").val(),
      "CancerStage": $(
        "#slcCancerStage option:selected").val(),
      "BRCA1": $(
        "#slcBRCA1 option:selected").val(),
	"BRCA2": $(
        "#slcBRCA2 option:selected").val(),
		
	"HER2": $(
        "#slcHER2 option:selected").val()
    
    };

    try {
      localStorage.setItem("user", JSON.stringify(
        user));
      alert("Saving Information");

      $.mobile.changePage("#pageMenu");
      window.location.reload();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
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

function clearUserForm() {
  localStorage.removeItem("user");
  alert("The stored data have been removed");
  $("#slcCancerStage").val(
    "Select Cancer Stage");
  $('#slcCancerStage').selectmenu('refresh',
    true);
  $("#slcCancerType").val("Select Cancer Type");
  $('#slcCancerType').selectmenu('refresh',
    true);
  $("#slcBRCA1").val("Select BRCA1 Type");
  $('#slcBRCA1').selectmenu('refresh', true);
  
   $("#slcBRCA2").val("Select BRCA2 Type");
  $('#slcBRCA2').selectmenu('refresh', true);
  
   $("#slcHER2").val("Select HER2 Rangee");
  $('#slcHER2').selectmenu('refresh', true);
}

function showUserForm() { //Load the stored values in the form
  try {
     var user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (user != null) {
    $("#txtFirstName").val(user.FirstName);
    $("#txtLastName").val(user.LastName);
    $("#txtHealthCardNumber").val(user.HealthCardNumber);
    $("#changePassword").val(user.NewPassword);
    $("#datBirthdate").val(user.DOB);
    $('#slcCancerType option[value=' + user.CancerType +
      ']').attr('selected', 'selected');
    $("#slcCancerType option:selected").val(
      user.CancerType);
    $('#slcCancerType').selectmenu('refresh',
      true);
    $('#slcCancerStage option[value=' + user.CancerStage +
      ']').attr('selected', 'selected');
    $("#slcCancerStage option:selected").val(
      user.CancerStage);
    $('#slcCancerStage').selectmenu('refresh',
      true);
    $('#slcBRCA1 option[value=' + user.BRCA1 +
      ']').attr('selected', 'selected');
    $("#slcBRCA1 option:selected").val(user.BRCA1);
    $('#slcBRCA1').selectmenu('refresh',
      true);
	  
	  $('#slcBRCA2 option[value=' + user.BRCA2 +
      ']').attr('selected', 'selected');
    $("#slcBRCA12 option:selected").val(user.BRCA2);
    $('#slcBRCA2').selectmenu('refresh',
      true);
	  
	  
	    $('#slcHER2 option[value=' + user.HER2 +
      ']').attr('selected', 'selected');
    $("#slcHER2 option:selected").val(user.HER2);
    $('#slcHER2').selectmenu('refresh',
      true);
  }
  }
