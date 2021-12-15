/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.getElementById('tweet-container').innerHTML = `<article class="tweet">Hello world</article>`;

$(document).ready(function() {

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
        <p class="time-ago"> ${tweetData.created_at}</p>
      </div>
      <div class="socials">
        <i class="fas fa-thumbs-up"></i>
        <i class="fas fa-thumbs-down"></i>
        <i class="fas fa-retweet"></i>
      </div>
    </footer>
  </article>
  `

    return post;
};

});

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);
console.log($tweet);
$('#tweet-container').append($tweet); 
