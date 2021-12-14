console.log("Document has loaded");


$(document).ready(function() {
  console.log("Document is ready");
  
  $("#tweet-text").keyup(function() {
    console.log("Key is pressed");
  });
});