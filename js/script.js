//ELEMENTOS
const frutas = ["fresa.png", "fresa.png", "kiwi.png", "kiwi.png", "limon.png", "limon.png", "mango.png", "mango.png",
    "naranja.png", "naranja.png", "pera.png", "pera.png", "sandia.png", "sandia.png", "uva.png", "uva.png", "manzana.png", "manzana.png"];


const start = document.getElementById("start");
const start__btn = document.getElementById("start__btn");
const game__visor = document.getElementById("game__visor");
const game = document.getElementById("game");


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

let raisedCards = 0;

//funcion para dar la vuelta a las cartas
const reverseCard = (event) => {
    //ponemos la condicion de que solo se pueda levantar si son 2
    if (event.target.nodeName === "IMG" && raisedCards < 2) {
        //guardamos el alt de la imagen que tiene un numero del array en la variable

        const index = event.target.getAttribute("alt");
        event.target.src = "./assets/images/" + frutas[index];

        //aumentamos el contador
        raisedCards++;

    } else if (raisedCards >= 2) {
       if(checkCouples()){

       } else{

       }
    }
}


//EVENTOS
start__btn.addEventListener("click", startGame);
game__visor.addEventListener("click", reverseCard);



