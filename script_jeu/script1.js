const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");
const btnRecommencer = document.querySelector("#btnRe");
const clock = document.querySelector("#clock");
const nbre_Essaie = document.querySelector("#nb_essais");

let minutes = 5
let seconds = 0
clock.textContent = `${minutes}:${0}${0}`

const liste_carte = [];
const liste_carte_front = [];
const liste_carte_back = [];
const liste_emoji = [];
const liste_carte_tourner  = []
const liste_carte_tourner_back = []

const type_emoji = ["🍇","🍈","🍉","🍊","🍋","🍏"];

let commencer_prtie = false;
let nombre_carte_valide = 1;
let nombre_tentative = 8;
let canClick = true;

nbre_Essaie.textContent = `Nombres Tentatives : ${nombre_tentative}`;

btnCommencer.addEventListener("click", () => {
    if (commencer_prtie) {
        alert("La partie a déjà commencé");
        return;
    }
    commencer_prtie = true;
    boxCarte.style.display = "flex";

    let timerInterval;

    function startTimer() {
        clock.textContent = formatTime(minutes, seconds);

        timerInterval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval); // stop the timer
                clock.textContent = "0:00";
                alert("Time's up!");
                canClick = false;
                setTimeout(() => {
                    liste_carte.forEach(card => {
                        const front = card.children[1];
                        const back = card.children[0];
                        back.classList.add("invisible");
                        front.classList.remove("invisible");
                    });
                }, 800); // matches your 700 ms flip delay
                return;
            }

            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }

            clock.textContent = formatTime(minutes, seconds);
        }, 1000);
    }

    function formatTime(min, sec) {
        const paddedSec = sec < 10 ? `0${sec}` : sec;
        return `${min}:${paddedSec}`;
    }



    function CreationCarte() {
        for (let i = 0; i < 12; i++) {
            let emoji = "";

            while (true) {
                const random_index = Math.floor(Math.random() * type_emoji.length);
                emoji = type_emoji[random_index];
                const count = liste_emoji.filter(e => e === emoji).length;
                if (count < 2) {
                    liste_emoji.push(emoji);
                    break;
                }
            }

            const sous_carte_behind = document.createElement("div");
            const sous_carte_front = document.createElement("div");
            const carte = document.createElement("div");

            sous_carte_behind.textContent = "❓";
            sous_carte_front.textContent = emoji;

            sous_carte_behind.classList.add("sous_carte");
            sous_carte_front.classList.add("sous_carte", "invisible");
            carte.classList.add("carte");

            carte.append(sous_carte_behind, sous_carte_front);
            liste_carte.push(carte);
            boxCarte.appendChild(carte);

            carte.addEventListener("click", () => {
                if (!canClick) return; // block clicks during animations
                if (!sous_carte_front.classList.contains("invisible")) return;

                flipCard(sous_carte_behind, sous_carte_front);

                liste_carte_front.push(sous_carte_front);
                liste_carte_back.push(sous_carte_behind);

                // When 2 cards are flipped
                if (liste_carte_front.length === 2) {
                    canClick = false;
                    setTimeout(() => {
                        checkPair();
                    }, 700);
                }
            });
        }
    }

    function flipCard(back, front) {
        // smooth flash white transition before reveal
        back.style.transition = "background-color 0.4s ease, color 0.4s ease";
        back.style.backgroundColor = "white";
        back.style.color = "white";

        setTimeout(() => {
            back.style.backgroundColor = "black";
            back.style.color = "white";
            back.classList.add("invisible");
            front.classList.remove("invisible");
        }, 200);
    }

    function unflipCard(front, back) {
        back.style.transition = "background-color 0.4s ease, color 0.4s ease";
        front.style.transition = "background-color 0.4s ease, color 0.4s ease";

        front.style.backgroundColor = "white";
        front.style.color = "white";

        setTimeout(() => {
            front.style.backgroundColor = "black";
            front.style.color = "white";
            front.classList.add("invisible");
            back.classList.remove("invisible");
        }, 200);
    }

    function checkPair() {
        const [card1, card2] = liste_carte_front;
        const [back1, back2] = liste_carte_back;

        if (card1.textContent === card2.textContent) {
            // ✅ it's a match
            liste_carte_tourner.push(card1, card2);
            liste_carte_tourner_back.push(back1, back2);
            nombre_carte_valide++;

            liste_carte_front.length = 0;
            liste_carte_back.length = 0;

            canClick = true;
        } else {
            // ❌ not a match
            // add both to the “temporary flipped” lists
            liste_carte_tourner.push(card1, card2);
            liste_carte_tourner_back.push(back1, back2);

            setTimeout(() => {
                // flip *all* temporarily turned cards back
                for (let i = 0; i < liste_carte_tourner.length; i++) {
                    unflipCard(liste_carte_tourner[i], liste_carte_tourner_back[i]);
                }

                // empty both lists completely
                liste_carte_tourner.length = 0;
                liste_carte_tourner_back.length = 0;
                liste_carte_front.length = 0;
                liste_carte_back.length = 0;

                ChangerTentative();
                canClick = true;
            }, 700);
        }
    }



    function ChangerTentative() {
        nombre_tentative--;
        nbre_Essaie.textContent = `Nombres Tentatives : ${nombre_tentative}`;
        if (nombre_tentative === 0) {
            alert("You failed the game!\nClick OK to see the card locations.");
            setTimeout(() => {
                liste_carte.forEach(card => {
                    const front = card.children[1];
                    const back = card.children[0];
                    back.classList.add("invisible");
                    front.classList.remove("invisible");
                });
            }, 800); // matches your 700 ms flip delay
        }
    }

    CreationCarte();
    startTimer();

    btnRecommencer.addEventListener("click", (e) => {
        alert("Creating new cards")
        boxCarte.replaceChildren();
        canClick = true;
        liste_emoji.length = 0;
        liste_carte.length = 0;
        liste_carte_front.length = 0;
        liste_carte_back.length = 0;
        nombre_carte_valide = 1
        nombre_tentative = 8
        nbre_Essaie.textContent = `Nombres Tentatives : ${nombre_tentative}`
        clearInterval(timerInterval);
        minutes = 5;
        seconds = 0;
        CreationCarte();
        startTimer();
    })
});
