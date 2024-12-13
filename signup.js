const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

const phoneInput = document.getElementById('phone');
const errorMessage = document.querySelector('.error-message');

phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;

    // Check if the value contains non-numeric characters
    if (/[^0-9]/.test(value)) {
        errorMessage.textContent = 'Please enter only numbers.';
        errorMessage.style.display = 'block';
        e.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    } else {
        errorMessage.style.display = 'none';
    }
});

