
///NAV BAR
const burger = document.getElementById("burger");
const dropdown = document.getElementById("dropdown-content");

burger.addEventListener("mouseenter", () => {
    dropdown.classList.add("show");
});

burger.addEventListener("mouseleave", () => {
    dropdown.classList.remove("show");
});


//Darkmode

let light = localStorage.getItem("light") === "true" ? true : false; 
document.body.classList.add(light ? "light" : "dark");
function darkModeLightMode() {
    if (light) {
        console.log("det er light mode")
        light = false;
        localStorage.setItem("light", false)
        document.body.classList.remove("light")
        document.body.classList.add("dark")
    } else {
        console.log("det er darkmode")
        light = true;
        localStorage.setItem("light", true)
        document.body.classList.remove("dark")
        document.body.classList.add("light")
    }
}