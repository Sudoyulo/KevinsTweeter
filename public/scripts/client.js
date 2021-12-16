/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function() {

  $("#formTweet").submit((event) => {
    event.preventDefault();

    let readyToSubmit = true;
    const formData = $("#formTweet").serialize();
  
    console.log(formData.length)

    if (formData.length < 6) {
      alert("Your tweet is empty");
      readyToSubmit = false;
    } else if (formData.length > 140) {
      alert("Your tweet is too long");
      readyToSubmit = false;
    }

    if (readyToSubmit) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData
      });
    }

  });

  const loadTweets = () => {

    const allPosts = $.ajax({   //does this return as json?
      type: "GET",
      url: "/tweets",
    });
  
    renderTweets(allPosts);

  };

  loadTweets(data);

});




const renderTweets = function(tweets) {

  const $container = $('#tweet-container');

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



