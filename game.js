
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function () {
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
  });

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer();
});

function checkAnswer () {
if (gamePattern.length === userClickedPattern.length){
  var compareArray = JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern);
  if (compareArray === true){
    console.log ("true");
    setTimeout(function () {
    nextSequence ();
  }, 1500);
  }
  else {
    console.log ("wrong");
    playSound("wrong");
    gameOver();
    $("#level-title").text("Game Over, Press any key to restart");
    startOver();
  }
}
}

function nextSequence() {

  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn("fast").fadeOut("fast").fadeIn("fast");
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}