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
let logo = document.querySelector("#logo a img")
let tomt = document.querySelector(".tomt")

let curX = 0
let curY = 0
let tgX = 0
let tgY = 0

//animasjon ved meny knapp


//animasjon ved scroll//
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 150
        let height = sec.offsetHeight

        if (top >= offset && top < offset + height) {
            sec.classList.remove("showExitAnimation")
            sec.classList.add("showAnimation")
        } else {
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
logo.src = light ? "Bilder/MppLogo.png" : "Bilder/MppLogoDM.png"

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
        logo.src = "Bilder/MppLogoDM.png"

    } else {
        toggleSirkel.classList.remove("toggle-right")
        toggleSirkel.classList.add("toggle-left")

        console.log("det er lightmode")
        light = true
        localStorage.setItem("light", true)
        document.body.classList.remove("dark")
        document.body.classList.add("light")
        logo.src = "Bilder/MppLogo.png"
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
    } else if (codeInput.value === "") {
        errorMsg.textContent = "Du må skrive inn et passord"
    } else {
        errorMsg.textContent = "Minst 6 bokstaver, 1 stor bokstav og ett tall"
    }
    codeInput.value = ""
}
codeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkAccess()
    }
})
inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
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
document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector(".interactive")
    function move() {
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
    oppdaterTomtSynlighet()
})

function hentOgLag() {
    const skrevet = hovedInput.value.trim()
    if (!skrevet) return

    lagTodoElement(skrevet, false)
    lagreTilLocalStorage()
    hovedInput.value = ""

}
hovedInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        hentOgLag()
        hovedInput.blur()
    }
})
addNewKnapp.addEventListener("click", () => {
    const skrevet = hovedInput.value.trim()
    if (skrevet) {
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
            oppdaterTomtSynlighet()
        }, { once: true })
    })
    oppdaterTomtSynlighet()
}
function oppdaterTomtSynlighet() {
    const harTodos = containerElm.querySelectorAll(".newtodo").length > 0
    if (harTodos) {
        tomt.style.display = "none"
    } else {
        tomt.style.display = "flex"
    }
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


// NYHETER
const nyhet = document.getElementById('nyhet')

fetch(`https://gnews.io/api/v4/top-headlines?topic=technology&lang=no&max=10&token=2218c159e8ea69d0d78431cc89bb2db7`)
    .then(res => res.json())
    .then(data => {
        if (!data.articles || data.articles.length === 0) {
            carousel.innerHTML = '<p>Ingen nyheter funnet.</p>'
            return
        }

        nyhet.innerHTML = ''
        data.articles.forEach(article => {
            const card = document.createElement('div')
            card.className = 'nyhetcard'
            card.innerHTML = `
            <img src="${article.image || ''}" alt="Bilde">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" class="button button--stroke" data-block="button" target="_blank">
              <span class="button__flair"></span>
              <span class="button__label">Les Mer</span>
            </a>
          `
            nyhet.appendChild(card);
        })
        const buttonElements = document.querySelectorAll('[data-block="button"]')

        buttonElements.forEach((buttonElement) => {
            new Button(buttonElement)
        })
    })

    .catch(err => {
        console.error(err)
        nyhet.innerHTML = '<p>Kunne ikke hente nyheter.</p>'
    })

const nextKnapp = document.getElementById('nextKnapp')
const prevKnapp = document.getElementById('prevKnapp')

nextKnapp.addEventListener('click', () => {
    nyhet.scrollBy({ left: 320, behavior: 'smooth' })
})

prevKnapp.addEventListener('click', () => {
    nyhet.scrollBy({ left: -320, behavior: 'smooth' })
})


//TIMEPLAN!!

  document.querySelectorAll('.fagdrag').forEach(fag => {
    fag.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", e.target.dataset.fag);
      e.dataTransfer.setData("type", "ny");
    });
  });

  // Alle celler i timeplanen skal være droppable
  document.querySelectorAll('.celle').forEach(celle => {
    celle.addEventListener('dragover', e => {
      e.preventDefault();
      celle.classList.add("over");
    });

    celle.addEventListener('dragleave', () => {
      celle.classList.remove("over");
    });

    celle.addEventListener('drop', e => {
      e.preventDefault();
      celle.classList.remove("over");

      const fagNavn = e.dataTransfer.getData("text/plain");
      const type = e.dataTransfer.getData("type");

      // Fjern eventuell tidligere innhold
      celle.innerHTML = "";

      if (type === "ny") {
        const fagEl = document.createElement("div");
        fagEl.textContent = fagNavn;
        fagEl.className = "fag-i-celle";
        fagEl.id = `fag-${Date.now()}`;
        fagEl.draggable = true;
        fagEl.addEventListener("dragstart", dragFag);
        fagEl.addEventListener("click", fjernFag);
        celle.appendChild(fagEl);
      } else if (type === "flytt") {
        const id = e.dataTransfer.getData("id");
        const eksisterende = document.getElementById(id);
        if (eksisterende) {
          celle.appendChild(eksisterende);
        }
      }

      lagreTimeplan();
    });
  });

  function dragFag(e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
    e.dataTransfer.setData("type", "flytt");
    e.dataTransfer.setData("id", e.target.id);
  }

  function fjernFag(e) {
    e.stopPropagation(); // Ikke trig dropp igjen
    e.target.parentElement.innerHTML = "";
    lagreTimeplan();
  }

  function lagreTimeplan() {
    const data = {};
    document.querySelectorAll('.fag').forEach(celle => {
      const pos = celle.dataset.pos;
      const fag = celle.textContent.trim();
      if (fag) data[pos] = fag;
    });
    localStorage.setItem("timeplan", JSON.stringify(data));
  }

  function lastTimeplan() {
    const data = JSON.parse(localStorage.getItem("timeplan") || "{}");
    document.querySelectorAll('.fag').forEach(celle => {
      const pos = celle.dataset.pos;
      celle.innerHTML = "";
      if (data[pos]) {
        const fag = document.createElement("div");
        fag.className = "fag-i-celle";
        fag.textContent = data[pos];
        fag.id = `fag-${Date.now()}-${Math.random()}`;
        fag.draggable = true;
        fag.addEventListener("dragstart", dragFag);
        fag.addEventListener("click", fjernFag);
        celle.appendChild(fag);
      }
    });
  }

  // Start
  lastTimeplan();

