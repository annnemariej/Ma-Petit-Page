// NAV BAR
const burger = document.getElementById("burger-btn")
const dropdown = document.getElementById("dropdown-content")
let menuopen = false
let sections = document.querySelectorAll("section")
const main = document.querySelector("main")
const body = document.querySelector("body")
const xMark = document.querySelector(".fa-xmark")
const toggleSirkel = document.querySelector(".toggleSirkel")
const codeInput = document.getElementById("access-code")

let curX = 0
let curY = 0
let tgX = 0
let tgY = 0

//animasjon ved meny knapp


//animasjon ved scroll//
window.onscroll = () =>{
  sections.forEach(sec =>{
    let top = window.scrollY
    let offset = sec.offsetTop - 150
    let height = sec.offsetHeight

    if(top >= offset && top < offset + height){
      sec.classList.remove("showExitAnimation")
      sec.classList.add("showAnimation")
    }else{
      sec.classList.remove("showAnimation")
      sec.classList.add("showExitAnimation")
    }
  })
}

//menyknapp
burger.addEventListener("click", () => {
  menuopen = !menuopen

  if (menuopen) {
    dropdown.classList.add("show")
    burger.classList.add("show")
    xMark.classList.add("show")

    dropdown.style.animation = "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    body.style.overflow = "hidden"
  } else {
    dropdown.style.animation = "slide-out-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    body.style.overflow = "auto"

    // Wait for the animation to finish before removing the 'show' class
    setTimeout(() => {
      dropdown.classList.remove("show")
      burger.classList.remove("show")
      xMark.classList.remove("show")
    }, 500)
  }
})



// Darkmode
let light = localStorage.getItem("light") === "true"
document.body.classList.add(light ? "light" : "dark")

function resetAnimation(el) {
  el.style.animation = 'none'
  el.offsetHeight
  el.style.animation = null
}


function darkModeLightMode() {

  if (light) {
    toggleSirkel.classList.remove("toggle-left")
    toggleSirkel.classList.add("toggle-right")
    console.log("det er darkmode")
    light = false
    localStorage.setItem("light", false)
    document.body.classList.remove("light")
    document.body.classList.add("dark")
  } else {
    toggleSirkel.classList.remove("toggle-right")
    toggleSirkel.classList.add("toggle-left")

    console.log("det er lightmode")
    light = true
    localStorage.setItem("light", true)
    document.body.classList.remove("dark")
    document.body.classList.add("light")
  }
}

// Brukernavn
const inputElement = document.getElementById("username")

function bruker() {
  let userbruker = inputElement.value
  localStorage.setItem("user", userbruker)
  updateUserNameInElements()
}

function updateUserNameInElements() {
  const viseusername = document.querySelectorAll(".brukernavn")
  let navn = localStorage.getItem("user")

  viseusername.forEach(element => {
    element.innerHTML = navn ?? ""
  })
}

// Passord
function checkAccess() {
  const codeInput = document.getElementById("access-code")
  const code = codeInput.value
  const errorMsg = document.getElementById("error-message")
  const validPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/

  if (validPattern.test(code)) {
    localStorage.setItem("loggedIn", "true")
    showMainContent()
  }else if(codeInput.value === ""){
    errorMsg.textContent = "Du må skrive inn et passord"
  }else {
    errorMsg.textContent = "Minst 6 bokstaver, 1 stor bokstav og ett tall"
  }
  codeInput.value = ""
}
codeInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter"){
    checkAccess()
  }
})
inputElement.addEventListener("keydown", (event)=>{
  if(event.key === "Enter"){
    checkAccess()
  }
})

function showMainContent() {
  document.getElementById("login-overlay").style.display = "none"
  document.getElementById("main-content").style.display = "block"
  body.style.overflow = "auto"
  window.scrollTo(0, 0)

}

function showLoginOverlay() {
  window.scrollTo(0, 0)
  document.getElementById("login-overlay").style.display = "flex"
  document.getElementById("main-content").style.display = "none"
  document.getElementById("access-code").value = ""
  document.getElementById("error-message").textContent = ""
  body.style.overflow = "hidden"
}

function logout() {
  dropdown.classList.remove("show")
  menuopen = false
  body.style.overflow = "auto"
  localStorage.setItem("loggedIn", "false")
  showLoginOverlay()
}

window.onload = function () {
  updateUserNameInElements()
  const isLoggedIn = localStorage.getItem("loggedIn")
  if (isLoggedIn === "true") {
    showMainContent()
  } else {
    showLoginOverlay()
  }
}

//login screen animasjon
document.addEventListener('DOMContentLoaded', ()=>{
  const interBubble = document.querySelector(".interactive")
  function move(){
    curX += (tgX - curX) / 20
    curY += (tgY - curY) / 20
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
    requestAnimationFrame(move)
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX
    tgY = event.clientY
  })

  move()

})

//todo liste 

const hovedInput = document.getElementById("maininput")
const containerElm = document.getElementById("todocontainer")
const addNewKnapp = document.getElementById("addnew")

window.addEventListener("load", () => {
    const lagredeTodos = JSON.parse(localStorage.getItem("todos")) || [];
    lagredeTodos.forEach(todo => {
        lagTodoElement(todo.tekst, todo.ferdig)
    })
})

function hentOgLag() {
    const skrevet = hovedInput.value.trim()
    if (!skrevet) return

    lagTodoElement(skrevet, false)
    lagreTilLocalStorage()
    hovedInput.value = ""

}
hovedInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter"){
    hentOgLag()
    hovedInput.blur()
  }
})
addNewKnapp.addEventListener("click", () => {
  const skrevet = hovedInput.value.trim()
    if(skrevet){
    hovedInput.blur()
  }
  hovedInput.value = ""
  hovedInput.focus()
})


function lagTodoElement(tekst, ferdig) {
    const divelm = document.createElement("div")
    divelm.className = "newtodo"
    containerElm.appendChild(divelm)

    const inputelm = document.createElement("input")
    inputelm.type = "checkbox"
    inputelm.className = "minorinput"
    inputelm.checked = ferdig
    divelm.appendChild(inputelm)

    const tekstelm = document.createElement("div")
    tekstelm.className = "tekst"
    tekstelm.textContent = tekst
    if (ferdig) tekstelm.classList.add("ferdig")
    divelm.appendChild(tekstelm)

    inputelm.addEventListener("change", () => {
        tekstelm.classList.toggle("ferdig", inputelm.checked)
        lagreTilLocalStorage()
    })

    const trashElm = document.createElement("button")
    trashElm.className = "trash"
    trashElm.innerHTML = '<i class="fa-solid fa-trash"></i>'
    divelm.appendChild(trashElm)

    trashElm.addEventListener("click", () => {

        divelm.style.animation = "slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"

        divelm.addEventListener("animationend", () => {
          divelm.remove()
          lagreTilLocalStorage()
        }, { once: true })
    })
}

function lagreTilLocalStorage() {
    const alleTodos = []
    const alleDivs = containerElm.querySelectorAll(".newtodo")
    alleDivs.forEach(div => {
        const tekst = div.querySelector(".tekst").textContent
        const ferdig = div.querySelector("input").checked
        alleTodos.push({ tekst, ferdig })
    });
    localStorage.setItem("todos", JSON.stringify(alleTodos))
}