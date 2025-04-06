document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html") // Fetch navbar content
    .then(response => response.text()) 
    .then(data => {
        document.getElementById("nav-bar").innerHTML = data;
    });
});
function showSidebar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display='flex';

}
function closesidebar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display='none';

}
