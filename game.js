var userClickedPattern = []; //Empty array

var gamePattern = []; //Create new empty array

//Define an array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

//Assign the start mode to false on load
var started = false;
var level = 0;

//Define a function to get next sequence
function nextSequence() {

    //Reset the userClickedPattern for every instance of nextSequence
    userClickedPattern = [];

    level++; //Increment the level with function is called

    $("#level-title").text(`Level ${level}`); //Change level for every time the function is called

    //Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    //Generate a random color using our array and random number
    var randomChosenColour = buttonColours[randomNumber];

    //Add the generated color to the end of our new array
    gamePattern.push(randomChosenColour);

    //Animate a flash to the button with the random color generated
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Call the playSound function here
    playSound(randomChosenColour);

}

$(".btn").click(function() {

    //Define a variable and assign the clicked button's Id to it
    var userChosenColour = $(this).attr("id");

    //Add the content of userChosenColour to the end of userClickedPatter array
    userClickedPattern.push(userChosenColour);

    //Call the playSound function on the click event
    playSound(userChosenColour);

    //Call the animatePress function here
    animatePress(userChosenColour);

    //Call check answer after the user has clicked
    checkAnswer(userClickedPattern.length - 1);
});

//Function to play sounds
function playSound(name) {

    //Add the sound that corresponds with the name
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Function to animate the click of a colour
function animatePress(currentColour) {
    //Add the .pressed class to the button that gets clicked
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    //Check if game has started
    if (!started) {
        //Change the level to start
        $("#level-title").text(`Level ${level}`);

        //Call the next sequence function
        nextSequence();

        //Change the started to true so other keypresses won't triger anything
        started = true;
    }
    
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {

                nextSequence();

            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Start!");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