//GSAP 

class Button {
    constructor(buttonElement) {
        this.block = buttonElement
        this.init()
        this.initEvents()
    }

    init() {
        const el = gsap.utils.selector(this.block)

        this.DOM = {
            button: this.block,
            flair: el(".button__flair")
        }

        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent")
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent")
    }

    getXY(e) {
        const {
            left,
            top,
            width,
            height
        } = this.DOM.button.getBoundingClientRect()

        const xTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, width, 0, 100),
            gsap.utils.clamp(0, 100)
        )

        const yTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, height, 0, 100),
            gsap.utils.clamp(0, 100)
        )

        return {
            x: xTransformer(e.clientX - left),
            y: yTransformer(e.clientY - top)
        }
    }

    initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
            console.log("HOVER!")
            const { x, y } = this.getXY(e)

            this.xSet(x)
            this.ySet(y)

            gsap.to(this.DOM.flair, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        })

        this.DOM.button.addEventListener("mouseleave", (e) => {
            const { x, y } = this.getXY(e)

            gsap.killTweensOf(this.DOM.flair)

            gsap.to(this.DOM.flair, {
                xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                scale: 0,
                duration: 0.3,
                ease: "power2.out"
            })
        })

        this.DOM.button.addEventListener("mousemove", (e) => {
            const { x, y } = this.getXY(e)

            gsap.to(this.DOM.flair, {
                xPercent: x,
                yPercent: y,
                duration: 0.4,
                ease: "power2"
            })
        })
    }
}

