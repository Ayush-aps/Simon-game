var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
  level+=1;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
  $("h1").text("Level "+level);
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
var start=false;
var play=true;
if(start==false){
  $("body").on("keydown",function (){ nextSequence() });
  start=true;
}
function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
  if(currentLevel==gamePattern.length-1){
    userClickedPattern=[];
    setTimeout( nextSequence(), 1000);
  }
  }
 else {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
 }
}
function startOver(){
  level=0;
  gamePattern = [];
  userClickedPattern = [];
}
