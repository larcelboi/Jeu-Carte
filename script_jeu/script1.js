const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");
const liste_chiffre = []
const liste_carte_paire = []
const dict_carte_emoji = {}
let commencer_prtie = false
let nombre_carte_valie = 1

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
            // Création carte
            const carte = document.createElement("div");
            // Appliquer css carte
            carte.classList.add("carte");
            const sous_carte = document.createElement("div");
            //Donner un ID au carte
            sous_carte.id = `carte-${i}`;
            // Appliquer css sous_carte
            sous_carte.classList.add("sous_carte");
            // Changer le text à ?
            sous_carte.textContent = "❓";
            // Ajouter sous carte dans carte
            carte.append(sous_carte);
            //Ajouter tous les cartes dans la boite de carte
            boxCarte.appendChild(carte);
        }
    }
    CreationCarte();

})//["🍇","🍈","🍉","🍊","🍋","🍏"]
boxCarte.addEventListener("click", (e) => {
    const carte_choisie = e.target;
    const type_emoji = ["🍇","🍈","🍉","🍊","🍋","🍏"]
    if (type_emoji.includes(carte_choisie.textContent)) {
        return
    }
    // Redonner l'emoji à la carte qui a été retourner
    if (carte_choisie.id in dict_carte_emoji) {
        // Prend l'emoji de l'id de la carte
        const emoji_id = dict_carte_emoji[carte_choisie.id];
        reTransitionEmojiCarte(emoji_id);
    }
    else{
        transitionEmojiCarte();
    }

    function reTransitionEmojiCarte(emoji_id) {
        if (e.target.classList.contains("sous_carte")) {
            // Change style de la carte
            carte_choisie.style.transition = "backgroundcolor 0.5 ease-in-out,color 0.5 ease-in-out ";
            carte_choisie.style.backgroundColor = "white";
            carte_choisie.style.color = "white";

            // Attendre avant de changer le style de la carte
            setTimeout(() => {
                carte_choisie.style.backgroundColor = "black";
                carte_choisie.style.color = "white";
                // Remettre l'emoji de la carte
                carte_choisie.textContent = emoji_id
                setTimeout(trouverSiCartePaire,1000 * 2)
            }, 100 * 8)
        }
    }
    function transitionEmojiCarte() {
        if (e.target.classList.contains("sous_carte")) {
            carte_choisie.style.transition = "backgroundcolor 0.5 ease-in-out,color 0.5 ease-in-out ";
            carte_choisie.style.backgroundColor = "white";
            carte_choisie.style.color = "white";

            setTimeout(() => {
                carte_choisie.style.backgroundColor = "black";
                carte_choisie.style.color = "white";
                carte_choisie.textContent = e
                changerEmoji(type_emoji)
            }, 100 * 8)
        }
    }

    function changerEmoji(type_emoji) {
        // Count how many times each emoji was already used
        const emoji_counts = {};

        // Count from dict_carte_emoji since it holds all assigned emojis
        for (const key in dict_carte_emoji) {
            const emoji = dict_carte_emoji[key];
            emoji_counts[emoji] = (emoji_counts[emoji] || 0) + 1;
        }

        // Filter emojis that are still available (less than 2 used)
        const available = type_emoji.filter(e => (emoji_counts[e] || 0) < 2);

        if (available.length === 0) {
            console.warn("Aucun emoji disponible — toutes les paires ont déjà été utilisées");
            return;
        }

        // Choose random emoji from remaining ones
        const random_index = Math.floor(Math.random() * available.length);
        const emoji = available[random_index];

        // Assign it
        carte_choisie.textContent = emoji;
        dict_carte_emoji[carte_choisie.id] = emoji;
        console.log(dict_carte_emoji);

        setTimeout(trouverSiCartePaire, 1000 * 2);
    }


    function trouverSiCartePaire(){
        liste_carte_paire.push(carte_choisie);
        const nombre_carte_paire = liste_carte_paire.filter(text => text.textContent ===carte_choisie.textContent).length
        if (liste_carte_paire.length >= 2 * nombre_carte_valie ) {
            if ( nombre_carte_paire % 2 === 0){
                nombre_carte_valie ++
            }
            else{
                for (let i = 0; i < liste_carte_paire.length;){
                    liste_carte_paire[i].textContent = "❓"
                    liste_carte_paire.shift()
                    nombre_carte_valie = 1
                }
            }
        }
    }



})

