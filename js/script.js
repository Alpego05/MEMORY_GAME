//ELEMENTOS
const frutas = ["fresa.png", "fresa.png", "kiwi.png", "kiwi.png", "limon.png", "limon.png", "mango.png", "mango.png",
    "naranja.png", "naranja.png", "pera.png", "pera.png", "sandia.png", "sandia.png", "uva.png", "uva.png", "manzana.png", "manzana.png"];


const start = document.getElementById("start");
const start__btn = document.getElementById("start__btn");
const game__visor = document.getElementById("game__visor");
const game = document.getElementById("game");
const game__logs = document.getElementById("game__logs");

//como le hacemos para que solo se levanten 2

//FUNCIONES
//funcíon que voy a usar como main para poder manejar las otras funciones
const startGame = (event) => {
    if (event.target.nodeName === "BUTTON") {
        start.style.display = "none";
        game.style.display = "flex";
        barajarCartas();

    }

}

//funcion para barajar las cartas del array frutas
const barajarCartas = () => {
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

//elementos que necesitamos en reverseCard
let raisedCards = 0;
let card1 = null;
let card2 = null;
let canClick = true;//variable para que cuando haya una pareja  ya no se pueda hacer click

//funcion para dar la vuelta a las cartas
const reverseCard = (event) => {

    if (canClick) { 
        if (event.target.nodeName === "IMG" && raisedCards < 2) {
            const index = event.target.getAttribute("alt");
            event.target.src = "./assets/images/fruits/" + frutas[index];
            raisedCards++;

            if (raisedCards === 1) {
                card1 = event.target; 
            } else if (raisedCards === 2) {
                card2 = event.target; 

                if (card1.getAttribute("alt") === card2.getAttribute("alt")) {
                    game__logs.textContent = "No vale pulsar la misma carta!!";
                    raisedCards--;
                    canClick = false;
                    checkCouples(card1, card2, raisedCards);
                    canClick = true;
                } else {
                    canClick = false;
                    checkCouples(card1, card2, raisedCards);
                    raisedCards = 0;
                    canClick = true;
                }
            }
        }
    }
}

const checkCouples = (card1, card2, raisedCards) => {

    if (raisedCards === 1) {
        card1.classList.add("game__card-wrong");

    } else if (raisedCards === 2) {
        if (card1.src === card2.src) {
            card1.classList.add("game__card-right");
            card2.classList.add("game__card-right");

            setTimeout(() => {
                card1.remove();
                card2.remove();
                card1.classList.remove("game__card-right");
                card2.classList.remove("game__card-right");
            }, 2000)

            return true;
        } else {
            card1.classList.add("game__card-wrong");
            card2.classList.add("game__card-wrong");

            setTimeout(() => {
                card1.src = "../assets/images/reverse_card.png";
                card2.src = "../assets/images/reverse_card.png";
                card1.classList.remove("game__card-wrong");
                card2.classList.remove("game__card-wrong");
            }, 2000)

            return false;
        }
    }

}

//EVENTOS
start__btn.addEventListener("click", startGame);
game__visor.addEventListener("click", reverseCard);