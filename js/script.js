//ELEMENTOS
const frutas = ["fresa.png", "fresa.png", "kiwi.png", "kiwi.png", "limon.png", "limon.png", "mango.png", "mango.png",
    "naranja.png", "naranja.png", "pera.png", "pera.png", "sandia.png", "sandia.png", "uva.png", "uva.png", "manzana.png", "manzana.png"];

const animals = ["Dog 🐶", "Cat 🐈‍⬛", "Little Bird 🐤", "Whale 🐋", "Panda 🐼", "Monkey 🐒", "Dragon 🦖", "Rabbit 🐇", "Unicorn 🦄"];

const start = document.getElementById("start");
const start__btn = document.getElementById("start__btn");
const game__visor = document.getElementById("game__visor");
const game = document.getElementById("game");
const game__logs = document.getElementById("game__logs");
const score = document.getElementById("score");
const game__win = document.getElementById("game__win");
const win = document.getElementById("win");
const playerName = document.getElementById("playerName");
const nameP1 = document.getElementById("nameP1");

const time__min = document.getElementById("time__min");
const time__secs = document.getElementById("time__secs");

const finalScore = document.getElementById("finalScore");
const reset = document.getElementById("reset");

let player = ""; //name for the player used in startGame.

//FUNCTIONS

//function we use for start the game
const startGame = (event) => {
    if (event.target.nodeName === "BUTTON") {
        start.style.display = "none";
        game.style.display = "flex";

        //cojemos el nombre y se lo colocamos al jugador, ponemos un if por si lo deja en blanco con otro arra de nombres
        let player = playerName.value;

        if (player === "") {
            nameP1.textContent = animals[Math.floor(Math.random() * animals.length)];
        } else {
            nameP1.textContent = player + " 😊";
        }
        randomCards();
    }
}

//function we need for randomize the fruits array
const randomCards = () => {
    let posicion1, posicion2;
    let aux = "";

    for (let i = 0; i < frutas.length; i++) {
        posicion1 = Math.floor(Math.random() * frutas.length);
        posicion2 = Math.floor(Math.random() * frutas.length);

        aux = frutas[posicion1];
        frutas[posicion1] = frutas[posicion2];
        frutas[posicion2] = aux;
    }

}

//elements we need in reverseCard function
let raisedCards = 0;
let card1 = null;
let card2 = null;
let canClick = true;//variable for stop clicks when functions are procesing the cards
let clicks = 0; //total of click in the game used for start the clock function

//funcion to reverse cards and send it to checkCouples for check if they are the same

const reverseCard = (event) => {
    if (!timeStart) {
        timer();  //Starts the timer
    }

    if (canClick) {
        game__logs.textContent = "";
        if (event.target.nodeName === "IMG" && raisedCards < 2) {
            //we use the alt of the images for relate the array´s positions
            const index = event.target.getAttribute("alt");
            event.target.src = "./assets/images/fruits/" + frutas[index];
            raisedCards++;

            if (raisedCards === 1) {
                card1 = event.target;
            } else if (raisedCards === 2) {
                card2 = event.target;

                //if the card selected is the same one as already selected sends a game_log
                //and decrease the counter for let the player choose another one
                if (card1.getAttribute("alt") === card2.getAttribute("alt")) {
                    game__logs.textContent = "No vale pulsar la misma carta!!";
                    game__logs.classList.add("text_red");
                    raisedCards--;
                    canClick = false;
                    checkCouples(card1, card2, raisedCards);
                    //timeout 2 s for use click again
                    setTimeout(() => {
                        canClick = true;
                    }, 1000);

                } else {
                    canClick = false;
                    //calls checkCouples condition and later update the score
                    checkCouples(card1, card2, raisedCards);
                    checkScore(condition);

                    //sets timeout for let the player clic again
                    setTimeout(() => {
                        raisedCards = 0;
                        canClick = true;
                        checkWin();
                    }, 1000);
                }
            }
        }
    }
}

//elements used in checkCouples and later in checkscore

let condition = ""; // status used for increase or decrease the score
let cfw = 0; //couples for win used in checkwin function

