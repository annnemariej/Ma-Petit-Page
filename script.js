const dropdownContent = document.querySelector(".dropdown-content")

function showDropdownContent() {
    dropdownContent.style.display = "flex"
    dropdownContent.style.flexDirection = "column-reverse"

}

function hideDropDown() {
    dropdownContent.style.display = "none"

}