function validate() {
  var name = document.getElementById("name").value;
  var subject = document.getElementById("subject").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var error_message = document.getElementById("error_message");

  error_message.style.padding = "10px";

  var text;

  // Validate name
  if (name.length < 5) {
    text = "Please Enter a Valid Name (at least 5 characters)";
    error_message.innerHTML = text;
    return false;
  }

  // Validate subject
  if (subject.length < 10) {
    text = "Please Enter a Correct Subject (at least 10 characters)";
    error_message.innerHTML = text;
    return false;
  }

  // Validate phone number
  var phoneRegex = /^\+\d{12}$/;
  if (!phone.match(/^(\+\d{12}|\d{11})$/)) {
    text =
      "Please enter a valid phone number. Accepted formats: +201651087555 or 01651087555.";
    error_message.innerHTML = text;
    return false;
  }

  // Validate email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    text = "Please Enter a Valid Email Address";
    error_message.innerHTML = text;
    return false;
  }

  // Validate message length
  if (message.length <= 140) {
    text = "Please Enter More Than 140 Characters for the Message";
    error_message.innerHTML = text;
    return false;
  }

  // All validations passed
  alert("Form Submitted Successfully!");
  return true;
}
