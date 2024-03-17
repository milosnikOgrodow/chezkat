function toggleNav() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("responsive");
}

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// paralax
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");
    loadSlideContent();
    var video = document.querySelector('.home-background-image');
    if (video) {
        window.addEventListener('scroll', function() {
            var value = window.scrollY;
            video.style.transform = 'translateY(' + value * 0.5 + 'px)';
        });
    } else {
        console.log("Video element not found");
    }
});

// To open the modal
document.querySelectorAll('.category-logo').forEach(item => {
    item.addEventListener('click', event => {
        const modalId = item.getAttribute('data-modal-target');
        const modal = document.querySelector(modalId);
        modal.style.display = 'block'; // Show the modal
    });
});

// To close the modal
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none'; // Hide the modal
    });
});

// Click outside to close
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none'; // Hide the modal
    }
});

/* load separate slides */
function loadSlideContent() {
    var pathToslides = 'assets/html/slides';
    fetch(`${pathToslides}/brunch-slide-1.html`)
        .then(response => response.text())
        .then(data => {document.getElementById('brunch-slide-1').innerHTML = data;})
        .catch(error => console.error('Error loading the slide content:', error));

    fetch(`${pathToslides}/brunch-slide-2.html`)
        .then(response => response.text())
        .then(data => {document.getElementById('brunch-slide-2').innerHTML = data;})
        .catch(error => console.error('Error loading the slide content:', error));
}

/* carousel */
let slideIndex = 1;

// Next/previous controls
function moveSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide-container");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "flex";
}

// Call this function to initiate the first slide
showSlides(slideIndex);
