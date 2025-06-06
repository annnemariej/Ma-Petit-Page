document.getElementById("minCanvas").style.visibility = "hidden"
document.getElementById("vinnerSide").style.visibility = "hidden"
document.getElementById("taperSide").style.visibility = "hidden"
document.getElementById("cover").style.visibility = "visible"
document.getElementById("klokke").style.visibility = "hidden"

let spillAktivt = false
let ganger = 0 //slik at startknappen kan bare trykkes en gnag
function visCanvas() {
    if (ganger < 1) {
        document.getElementById("minCanvas").style.visibility = "visible"
        document.getElementById("cover").style.visibility = "hidden"
        document.getElementById("klokke").style.visibility = "visible"
        bakgrunnsMusikk.loop = true
        bakgrunnsMusikk.volume = 0.05
        bakgrunnsMusikk.play()
        ganger += 1
        spillAktivt = true

        klokkeInterval = setInterval(tikkKlokke, 1000)
    }
}


// tid, max 40 sek på å klare spillet
const klokkeElement = document.getElementById("klokke")
let klokke = 40

function tikkKlokke() {

    klokke -= 1
    klokkeElement.innerHTML = "Tid igjen: " + klokke + " sek"

    if (klokke > 0) {
        console.log("Klokka tikket. Nå er det igjen:", klokke)
    }
    else if (klokke <= 0) {
        clearInterval(klokkeInterval)  // Stopp klokka når den når 0
        spilltapt()
    }

}

//vunnet og tapt sidene
function visVunnet() {
    document.getElementById("minCanvas").style.visibility = "hidden"
    document.getElementById("vinnerSide").style.visibility = "visible"
    document.getElementById("klokke").style.visibility = "hidden"

}

function visTapt() {
    document.getElementById("minCanvas").style.visibility = "hidden"
    document.getElementById("taperSide").style.visibility = "visible"
    document.getElementById("klokke").style.visibility = "hidden"
}

// LYD
const bakgrunnsMusikk = new Audio('lyd/bakgrunnsmusikk.mp3')
const jumpSound = new Audio('lyd/retro-jump.mp3')
const runSound = new Audio("lyd/run.mp3")

//canvas
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 650

// Lager spilleren(mario) 
const spiller = {
    x: 50,
    y: 640,
    width: 30,
    height: 30,
    speed: 5,
    dx: 0,
    dy: 0,
    gravity: 0.5,
    jumpPower: -7.94,
    onGround: false,
    color: "blue",
}

const spillerBilde = new Image()
spillerBilde.src = "bilder/mario.png"

function tegneSpiller() {
    ctx.drawImage(spillerBilde, spiller.x, spiller.y, spiller.width, spiller.height)
}

// LAGER KONGEY DONG  og ANIMASJON
const konkeyDong = {
    x: 25,
    y: 20,
    width: 50,
    height: 50,
}

const konkeyDongBilder = [
    "bilder/konkey.png",
    "bilder/konkey2.png",
]

let konkeyBildeIndex = 0
const konkeyDongBilde = new Image()
konkeyDongBilde.src = konkeyDongBilder[konkeyBildeIndex]

// Funksjon for å bytte Konkey Dong-bilde
function byttKonkeyBilde() {
    konkeyBildeIndex = (konkeyBildeIndex + 1) % konkeyDongBilder.length
    konkeyDongBilde.src = konkeyDongBilder[konkeyBildeIndex]
}

setInterval(byttKonkeyBilde, 550)

function tegnKonkeyDong() {
    ctx.drawImage(konkeyDongBilde, konkeyDong.x, konkeyDong.y, konkeyDong.width, konkeyDong.height)
}

// LAGER PRINSESSE
const prinsesse = {
    x: 80,
    y: 30,
    width: 50,
    height: 40
}

const prinsesseBilder = [
    "bilder/prinsesse.png",
    "bilder/prinsesse2.jpg",
]

let prinsbildeIndex = 0
const prinsesseBilde = new Image()
prinsesseBilde.src = prinsesseBilder[prinsbildeIndex]

