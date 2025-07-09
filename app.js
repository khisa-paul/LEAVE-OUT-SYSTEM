
const scriptURL = "https://script.google.com/macros/s/AKfycbxnPR4CCNsqg5wme9QPeGeHpzOQmrb4cX0arOZ2P6g74NmJXIOQTmPP5tclBuBpjirkTA/exec";

function getFormData() {
  const form = document.getElementById("leaveForm");
  return Object.fromEntries(new FormData(form).entries());
}

function sendSMS() {
  const data = getFormData();
  data.type = "sms";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(alert)
  .catch(err => alert("SMS failed: " + err));
}

function printSheet() {
  const data = getFormData();
  data.type = "print";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(link => window.open(link, "_blank"))
  .catch(err => alert("Print failed: " + err));
}

function saveData() {
  const data = getFormData();
  data.type = "save";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(alert)
  .catch(err => alert("Save failed: " + err));
}

function searchStudent() {
  const admNo = document.querySelector('[name="ADM_NO"]').value;
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ type: "search", ADM_NO: admNo }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    if (data.STUDENT_NAME) {
      document.querySelector('[name="STUDENT_NAME"]').value = data.STUDENT_NAME;
      document.querySelector('[name="FORM"]').value = data.FORM;
      document.querySelector('[name="PARENT_CONTACT"]').value = data.PARENT_CONTACT;
    } else {
      alert("Student not found");
    }
  })
  .catch(err => alert("Error: " + err));
}
