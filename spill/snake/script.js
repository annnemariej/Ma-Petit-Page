const brett = document.querySelector(".spillbrett")
const containerspillbrett = document.querySelector(".containerspillbrett")
const logo = document.getElementById("logo")

const startknapp = document.querySelector(".container button")
const omstartKnapp = document.querySelector("#omstartknapp")
const HjemSkjermKnapp = document.querySelector("#hjemskjermknapp")

const instruksjon1 = document.getElementById("instruksjon1")
const cover = document.getElementById("cover")
const duTaptePopUp = document.getElementById("duTapte")
const scorePopUp = document.getElementById("score_popup")

let poengSum = 0
const poengTabell = document.getElementById("score")
let poengPosisjon = {
    x: Math.floor(Math.random() * 15),
    y: Math.floor(Math.random() * 15)
}
let highscore = localStorage.getItem("highscore") || 0
highscore = parseInt(highscore)
const highscoreDisplay = document.getElementById("highscore")
highscoreDisplay.innerHTML = ("00" + highscore).slice(-3)

let retning = ""
let lastRetning = ""
let spillInterval

const bakgrunnsmusikk = new Audio("mp3/04 Level 3.flac")
const poengSoundEffect = new Audio("mp3/eating-sound-effect-36186.mp3")
const tapSoundEffect = new Audio("mp3/08 Game Over.flac")
const mainScreenMusic = new Audio("mp3/01 Title.flac")

let slangeArray = [{ x: 7, y: 7 }]

function tegnSlange() {
    document.querySelectorAll(".slange").forEach(e => e.remove())

    slangeArray.forEach((segment) => {
        const slangeHode = document.createElement("div")
        slangeHode.style.backgroundColor = "pink"
        slangeHode.classList.add("slange")

        slangeHode.style.position = "absolute"
        slangeHode.style.width = "33.3px"
        slangeHode.style.height = "33.3px";

        slangeHode.style.left = (segment.x * 33.3) + "px"
        slangeHode.style.top = (segment.y * 33.3) + "px"
        containerspillbrett.appendChild(slangeHode)
    })
}



function poeng() {
    document.querySelectorAll(".poeng").forEach(e => e.remove())

    const poeng = document.createElement("img")

    poeng.src = "bilder/pixel_appelsin.png"
    poeng.style.position = "absolute"
    poeng.style.width = "33.3px"
    poeng.style.height = "33.3px"
    poeng.style.left = (poengPosisjon.x * 33.3) + "px"
    poeng.style.top = (poengPosisjon.y * 33.3) + "px"
    poeng.style.pointerEvents = "none"
    poeng.classList.add("poeng")
    containerspillbrett.appendChild(poeng)
}

function omstart() {
    duTaptePopUp.style.display = "none"
    cover.style.display = "none"

    bakgrunnsmusikk.volume = 0.5
    bakgrunnsmusikk.loop = true
    bakgrunnsmusikk.play()

    if (poengSum > highscore) {
        highscore = poengSum
        localStorage.setItem("highscore", highscore)
        highscoreDisplay.innerHTML = ("00" + highscore).slice(-3)
    }

    poengSum = 0
    poengTabell.innerHTML = ("00" + poengSum).slice(-3)

    slangeArray = [{ x: 7, y: 7 }]
    retning = ""

    poengPosisjon = {
        x: Math.floor(Math.random() * 15),
        y: Math.floor(Math.random() * 15)
    }

    tegnSlange()
    poeng()

    clearInterval(spillInterval)
    spillInterval = setInterval(flyttSlange, 200)
}

function Hjemskjerm() {

    if (poengSum > highscore) {
        highscore = poengSum;
        localStorage.setItem("highscore", highscore);
    }

    location.reload()
}

function flyttSlange() {
    let hode = { ...slangeArray[0] }

    if (retning === "up" && lastRetning !== "down") {
        hode.y -= 1;
    } else if (retning === "down" && lastRetning !== "up") {
        hode.y += 1;
    } else if (retning === "left" && lastRetning !== "right") {
        hode.x -= 1;
    } else if (retning === "right" && lastRetning !== "left") {
        hode.x += 1;
    }
    
    for (let i = 1; i < slangeArray.length; i++) {
        if (hode.x === slangeArray[i].x && hode.y === slangeArray[i].y) {
            duTaptePopUp.style.display = "flex"
            cover.style.display = "flex"
            bakgrunnsmusikk.pause()
            tapSoundEffect.play()
            scorePopUp.innerHTML = "Score: " + poengSum

            clearInterval(spillInterval)
            return
        }
    }

    if (hode.x === poengPosisjon.x && hode.y === poengPosisjon.y) {
        poengSum += 1
        
        console.log(poengSum)
        poengSoundEffect.play()

        poengPosisjon = { 
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        }

        poeng()

        poengTabell.innerHTML = ("00" + poengSum).slice(-3)
    }else{
        slangeArray.pop()
    }

    
    
    if (hode.x < 0 || hode.x >= 15 || hode.y < 0 || hode.y >= 15) {
        duTaptePopUp.style.display = "flex"
        cover.style.display = "flex"

        bakgrunnsmusikk.pause()

        tapSoundEffect.play()

        scorePopUp.innerHTML = "Score:" + poengSum

        clearInterval(spillInterval)
        return
    }

    slangeArray.unshift(hode)

    tegnSlange()

    sisteRetning = retning
}
document.addEventListener("keydown", function (event) {
    if (duTaptePopUp.style.display === "flex") return

    const taster = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }
    
    if (taster[event.key] && (retning !== "up" || taster[event.key] !== "down") &&
        (retning !== "down" || taster[event.key] !== "up") &&
        (retning !== "left" || taster[event.key] !== "right") &&
        (retning !== "right" || taster[event.key] !== "left")) {
        retning = taster[event.key];
        instruksjon1.style.display = "none";
        cover.style.display = "none";
    }
    //console.log(retning)

})

function start() {
    mainScreenMusic.pause()
    logo.style.display = "none"

    if (brett.children.length === 225) {
        return
    }

    for (x = 0; x < 225; x++) {
        const div = document.createElement("div")
        brett.appendChild(div)
    }
    startknapp.style.display = "none"
    instruksjon1.style.display = "flex"
    cover.style.display = "flex"
    tegnSlange()
    poeng()

    clearInterval(spillInterval)
    spillInterval = setInterval(flyttSlange, 200)

    bakgrunnsmusikk.volume = 0.5
    bakgrunnsmusikk.loop = true
    bakgrunnsmusikk.play()

}
startknapp.addEventListener("click", start)
omstartKnapp.addEventListener("click", omstart)
HjemSkjermKnapp.addEventListener("click", Hjemskjerm)
mainScreenMusic.loop = true
mainScreenMusic.play()