// getting Elements of indexedDB.html for manipulate them 

let gameArea = document.querySelector(".gameArea");
let board = document.querySelector(".board");
let score = document.querySelector(".score");
let ResultScore = document.querySelector(".ResultScore");
let ResulthighScore = document.querySelector(".ResulthighScore");
let highScore = document.querySelector(".highScore");
let modalforfirstTime = document.querySelector(".modalforfirstTime");
let resultCard = document.querySelector(".resultCard");
let restart = document.querySelector(".restart");
//to stop game until pressed restart
let gameON = true

//music checkBox

let musicCheckBox = document.querySelector(".musicCheckBox")
    // music Files 
const foodSound = new Audio("./music/food.mp3")
const gameoverSound = new Audio("./music/gameover.mp3")
const moveSound = new Audio("./music/move.mp3")
const MusicSound = new Audio("./music/music.mp3")
    // variables and constant that we will need in logic 
let snakePosition = [{ x: 19, y: 20 }, { x: 20, y: 20 }];

// x= number of row , y = number of columns
// initial direction of snake upwards  
let direction = { x: 0, y: 0 };
let lastTimeFrame = 0;
const speed = 30
let firstTime = true
let food = { x: 7, y: 8 }
let realScore = 0






// functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTimeFrame) / 1000 < 5 / speed) {
        return;
    }
    if (gameON) {
        moveSnake()
    }


    lastTimeFrame = ctime


}

function moveSnake() {

    //    changeposition  of snake 

    // check for bump

    if (snakebumped()) {
        gameoverSound.play()
        gameON = false

        resultCard.style.display = "block";
        ResulthighScore.innerText = realHighScore
        ResultScore.innerText = realScore
        board.style.display = "none";

        return;

    }

    // food eaten
    if (snakePosition[0].x == food.x && snakePosition[0].y == food.y) {
        snakePosition.push({ x: snakePosition[snakePosition.length - 1].x + direction.x, y: snakePosition[snakePosition.length - 1].y + direction.y })
        let a = 1;
        let b = 20;
        realScore++;
        foodSound.play()
        if (realScore > realHighScore) {
            realHighScore = realScore
            localStorage.setItem("realHighScore", JSON.stringify(realHighScore))
            highScore.innerText = realHighScore
        }
        score.innerText = realScore

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    let snakePositionOld = JSON.parse(JSON.stringify(snakePosition));
    // move snake
    if (direction.x != 0 || direction.y != 0) {



        for (let i = 0; i < snakePosition.length; i++) {

            if (i == 0) {

                snakePosition[i].x += direction.x
                snakePosition[i].y += direction.y


            } else {
                snakePosition[i].x = snakePositionOld[i - 1].x
                snakePosition[i].y = snakePositionOld[i - 1].y

                // }

            }
        }
    }
    gameArea.innerHTML = "";
    //again show same food
    var appleDiv = document.createElement("div")
    appleDiv.classList.add("food")
    appleDiv.setAttribute("id", "apple")
    appleDiv.style.gridRowStart = food.x
    appleDiv.style.gridColumnStart = food.y
    gameArea.appendChild(appleDiv)
    gameArea.appendChild(appleDiv)


    // render snake 
    snakePosition.forEach((e) => {
        if (e.y == 21) {} else {
            div = document.createElement("div")
            div.classList.add("snake")
            div.style.gridRowStart = e.x
            div.style.gridColumnStart = e.y
            if (e == snakePosition[0]) {
                div.style.background = "blue";
            }
            gameArea.appendChild(div)
        }
    });

    snakePositionOld = []

}

function snakebumped() {
    // bumped to wall
    if (snakePosition[0].x < 1 || snakePosition[0].y < 1 || snakePosition[0].x > 20 || snakePosition[0].y > 20) {

        return true;
    }

    for (let i = 1; i < snakePosition.length; i++) {
        if (snakePosition[0].x === snakePosition[i].x && snakePosition[0].y === snakePosition[i].y) {
            return true;
        }
    }
}





// get highest score from loacal storage
let realHighScore = localStorage.getItem("realHighScore");
if (realHighScore === null) {
    realHighScore == 0;
    localStorage.setItem("realHighScore", JSON.stringify(realHighScore))
} else {
    realHighScore = JSON.parse(realHighScore)
    highScore.innerText = realHighScore
}
//music on /off

let musicOff = true
musicCheckBox.addEventListener("click", () => {
    if (musicOff) {
        MusicSound.play()
        musicCheckBox.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/000000/speaker.png" />`
        musicOff = false
    } else {
        musicOff = true
        MusicSound.pause()
        musicCheckBox.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/000000/mute--v1.png" />`
    }
});
document.addEventListener("keydown", (e) => {
    direction = { x: -1, y: 0 }
    if (firstTime) {
        window.requestAnimationFrame(main);
        modalforfirstTime.remove()
        firstTime = false


    }
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":

            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowDown":

            direction.x = 1;
            direction.y = 0;
            break;

        case "ArrowLeft":

            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowRight":

            direction.x = 0;
            direction.y = 1;
            break;
        default:
            break;
    }

});
// for restart Game
restart.addEventListener("click", () => {
    direction = { x: -1, y: 0 };
    snakePosition = [{ x: 18, y: 20 }, { x: 19, y: 20 }];
    gameON = true
    resultCard.style.display = "none";
    board.style.display = "block";
    realScore = 0
    score.innerText = realScore
});