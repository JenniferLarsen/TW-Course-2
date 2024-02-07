// FILTER BUTTON AND DROPDOWN SECTION
const drpDwnbtn = document.getElementById("drop-text");
const drpDwn_a_list = document.getElementById("a-list");
const arrow_icon = document.getElementById("arrow");

// toggle list
drpDwnbtn.onclick = function(){
    drpDwn_a_list.classList.contains("show") ? arrow_icon.style.rotate = "0deg" : arrow_icon.style.rotate = "-180deg";
    drpDwn_a_list.classList.toggle("show");
}
window.onclick = function (e) {
    if (e.target.id !== "drop-text" && e.target.id !== "span" && e.target.id !== "arrow"){
        drpDwn_a_list.classList.remove("show");
        arrow_icon.style.rotate = "0deg";
    }
}