function byttBilde() {
    prinsbildeIndex = (prinsbildeIndex + 1) % prinsesseBilder.length
    prinsesseBilde.src = prinsesseBilder[prinsbildeIndex]
}

setInterval(byttBilde, 350)

function tegnPrinsesse() {
    ctx.drawImage(prinsesseBilde, prinsesse.x, prinsesse.y, prinsesse.width, prinsesse.height)
}
//LIV

const livPosisjoner = [ //liv = hjerter
    { x: canvas.width - 100, y: canvas.height - 40 },
    { x: canvas.width - 60, y: canvas.height - 40 },
    { x: canvas.width - 20, y: canvas.height - 40 },
]
let liv = 3

function tegnHjerte(x, y, farge) {
    ctx.fillStyle = farge
    ctx.beginPath()
    ctx.moveTo(x, y + 10);
    ctx.bezierCurveTo(x, y - 10, x - 15, y - 10, x - 15, y)
    ctx.bezierCurveTo(x - 15, y + 15, x, y + 25, x, y + 30)
    ctx.bezierCurveTo(x, y + 25, x + 15, y + 15, x + 15, y)
    ctx.bezierCurveTo(x + 15, y - 10, x, y - 10, x, y + 10)
    ctx.fill()
}

function tegnLiv() {
    for (let i = 0; i < 3; i++) {
        if (i < liv) {
            tegnHjerte(livPosisjoner[i].x, livPosisjoner[i].y, "red") //gjenværende liv
        } else {
            tegnHjerte(livPosisjoner[i].x, livPosisjoner[i].y, "gray") // tapte liv
        }
    }
}

//PLATFORMENE OG PIGGENNE

ctx.lineWidth = 10

const plattformer = [
    { x1: 400, y1: 544, x2: 800, y2: 544, color: "purple" }, //STØRRE PLATFORMER
    { x1: 0, y1: 438, x2: 400, y2: 438, color: "purple" },
    { x1: 400, y1: 332, x2: 800, y2: 332, color: "purple" },
    { x1: 0, y1: 226, x2: 400, y2: 226, color: "purple" },
    { x1: 400, y1: 120, x2: 800, y2: 120, color: "purple" },
    { x1: 0, y1: 75, x2: 270, y2: 75, color: "green" }, // Den siste
    { x1: 310, y1: 597, x2: 370, y2: 597, color: "aqua" }, //MINDRE PLATFORMER
    { x1: 430, y1: 499, x2: 490, y2: 499, color: "aqua" },
    { x1: 310, y1: 375, x2: 370, y2: 375, color: "aqua" },
    { x1: 430, y1: 269, x2: 490, y2: 269, color: "aqua" },
    { x1: 310, y1: 163, x2: 370, y2: 163, color: "aqua" },
    { x1: 300, y1: 55, x2: 360, y2: 55, color: "aqua" },
]

function tegnLinje(platform) {
    ctx.strokeStyle = platform.color
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(platform.x1, platform.y1)
    ctx.lineTo(platform.x2, platform.y2)
    ctx.stroke()
}

function kollisjonMedPlattform() {
    spiller.onGround = false

    if (spiller.y + spiller.height >= canvas.height) {
        spiller.onGround = true
        spiller.dy = 0
        spiller.y = canvas.height - spiller.height
    }

    plattformer.forEach(function (platform) {
        // Lander på en platform:
        if (
            spiller.y + spiller.height >= platform.y1 - 5 &&
            spiller.y + spiller.height <= platform.y1 + 5 &&
            spiller.x + spiller.width > platform.x1 &&
            spiller.x < platform.x2
        ) {
            spiller.onGround = true
            spiller.dy = 0
            spiller.y = platform.y1 - spiller.height - 5
        }

        // Kollisjon "med hode" (hopper nedenfra) :
        if (
            spiller.y >= platform.y1 - 5 &&
            spiller.y <= platform.y1 + 5 &&
            spiller.x + spiller.width > platform.x1 &&
            spiller.x < platform.x2
        ) {
            spiller.dy *= -1
            spiller.y += 5
        }
        if (
            spiller.y <= 0
        ) {
            spiller.dy *= -1
            spiller.y += 5
        }
    })
}

