document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slides = document.querySelector('.produto-carrossel');
    const imageButtons = document.querySelectorAll('.image-buttons div');
    const fisrtButton = document.getElementById('1');

    fisrtButton.classList.add('active');
    
    let currentSlide = 0;
    const totalImagens = slides.children.length;

    function updateSlide() {
        const pos = -currentSlide * 100;
        slides.style.transform = `translateX(${pos}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? totalImagens - 1 : currentSlide - 1;

        imageButtons.forEach(button => {
            button.classList.remove('active')
        })
        imageButtons[currentSlide].classList.add('active');

        updateSlide();
    })
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide === totalImagens - 1) ? 0 : currentSlide + 1;

        imageButtons.forEach(button => {
            button.classList.remove('active')
        })
        imageButtons[currentSlide].classList.add('active');
        
        updateSlide();
    })

    imageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = Number(button.getAttribute('id'));
            currentSlide = id - 1;
            
            imageButtons.forEach(button => {
                button.classList.remove('active');
            })

            button.classList.add('active');
            updateSlide();
        })
    })
})