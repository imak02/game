var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(".btn").on("click", function (event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50);

  $("h1").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("div #" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("div #" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").attr("class", "game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game Over!! Press any key to restart...");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false;
}
