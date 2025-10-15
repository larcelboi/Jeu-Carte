const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");
const liste_chiffre = []
const liste_carte_paire = []
const dict_carte_emoji = {}
let commencer_prtie = false
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
        for (let i = 0; i < 12; i++) {
            // Création carte
            const carte = document.createElement("div");
            carte.classList.add("carte");
            const sous_carte = document.createElement("div");
            sous_carte.id = `carte-${i}`;
            sous_carte.classList.add("sous_carte");

            sous_carte.textContent = "❓";
            // Ajouter sous carte dans carte
            carte.append(sous_carte);

            boxCarte.appendChild(carte);
        }
    }
    CreationCarte();

})//["🍇","🍈","🍉","🍊","🍋","🍏"]
boxCarte.addEventListener("click", (e) => {
    const carte_choisie = e.target;
    const type_emoji = ["🍇","🍈","🍉","🍊","🍋","🍏"]
    if (carte_choisie.id in dict_carte_emoji) {
        carte_choisie.textContent = dict_carte_emoji[carte_choisie.id];
        Carte();
    }
    else{
        Carte();
    }

    function Carte() {

        if (e.target.classList.contains("sous_carte")) {
            console.log(carte_choisie);
            carte_choisie.style.transition = "backgroundcolor 0.5 ease-in-out,color 0.5 ease-in-out ";
            carte_choisie.style.backgroundColor = "white";
            carte_choisie.style.color = "white";

            setTimeout(() => {
                carte_choisie.style.backgroundColor = "black";
                carte_choisie.style.color = "white";
                ChangerText(type_emoji)
            }, 100 * 8)
        }
    }
    function ChangerText(type_emoji){
        while (true){
            let index_dans_liste = Math.floor(Math.random() * type_emoji.length)
            const repetition_chiffre = liste_chiffre.filter( chiffre => chiffre.id === index_dans_liste).length
            if (repetition_chiffre < 2 ) {
                liste_chiffre.push(carte_choisie)
                carte_choisie.textContent = type_emoji[index_dans_liste];
                dict_carte_emoji[carte_choisie.id] = type_emoji[index_dans_liste]
                CartPaire();
                break;
            }
        }
    }

    function CartPaire(){
        liste_carte_paire.push(carte_choisie);
        const nombre_carte_paire = liste_carte_paire.filter(text => text.textContent ===carte_choisie.textContent).length
        if (liste_carte_paire.length >= 2 ){
            if ( nombre_carte_paire % 2 === 0){
                alert("trouver")
            }
            else{
                for (let i = 0; i < liste_carte_paire.length; i++) {
                    liste_carte_paire[i].textContent = "❓"
                }
                liste_carte_paire.remove();
            }
        }
    }



})

