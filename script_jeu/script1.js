const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");

btnCommencer.addEventListener("click", (e) => {
    // Création carte
    const carte = document.createElement("div");
    carte.classList.add("carte");
    const sous_carte = document.createElement("div");
    sous_carte.classList.add("sous_carte");

    sous_carte.textContent = "?";

    // Ajouter sous carte dans carte
    carte.append(sous_carte);

    boxCarte.append(carte)
})