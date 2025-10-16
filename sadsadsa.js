const para = document.querySelector("#la");
const body = document.querySelector("body")
const liste_chiffre = []

for (let i = 0; i < 3; ++i) {
    const sad = document.createElement("p")
    sad.textContent = "🍉"
    liste_chiffre.push(sad)
    body.appendChild(sad)
}
para.textContent = "🍉"
const emoji = "🍉"

liste_chiffre.push(para)

const repetition_text = liste_chiffre.filter(text => text.textContent === emoji).length


console.log(repetition_text)