var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

function nextSequence(){ // Function chooses Random colour 

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    
    playSound(randomChosenColour); // Plays Sound when random colour is choosed 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Blinks when the colour is selected 
    
}

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");  
          startOver();
    }
}
 function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
 }

$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1 );
});


function playSound(name){    //Plays sound

    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function animatePress(currentColour){ // Add animation when button is tapped
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