function sjekkKollisjon(spiller, prinsesse) {
    return (
        spiller.x < prinsesse.x + prinsesse.width &&
        spiller.x + spiller.width > prinsesse.x &&
        spiller.y < prinsesse.y + prinsesse.height &&
        spiller.y + spiller.height > prinsesse.y
    )
}

const pigger = [
    { x: 500, y: 514, størrelse: 10 },
    { x: 580, y: 514, størrelse: 10 },
    { x: 50, y: 408, størrelse: 10 },
    { x: 150, y: 408, størrelse: 10 },
    { x: 550, y: 302, størrelse: 10 },
    { x: 650, y: 302, størrelse: 10 },
    { x: 100, y: 196, størrelse: 10 },
    { x: 200, y: 196, størrelse: 10 },
    { x: 520, y: 90, størrelse: 10 },
    { x: 620, y: 90, størrelse: 10 },
]

function tegnTrekant(x, y, størrelse) {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - størrelse, y + størrelse * 2)
    ctx.lineTo(x + størrelse, y + størrelse * 2)
    ctx.closePath()
    ctx.fill()
}

function tegnAllePigger() {
    pigger.forEach(function (pigg) {
        tegnTrekant(pigg.x, pigg.y, pigg.størrelse)
    })
}

function sjekkKollisjonMedPigger() {
    pigger.forEach(pigg => {
        if (
            spiller.x < pigg.x + pigg.størrelse &&
            spiller.x + spiller.width > pigg.x &&
            spiller.y < pigg.y + pigg.størrelse * 2 &&
            spiller.y + spiller.height > pigg.y
        ) {
            liv-- // Mister ett liv
            console.log("Mario traff en pigg. Liv igjen:", liv)
            if (liv > 0) {
                resetMario()
            } else {
                spilltapt()
            }
        }
    })
}

function resetMario() {
    spiller.x = 50
    spiller.y = 640
    spiller.dy = 0
}

function holderKeys(event) {

    if (!spillAktivt) return

    if (event.key === "ArrowRight" || event.key === "d") {
        spiller.dx = spiller.speed
        runSound.play()
        spillerBilde.src = "bilder/mariohoyre.jpg"
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        spiller.dx = -spiller.speed
        runSound.play()
        spillerBilde.src = "bilder/mariovenstre.png"
    } else if (event.key === "ArrowUp" || event.key === "w") {
        if (spiller.onGround) {
            spiller.dy = spiller.jumpPower
            spiller.onGround = false
            jumpSound.play()
            spillerBilde.src = "bilder/mario.png"

        }
    }
}

function sluppetKey(event) {
    if (!spillAktivt) return

    if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "d" || event.key === "a") {
        spiller.dx = 0
        runSound.pause()
        runSound.currentTime = 0
        spillerBilde.src = "bilder/mario.png"
    }
}

function update() {
    spiller.x += spiller.dx
    spiller.y += spiller.dy

    if (spiller.y + spiller.height < canvas.height) {
        spiller.dy += spiller.gravity
    } else {
        spiller.dy = 0
        spiller.y = canvas.height - spiller.height
        spiller.onGround = true
    }

    kollisjonMedPlattform()
    sjekkKollisjonMedPigger()

    if (spiller.x < 0) spiller.x = 0
    if (spiller.x + spiller.width > canvas.width) spiller.x = canvas.width - spiller.width

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plattformer.forEach(tegnLinje)
    tegnAllePigger()
    tegneSpiller()
    tegnPrinsesse()
    tegnKonkeyDong()
    tegnLiv()

    if (sjekkKollisjon(spiller, prinsesse)) {
        spillVunnet()
        return
    }

    requestAnimationFrame(update)
}

function spillVunnet() {
    spillAktivt = false
    visVunnet()
    clearInterval(klokkeInterval)
    bakgrunnsMusikk.volume = 0.0

}
function spilltapt() {
    spillAktivt = false
    visTapt()
    bakgrunnsMusikk.volume = 0

}

function spilligjen() {
    location.reload()
}

window.addEventListener("keydown", holderKeys)
window.addEventListener("keyup", sluppetKey)
update()
