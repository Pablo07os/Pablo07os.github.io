// Dados dos times (adicione quantos quiser)
const times = [
    { nome: "Santos", imagem: "/imagens/corinthaians.png" },
    { nome: "Corinthians", imagem: "/imagens/corinthians.png" },
    { nome: "Flamengo", imagem: "/imagens/corinthians.png" }
];

let currentIndex = 0;

const logoContainer = document.querySelector('.logo_Time');
const imgElement = document.querySelector('.logo_Time img');
const leftButton = document.querySelector('.left-side');
const rightButton = document.querySelector('.right-side');

function updateImage(index) {
    imgElement.style.opacity = '0';
    imgElement.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        imgElement.src = times[index].imagem;
        imgElement.alt = times[index].nome;
        
        imgElement.style.opacity = '1';
        imgElement.style.transform = 'scale(1)';
    }, 300);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % times.length;
    updateImage(currentIndex);
    
    animateButton(rightButton);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + times.length) % times.length;
    updateImage(currentIndex);
    
    animateButton(leftButton);
}

function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

if (rightButton) rightButton.addEventListener('click', nextImage);
if (leftButton) leftButton.addEventListener('click', prevImage);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});


imgElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

function addIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'indicators';
    indicatorsContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 20px;
        justify-content: center;
    `;
    
    times.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${index === currentIndex ? 'var(--detailsPurple)' : 'rgba(155, 89, 182, 0.3)'};
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateImage(currentIndex);
            updateIndicators();
        });
        
        indicatorsContainer.appendChild(indicator);
    });
    
    const buttons = document.querySelector('.buttons');
    buttons.parentNode.insertBefore(indicatorsContainer, buttons.nextSibling);
    
    window.updateIndicators = function() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, idx) => {
            ind.style.background = idx === currentIndex ? 'var(--detailsPurple)' : 'rgba(155, 89, 182, 0.3)';
        });
    };
}

