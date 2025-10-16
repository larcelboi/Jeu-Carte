const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");
const clock = document.querySelector("#clock");
const nbre_Essaie = document.querySelector("#nb_essais");

const liste_carte_paire = []
liste_carte_back = []
const dict_carte_emoji = {}
const liste_carte = []
const liste_carte_front = []
const liste_emoji = []

let commencer_prtie = false
let nombre_carte_valie = 1
let nombre_tentative = 8
nbre_Essaie.textContent = `Nombres Tentatives : ${nombre_tentative}`
const type_emoji = ["🍇","🍈","🍉","🍊","🍋","🍏"]

// try to use inner html with this sh

btnCommencer.addEventListener("click", (e) => {
    // fonction création 12 carte
    if (commencer_prtie) {
        alert("la partie a déjà commencer")
        return;
    }
    commencer_prtie = true
    boxCarte.style.display = "flex";

    function  CreationCarte(){
        // Création des 12 cartes
        for (let i = 0; i < 12; i++) {
            let emoji = ""

            while (true){
                // Choose random emoji from remaining ones
                const random_index = Math.floor(Math.random() * type_emoji.length);
                emoji = type_emoji[random_index];
                liste_emoji.push(emoji)

                // Filter emojis that are still available (less than 2 used)
                const available = liste_emoji.filter(e => e ===emoji).length;

                if (available <= 2) {
                    break
                }
            }

            //Création carte
            const sous_carte_behind = document.createElement("div");
            const sous_carte_front = document.createElement("div");
            const carte = document.createElement("div");

            // Assign it
            sous_carte_behind.textContent = "❓";
            sous_carte_front.textContent = emoji;

            sous_carte_behind.setAttribute("data-face", "recto");
            sous_carte_behind.classList.add("sous_carte");

            sous_carte_behind.classList.add("sous_carte");
            sous_carte_front.classList.add("sous_carte");
            sous_carte_front.classList.add("invisible");
            carte.classList.add("carte");


            // Ajouter sous carte dans carte
            carte.append(sous_carte_behind);
            carte.append(sous_carte_front);
            liste_carte.push(carte);
            //Ajouter tous les cartes dans la boite de carte
            boxCarte.appendChild(carte);



            carte.addEventListener("click", (e) => {
                function TournerCarte(){
                    sous_carte_behind.style.transition = "backgroundcolor 0.5 ease-in-out,color 0.5 ease-in-out ";
                    sous_carte_behind.style.backgroundColor = "white";
                    sous_carte_behind.style.color = "white";


                    setTimeout(() => {
                        sous_carte_behind.style.backgroundColor = "black";
                        sous_carte_behind.style.color = "white";
                        sous_carte_behind.classList.toggle("invisible");
                        sous_carte_front.classList.toggle("invisible");
                        trouverSiCartePaire(sous_carte_behind,sous_carte_front);

                    }, 100 * 5)
                }
                TournerCarte();
                function RetournerCarte(sous_carte_front,sous_carte_behind){
                    sous_carte_behind.style.transition = "backgroundcolor 0.5 ease-in-out,color 0.5 ease-in-out ";
                    sous_carte_behind.style.backgroundColor = "white";
                    sous_carte_behind.style.color = "white";

                        sous_carte_behind.style.backgroundColor = "black";
                        sous_carte_behind.style.color = "white";
                        sous_carte_behind.classList.toggle("invisible");
                        sous_carte_front.classList.toggle("invisible");

                }


                function ChangerTentative(){
                    nombre_tentative--
                    nbre_Essaie.textContent = `Nombres Tentative : ${nombre_tentative}`
                    if (nombre_tentative === 0) {
                        alert("You failed the game\nClick ok to see the locations of all the cards");
                        console.log(dict_carte_emoji)
                        liste_carte.forEach(function(card){
                            console.log(card.id);
                            card.textContent = dict_carte_emoji[card.id];
                        })


                    }
                }
                function trouverSiCartePaire(sous_carte_behind,sous_carte_front){
                    liste_carte_front.push(sous_carte_front)
                    liste_carte_back.push(sous_carte_behind)

                    const nombre_carte_paire = liste_carte_front.filter(text => text.textContent ===liste_carte_front[0].textContent).length
                    // Check si les deux cartes ont le même texte
                    if (liste_carte_front.length === 2) {
                        if (nombre_carte_paire === 2) {
                            liste_carte_back.forEach(function(card){liste_carte_paire.push(card)})
                            if (liste_carte_back.length === 2 * nombre_carte_valie) {
                                nombre_carte_valie++

                                liste_carte_back.forEach(function(card){
                                    liste_carte_back.shift()
                                })
                                liste_carte_front.forEach(function(card){
                                    liste_carte_front.shift()

                                })
                            }
                        }
                        else{
                            liste_carte_back.forEach(function(card,index){
                                RetournerCarte(liste_carte_front[index],sous_carte_front[index]);

                            })
                            ChangerTentative();
                        }
                    }


                }

            })
        }
    }
    CreationCarte();





})

