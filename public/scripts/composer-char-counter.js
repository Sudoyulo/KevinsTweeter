$(document).ready(function() {
  $("#tweet-text").on("keyup", onChange);
});

const onChange = (event) => {
  const $counter = $(".counter");

  let inputLength = event.target.value.trim().length;
  $counter.val(140 - inputLength);

  if (inputLength > 140) {
    $counter.css("color", "red");
  } else {
    $counter.css("color", "#192a51");
  }
};