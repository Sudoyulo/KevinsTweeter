/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const loadTweets = async() => {

    const allPosts = await $.ajax({   //does this return as json?
      type: "GET",
      url: "/tweets",
    });
  
    renderTweets(allPosts);

  };

  $("#formTweet").submit((event) => {
    event.preventDefault();

    let readyToSubmit = true;
    let formLength = $("#tweet-text").val().length;
    
    console.log(formLength);


    if (formLength < 1) {
      alert("Your tweet is empty");
      readyToSubmit = false;
    } else if (formLength > 140) {
      alert("Your tweet is too long");
      readyToSubmit = false;
    }
    
    if (readyToSubmit) {
      const formData = $("#formTweet").serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: loadTweets
      });

      $("#tweet-text").val("");
    }

  });

});



const renderTweets = function(tweets) {

  const $container = $('#tweet-container').empty();

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $container.prepend($tweet);
  }
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
  <p class="tweet-contents">${tweetData.content.text}</p>
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



