console.log("Document has loaded");


$(document).ready(function() {
  console.log("Document is ready");
  let numbersLeft = 0;
  
  $("#tweet-text").keypress(function(input) {
    numbersLeft = 139 - input.target.value.length;
    console.log(numbersLeft)

    if (numbersLeft > 140) {
      console.log("too much");
    }
    if (numbersLeft < 1) {
      console.log("not enough");
    }

  });
});