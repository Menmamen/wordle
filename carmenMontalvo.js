"use strict";


let arrayLetras = []; //Para alamacenar las letras por separado para comprobar las coincidencias
let regPalabra = /^[a-zA-ZñÑ]{5}$/;
let regLetras = /^[a-zA-ZñÑ]{1}$/;


document.addEventListener("DOMContentLoaded", function () {
    let palabraDelDia = document.getElementsByClassName("palabra")[0];
    let error = document.getElementById("error");

    palabraDelDia.addEventListener("blur", function () {
        if (!regPalabra.test(palabraDelDia.value)) {
            error.innerHTML = "Debe introducir una palabra de 5 letras.";
            palabraDelDia.focus();
        } else {
            error.innerHTML = "";
            arrayLetras = palabraDelDia.value.split("");
            console.log(arrayLetras);
        }
    });
    palabraDelDia.addEventListener("keydown", function (e) {
        if (!regLetras.test(e.key)) {
            e.preventDefault();
        }
    });


    //Para acceder al boton voy a usar nextsibling del div con id grid
    let grid = document.getElementById("grid");
    let divBoton = grid.nextElementSibling;
    let boton = document.createElement("button");
    boton.innerText = "Comprobar";
    boton.style.backgroundColor = "green";
    divBoton.appendChild(boton);


    boton.addEventListener("click", function () {
        if (!regPalabra.test(palabraDelDia.value) || palabraDelDia.value === "") {
            error.innerHTML = "¡Debes introducir una palabra!";
            palabraDelDia.focus();
        } else {
            error.innerHTML = "";
        }
        //Añado la comprobación por fila
        if (filaVacia(filaActiva)) {
            error.innerHTML = "¡Debes introducir una letra en cada casilla!";
            filaActiva[0].focus();
        } else {
            //Compruebo la fila
            if (comprobarFila(filaActiva) === 5) {
                setTimeout(() => {
                    alert("¡Enhorabuena has ganado!");
                })
            } else if (intentos === 6) {
                setTimeout(() => {
                    alert("Lo siento has perdido :c");
                }, 300);
            } else {
                filaActiva[0].focus();
            }
        }
    });

    //aprovecho el grid para acceder a los hijos elementos
    let inputs = Array.from(grid.children);
    let filas = [];
    for (let i = 0; i < inputs.length; i += 5) {
        filas.push(inputs.slice(i, i + 5));
    }
    let intentos = 0;
    let filaActiva = filas[0];

    //a cada elemento le añado la comprobación de casillas en un keydown
    filas.forEach(fila => {
        fila.forEach(letra => {
            letra.addEventListener("keydown", function (e) {
                if (!regLetras.test(e.key)) {
                    e.preventDefault();
                }
            });
        });
    });




    function filaVacia(fila) {
        for (let i = 0; i < fila.length; i++) {
            if (fila[i].value === "") {
                return true;
            }
        }
        return false;
    };

    function comprobarFila(fila) {
        let letrasAcertadas = 0;
        console.log("entra");
        for (let i = 0; i < fila.length; i++) {
            if (fila[i].value === arrayLetras[i]) {
                fila[i].setAttribute("class", "esCorrecta");
                letrasAcertadas++;
            } else if (arrayLetras.includes(fila[i].value)) {
                fila[i].setAttribute("class", "estaPresente");
            } else {
                fila[i].setAttribute("class", "noAparece");
            }
        }
        cambiarFila();
        return letrasAcertadas;

    };
    function cambiarFila() {
        //Desactivo los inputs de la fila y activo los de la siguiente si existen
        filaActiva.forEach(letra => {
            letra.setAttribute("readOnly", "true");
        });

        intentos++;
        if (intentos < filas.length) {
            filaActiva = filas[intentos];
            filaActiva.forEach(letra => {
                letra.setAttribute("class", "activa");
                letra.removeAttribute("readOnly");
            });
        }

    };
});






