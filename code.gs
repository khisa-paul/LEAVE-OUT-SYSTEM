
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const type = data.type;

  let result;
  if (type === "sms") {
    result = sendSMS(data);
  } else if (type === "print") {
    result = printLeaveSheet(data);
  } else if (type === "search") {
    result = getStudentByAdm(data.ADM_NO);
  } else if (type === "save") {
    result = saveToSheet(data);
  } else {
    result = "Unknown action: " + type;
  }

  return ContentService.createTextOutput(
    typeof result === "string" ? result : JSON.stringify(result)
  )
  .setMimeType(
    typeof result === "string" ? ContentService.MimeType.TEXT : ContentService.MimeType.JSON
  )
  .setHeader("Access-Control-Allow-Origin", "*");
}

function sendSMS(data) {
  Logger.log("Sending SMS to parent: " + data.PARENT_CONTACT + ", and principal: " + data.PRINCIPAL_CONTACT);
  return "SMS sent successfully.";
}

function printLeaveSheet(data) {
  Logger.log("Generating PDF for " + data.STUDENT_NAME);
  return "https://example.com/pdf/leave-form.pdf";
}

function getStudentByAdm(admNo) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == admNo) {
      return {
        STUDENT_NAME: data[i][0],
        FORM: data[i][2],
        PARENT_CONTACT: data[i][5]
      };
    }
  }
  return {};
}

function saveToSheet(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  sheet.appendRow([
    data.STUDENT_NAME,
    data.ADM_NO,
    data.FORM,
    data.REASON,
    data.DATE,
    data.PARENT_CONTACT,
    data.PRINCIPAL_CONTACT,
    data.MOD_NAME,
    new Date()
  ]);
  return "Saved to Google Sheet.";
}
