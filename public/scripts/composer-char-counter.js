
$(document).ready(function() {
  const $tweetText = $("#tweet-text"); //the text box
  const $counter = $(".counter");
  
  $tweetText.on("keyup", (event) => {
    // console.log(event.target.value) //the input field
    let inputLength = event.target.value.length;
    $counter.val(140-inputLength)

    if (inputLength > 140) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "#F5E6E8");
    }



  });
});