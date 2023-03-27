
const container = document.getElementById('errorBox');
const span = container.querySelector('span');

export function notification (message) {

    
    container.style.display = 'block'
    span.textContent = message;

    setTimeout(() => container.style.display = 'none', 2000);

}