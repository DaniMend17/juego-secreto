const maxVal = 10;
let nSecreto;
let intentos;
let maxIntentos = 3;
let numerosSorteados = [];
let acertar = true;
let terminarJuego = false;

asigTexto('h1', 'Juego del número secreto');
inicio();
console.log(numerosSorteados);

function verificarIntento(a, b) {
    let nUsuario = parseInt(document.getElementById('nUsuario').value);
    if (nUsuario === nSecreto) {
        asigTexto('p', `Le atinaste!!!. en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}`);
        document.getElementById('intentar').disabled = true;
        document.querySelector('#reiniciar').removeAttribute('disabled');
        acertar = true;
    } else {
        if (intentos === maxIntentos) {
            asigTexto('p', `Llegaste al num máximo de intentos: ${maxIntentos} El num. Secreto era ${nSecreto}`);
            limpiaCaja();
            document.getElementById('intentar').disabled = true;
            document.querySelector('#reiniciar').removeAttribute('disabled');
            acertar = false;
            return;
        }
        if (nUsuario > nSecreto) {
            asigTexto('p', 'El número es MENOR.');
        } else {
            asigTexto('p', 'El número es MAYOR.');
        }
        intentos++;
    }
    limpiaCaja();
}

function asigTexto(elemento, texto) {
    document.querySelector(elemento).innerText = texto;
    return;
}

function generaRand(valMax) {
    return Math.floor(Math.random() * valMax) + 1;
}

function limpiaCaja() {
    document.querySelector("#nUsuario").value = '';
}

function inicio() {
    asigTexto('p', `Escribe un número del 1 al ${maxVal}`);
    intentos = 1;
    nSecreto = verifica(generaRand(maxVal));
    numerosSorteados.push(nSecreto);
}

function reiniciar() {
    inicio();
    console.log(numerosSorteados);
    limpiaCaja();
    document.querySelector('#reiniciar').setAttribute('disabled', true);
    if (terminarJuego) {
        document.querySelector('#intentar').setAttribute('disabled', true);
    }else{
        document.getElementById('intentar').disabled = false;
    }
}

function verifica(n) {
    if (numerosSorteados.length === maxVal) {
        asigTexto('p', `Ya has adivinado todos los numeros posibles en el rango de 1 a ${maxVal} \nRefresca el navegador para seguir jugando`);
        terminarJuego = true;
    } else {
        if (acertar === true) {
            while (numerosSorteados.includes(n)) {
                n = generaRand(maxVal);
            }
            return n;
        }
    }
    numerosSorteados = [];
    return n;
}


