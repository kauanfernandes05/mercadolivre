let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.classList.remove("active"));
    
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 3000);
}


showSlides();