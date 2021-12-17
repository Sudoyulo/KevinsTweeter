/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".compose").click(hideTweetBox);

  $(".back-to-top").click(() => {
    window.scroll(0, 0);
  });

  $(window).scroll(showBackToTop);

  loadTweets();

  $("#formTweet").submit(submitTweet);
});

//hides box if compose button is clicked
const hideTweetBox = () => { 
  if ($(".new-tweet").is(":visible")) {
    $(".new-tweet").slideUp(500);
  } else {
    $(".new-tweet").focus();
    $(".new-tweet").slideDown(500);
    window.scroll(0, 0);
  }
};

//to remove risk of hacking
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const showBackToTop = () => {
  scrollPosition = $(this).scrollTop();
  if (scrollPosition >= 300) {
    $(".back-to-top").css("visibility","visible");
  } else {
    $(".back-to-top").css("visibility","hidden");
  }
};

const renderTweets = function(tweets) {
  const $container = $('#tweet-container').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $container.prepend($tweet);
  }
};

const loadTweets = async() => {
  const allPosts = await $.ajax({
    type: "GET",
    url: "/tweets",
  });
  renderTweets(allPosts);
};

const createTweetElement = (tweetData) => {
  let post = `
  <article class="single-tweet">
  <div class ="tweet-header">
    <div class ="pp-and-handle">
      <img class= "profile-picture" src="${tweetData.user.avatars}" />
      <p class="firstName"> ${tweetData.user.name}</p>
    </div>
    <p class="mention"> ${tweetData.user.handle} </p>
  </div>
  <p class="tweet-contents">${escape(tweetData.content.text)}</p>
  <footer>
    <div>
      <p class="time-ago"> ${timeago.format(tweetData.created_at)}</p>
    </div>
    <div class="socials">
      <i class="fas fa-thumbs-up"></i> &nbsp
      <i class="fas fa-thumbs-down"></i>&nbsp
      <i class="fas fa-retweet"></i>
    </div>
  </footer>
</article>
`;
  return post;
};

const submitTweet = (event) => {
  event.preventDefault();

  //removes whitespace from counted text
  let formLength = $("#tweet-text").val().trim().length;

  if (formLength < 1) {
    $(".error").html(`<i class="fas fa-rupee-sign"></i> &nbsp Cannot submit empty tweet &nbsp <i class="fas fa-yen-sign"></i>`).slideDown().delay(2000).slideUp(500);
    return;
  } else if (formLength > 140) {
    $(".error").html(`<i class="fas fa-rupee-sign"></i> &nbsp Tweet too long &nbsp <i class="fas fa-yen-sign"></i>`).slideDown().delay(2000).slideUp(500);
    return;
  }
  
  const formData = $("#formTweet").serialize();

  $.ajax({
    type: "POST",
    url: "/tweets",
    data: formData,
    success: loadTweets
  });

  //resets tweet box and count
  $("#tweet-text").val("");
  $(".counter").val("140");
};