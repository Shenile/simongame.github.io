var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var isLevelFinished = false; // Fix typo: isLevelFinished instead of islvlFinished

$(document).on("keypress", function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Remove the duplicate event listener for click and touchstart
// $(".btn").on("click touchstart", function() {
//   var userChosenColour = $(this).attr('id');
//   userClickedPattern.push(userChosenColour);
//   playSound(userChosenColour);
//   animatePress(userChosenColour);
//   checkAnswer(userClickedPattern.length - 1);
// });

function nextSequence() {
  // Fix random number generation
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('.' + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevelIndex) {
  // Check if the user's sequence matches the game pattern up to the current index
  for (var i = 0; i <= currentLevelIndex; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      $('body').addClass("game-over");
      playSound("wrong");
      setTimeout(function () {
        $('body').removeClass('game-over');
      }, 200);
      $('h1').text("Game Over  Press Any Key To Restart");
      gamePattern = []; // Fix: use an assignment to clear the array
      gameStarted = false;
      level = 0;
      return; // Exit the function if there's a mismatch
    }
  }

  // Check if the user has finished the level
  if (currentLevelIndex === gamePattern.length - 1) {
    isLevelFinished = true;
    setTimeout(function () {
      nextSequence();
    }, 1000);
    userClickedPattern = []; // Fix: use an assignment to clear the array
  }
}
