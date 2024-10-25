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
    if (canClick && checkWin) {
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
                    raisedCards--;
                    canClick = false;
                    checkCouples(card1, card2, raisedCards);
                    //timeout 2 s for use click again
                    setTimeout(() => {
                        canClick = true;
                    }, 2000);

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
                    }, 2000);
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

            }, 2000)

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
            }, 2000)

            condition = "no-couple"; //take the condition as no-couple
            return condition;
        }
    }

}

let score_sum = 0;

const checkScore = (condition) => {
    if (checkWin) {
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

    } else {
        console.log("juego terminado, bonificación de puntos");

        if (score_sum <= 0) {
            score_sum + 20;
            score.textContent = score_sum;

        }else{

        }


        //logic of time score

        // let puntaje = score_sum;
        // let tiempo = 0;
        // let bonificacion = 0;

        // if (tiempo <= 30) {
        //     bonificacion = puntaje * 2;
        // } else if (tiempo <= 60) {
        //     bonificacion = puntaje * 1.5;
        // } else if (tiempo <= 90) {
        //     bonificacion = puntaje * 1.2;
        // } else {
        //     bonificacion = puntaje * 1;
        // }

        // score_sum += bonificacion;
        // score.textContent = score_sum;


    }




}


const checkWin = () => {
    console.log(cfw);
    // verify if there are 9 couples


    if (cfw === 9) {
        console.log("Sin imagenes");
        game__logs.textContent = "Has Ganado!!!!!";

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

//clock still in process / NO FUNCIONA
const clock = () => {
    if (sinTiempo) {
        seg.textContent = "29";
        puntuacion.textContent = "00";
        y = true;
        sinTiempo = false;
        segundos = setInterval(resta, 1000);
        cente = setInterval(centesimas, 10);
        random();
    }

}



const resta = () => {
    if (y == true) {
        let s = "0" + (seg.textContent -= 1);
        seg.textContent = s.slice(-2);

    }

}

const centesimas = () => {
    if (y == true) {
        if (cent.textContent == ":00")
            cent.textContent = ":99";
        let c = cent.textContent.slice(-2);
        c -= 1;
        let t = cent.textContent = "0" + c;
        t = t.slice(-2);
        cent.textContent = ":" + t;

        if (seg.textContent == "00" && cent.textContent.slice(-2) == "00") {
            clearInterval(segundos);
            clearInterval(cente);
            sinTiempo = true;
        }
    }

}





//EVENTOS
start__btn.addEventListener("click", startGame);
game__visor.addEventListener("click", reverseCard);