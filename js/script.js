//ELEMENTOS
const frutas = ["fresa.png", "fresa.png", "kiwi.png", "kiwi.png", "limon.png", "limon.png", "mango.png", "mango.png",
    "naranja.png", "naranja.png", "pera.png", "pera.png", "sandia.png", "sandia.png", "uva.png", "uva.png", "manzana.png", "manzana.png"];


const start = document.getElementById("start");
const start__btn = document.getElementById("start__btn");
const game__visor = document.getElementById("game__visor");
const game = document.getElementById("game");
const game__logs = document.getElementById("game__logs");
const score = document.getElementById("score");


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

    if (canClick && checkWin) {
        game__logs.textContent = "";
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
                    //timeout 2 s para volver a poder hacer click
                    setTimeout(() => {
                        canClick = true;
                    }, 2000);

                } else {
                    canClick = false;
                    //desencadena varias funciones una despues de otra
                    checkCouples(card1, card2, raisedCards);
                    checkScore(condition);

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

let condition = "";

const checkCouples = (card1, card2, raisedCards) => {

    if (raisedCards === 1) {
        card1.classList.add("game__card-wrong");

    } else if (raisedCards === 2) {
        if (card1.src === card2.src) {

            //creamos un div para cambiarlo por la imagen y no pase por el filtro de que se pueda pulsar
            const divElement = document.createElement('div');
            const divElement2 = document.createElement('div');
            //le damos la misma clase para que ocupe lo mismo
            divElement.classList.add("game__card");
            divElement2.classList.add("game__card");

             setTimeout(() => {
                  card1.style.opacity = "0%";
                  card2.style.opacity = "0%";
3
                  card1.parentNode.replaceChild(divElement, card1);
                  card2.parentNode.replaceChild(divElement2, card2);
                 
             }, 2000)

            condition = "couple";
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

            condition = "no-couple";
            return condition;
        }
    }

}

let score_sum = 0;

const checkScore = (condition) => {
    if (checkWin) {
        console.log("se actualizan los puntos");
        switch (condition) {
            case "couple":
                score_sum += 5;
                score.textContent = score_sum;

                break;

            case "no-couple":
                score_sum -= 1;
                score.textContent = score_sum;

                break;
        }
    } else {
        console.log("juego terminado, bonificación de puntos");
        
        if(score_sum <= 0){
            score_sum+20;
            score.textContent = score_sum;

        }


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
    //muestra en consola las cartas que quedan

    console.log(game__visor.children.length);
    // Verificamos si existen imágenes en el contenedor
    if (game__visor.children.length === 0) {
        console.log("Sin imagenes");
        game__logs.textContent = "Has Ganado!!!!!";

        return true;

    } else {
        console.log("hay imagenes");
        return false;

    }
}


//EVENTOS
start__btn.addEventListener("click", startGame);
game__visor.addEventListener("click", reverseCard);