const miMudulo =(() => {
  "use stric";
  let deck = [],
    puntosJugadores = [];
  //puntosJugador = 0,
  const tipos = ["C", "D", "H", "S"],
    //puntosComputadora=0;
    especiales = ["A", "J", "Q", "K"];
  //Referencias del HTML
  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener");

  const divCartas = document.querySelectorAll(".divCartas");
  puntosHTML = document.querySelectorAll("small");

  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let j = 0; j < tipos.length; j++) {
        deck.push(i + tipos[j]);
      }
    }
    for (const tipo of tipos) {
      for (const especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  };

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHTML.forEach(element => element.innerText = '');
    divCartas.forEach(element=> element.innerText = '');
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const pedirCarta = () => {
      let aleatorio = Math.floor(Math.random() * (deck.length - 1));
      deck.splice(aleatorio, 1);
      return deck[aleatorio];
    };
    
  const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
    };
    
   const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };
    const crearCarta = (carta, lugar) => {
        const nuevoElementoDiv = document.createElement("img");
        nuevoElementoDiv.className = "carta";
        nuevoElementoDiv.src = `assets/cartas/${carta}.png`;
        divCartas[lugar].append(nuevoElementoDiv);
    };
    
    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            puntosComputadora === puntosMinimos
            ? alert("Nadie Gana")
            : puntosMinimos > 21
            ? alert("Computadora Gana")
            : puntosComputadora > 21
            ? alert("jugador gana")
            : alert("Computadora Gana");
        }, 10);
    };
    //TURNO COMPUTADORA
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
        determinarGanador();
    };
    // EVENTOS
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        if (puntosJugador > 21) {
            console.warn("Lo siento mucho, perdiste");
            turnoComputadora(puntosJugador);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        } else if (puntosJugador === 21) {
            console.warn("genial ganaste");
            turnoComputadora(puntosJugador);
        }
    });
    
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    
    btnNuevo.addEventListener("click", () => { 
        inicializarJuego();
    });
    return {
        nuevoJuego: inicializarJuego
    }
})();
