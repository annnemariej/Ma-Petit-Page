// NAV BAR
const burger = document.getElementById("burger")
const dropdown = document.getElementById("dropdown-content")

burger.addEventListener("mouseenter", () => {
  dropdown.classList.add("show")
});

burger.addEventListener("mouseleave", () => {
  dropdown.classList.remove("show")
});


// Darkmode
let light = localStorage.getItem("light") === "true"
document.body.classList.add(light ? "light" : "dark")

function darkModeLightMode() {
  if (light) {
    console.log("det er light mode")
    light = false
    localStorage.setItem("light", false)
    document.body.classList.remove("light")
    document.body.classList.add("dark")
  } else {
    console.log("det er darkmode")
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
  } else {
    errorMsg.textContent = "Minst 6 bokstaver, 1 stor bokstav og ett tall"
  }
  codeInput.value = ""
}

function showMainContent() {
  document.getElementById("login-overlay").style.display = "none"
  document.getElementById("main-content").style.display = "block"
}

function showLoginOverlay() {
  document.getElementById("login-overlay").style.display = "flex"
  document.getElementById("main-content").style.display = "none"
  document.getElementById("access-code").value = ""
  document.getElementById("error-message").textContent = ""
}

function logout() {
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