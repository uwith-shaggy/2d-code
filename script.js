var boy;
var idleImageNumber = 0;
var idleAnimationNumber = 0;
var runImageNumber = 0;
var runAnimationNumber = 0;
var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

var isJumping = false;
var jumpInterval;
var gravityInterval;

var boyPositionX = 150; // starting X position
var groundLevel = 50;   // ground Y position

window.onload = function () {
    boy = document.getElementById("boy");
    idleAnimationStart();
    document.addEventListener("keydown", keyCheck);
};

function idleAnimation() {
    idleImageNumber++;
    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }
    boy.src = "resources/idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
    clearInterval(runAnimationNumber);
    idleAnimationNumber = setInterval(idleAnimation, 200);
}

function runAnimation() {
    runImageNumber++;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = "resources/run (" + runImageNumber + ").png";

    // Move boy forward
    boyPositionX += 10;
    boy.style.left = boyPositionX + "px";
}

function runAnimationStart() {
    clearInterval(idleAnimationNumber);
    runAnimationNumber = setInterval(runAnimation, 100);

    // start moving background
    if (moveBackgroundAnimationId == 0) {
        moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
}

function keyCheck(event) {
    var keyCode = event.which || event.keyCode;

    // Enter key = run
    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }
    }

    // Spacebar = jump
    if (keyCode == 32 && !isJumping) {
        jump();
    }
}

function moveBackground() {
    backgroundImagePositionX -= 20; // scroll speed
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
}

function jump() {
    isJumping = true;
    let boyBottom = groundLevel;
    let jumpPeak = 200; // jump height

    // upward motion
    jumpInterval = setInterval(function () {
        if (boyBottom < jumpPeak) {
            boyBottom += 20;
            boy.style.bottom = boyBottom + "px";
        } else {
            clearInterval(jumpInterval);
            fall(boyBottom);
        }
    }, 50);
}

function fall(startHeight) {
    let boyBottom = startHeight;

    gravityInterval = setInterval(function () {
        if (boyBottom > groundLevel) {
            boyBottom -= 20;
            boy.style.bottom = boyBottom + "px";
        } else {
            clearInterval(gravityInterval);
            isJumping = false;
        }
    }, 50);
}

function createBoxes(){
   var box = document.createElement("div");
    box.className = "box";
    document.getElementById("background").appendChild(box);
}