const checkCouples = (card1, card2, raisedCards) => {

    //if the card is only one , just give the red border
    if (raisedCards === 1) {
        card1.classList.add("game__card-wrong");

        //if they are 2, they get compared
    } else if (raisedCards === 2) {
        if (card1.src === card2.src) {

            //I needed to create a div for swap the image when they are a couple so they desapear 
            //without moving
            const divElement = document.createElement('div');
            const divElement2 = document.createElement('div');

            //given same class for same atributes as the cards
            divElement.classList.add("game__card");
            divElement2.classList.add("game__card");

            //increase the couter of couples.
            cfw++;

            //timeout for them to disapear
            setTimeout(() => {
                card1.style.opacity = "0%";
                card2.style.opacity = "0%";

                //needed parentNode for replace the childs
                card1.parentNode.replaceChild(divElement, card1);
                card2.parentNode.replaceChild(divElement2, card2);

            }, 1000)

            condition = "couple"; //take the condition as  couple

            return condition;
        } else {
            card1.classList.add("game__card-wrong");
            card2.classList.add("game__card-wrong");

            setTimeout(() => {
                card1.src = "../assets/images/reverse_card.png";
                card2.src = "../assets/images/reverse_card.png";
                card1.classList.remove("game__card-wrong");
                card2.classList.remove("game__card-wrong");
            }, 1000)

            condition = "no-couple"; //take the condition as no-couple
            return condition;
        }
    }

}

//TIME FUNCTIONS

let minutes = 0;
let seconds = 0;
let timeInterval;
let timeStart = false;

const timer = () => {
    timeStart = true; // Change the booleam
    timeInterval = setInterval(updateTime, 1000);

};

const updateTime = () => {
    seconds++; // Increments seconds every 1 sec

    if (seconds === 60) { // 60 secs for 1 min and reset
        seconds = 0;
        minutes++;
    }

    // Update the text
    time__secs.textContent = seconds < 10 ? "0" + seconds : seconds;
    time__min.textContent = minutes < 10 ? "0" + minutes : minutes;
};


let score_sum = 0;

const checkScore = (condition) => {

   
       
        console.log("se actualizan los puntos");
        switch (condition) {

            //if couple we will increase the score by 5 points
            case "couple":
                score_sum += 5;
                score.textContent = score_sum;

                break;

            //if not a couple we will decrease the score by 1 point
            case "no-couple":
                score_sum -= 1;
                score.textContent = score_sum;

                break;
        }

     //if the game has ended
     if (checkWin()) {
        console.log("juego terminado, bonificación de puntos");

        if (score_sum <= 0) {
            score_sum += 20;
            score.textContent = score_sum;

        } else {
            let multiplier = 1; // Multiplier initial value
            
            if (time__min.textContent === 0 && time__secs.textContent <= 30) {
                multiplier = 2; 

            } else if ( (time__min.textContent === 1 && time__secs.textContent === 0) || time__secs.textContent <= 59 ) {
                multiplier = 1.5; 

            } else if (time__min.textContent === 1 && time__secs.textContent <= 30) {
                multiplier = 1.2; 
                
            } else {
                multiplier = 1; 
            }

            // Calculates the final score
            let Score = Math.round(score_sum * multiplier);
            console.log(multiplier)
            finalScore.textContent = Score;
        
    }
     }
        




}





const checkWin = () => {
    console.log(cfw);
    // verify if there are 9 couples


    if (cfw === 9) {
        console.log("Sin imagenes");
        game__logs.textContent = "Has Ganado!!!!!";
        game__logs.classList.remove("text_red");
        game__logs.classList.add("text_blue");

        //stops the timer
        clearInterval(timeInterval);

        //shows the section id win if the player has won.
        setTimeout(() => {
            game.style.display = "none";
            win.style.display = "block";
        }, 2000)

        return true;


    } else {
        console.log("hay imagenes");

        return false;

    }
}


const resetGame = () => {
    location.reload();
}




//EVENTOS
reset.addEventListener("click", resetGame);
start__btn.addEventListener("click", startGame);
game__visor.addEventListener("click", reverseCard);
