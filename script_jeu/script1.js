const btnCommencer = document.querySelector("#btnCom");
const boxCarte = document.querySelector("#boxC");

btnCommencer.addEventListener("click", (e) => {
    // Création carte
    const carte = document.createElement("div");
    const sous_carte = document.createElement("div");

    //  edit look carte
    carte.style.backgroundColor = "black";

    sous_carte.style.border = "5px solid white";
    sous_carte.style.backgroundColor = "black";

    // Ajouter sous carte dans carte
    carte.append(sous_carte);

    boxCarte.append(carte)
})