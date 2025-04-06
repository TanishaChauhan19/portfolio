document.addEventListener("DOMContentLoaded", function() {
    let moveUpElement = document.getElementById("moveup");
    if (moveUpElement) { // Only modify if the element exists
        fetch("scrollup.html")
        .then(response => response.text()) 
        .then(data => {
            moveUpElement.innerHTML = data;
        })
        .catch(error => console.error("Error loading scrollup.html:", error));
    } else {
        console.error("Element with ID 'moveup' not found!");
    }
});

    // Show button when user scrolls down
window.onscroll = function() { showButton() };

function showButton() {
    let button = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = "block";
    } else {
         button.style.display = "none";
    }
}

    // Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


