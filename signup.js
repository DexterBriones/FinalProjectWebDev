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

    if (/[^0-9]/.test(value)) {
        errorMessage.textContent = 'Please enter only numbers.';
        errorMessage.style.display = 'block';
        e.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    } else {
        errorMessage.style.display = 'none';
    }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from submitting normally

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;

    // Basic validation
    if (username === "" || email === "" || phone === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    // Validate Email format
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate Phone format (optional for specific regions)
    let phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 11-digit phone number.");
        return;
    }
});

function loginwebsite() {
    alert("You have been logged in!");
    setTimeout(function () {
        window.location.href = 'login.html';  // Redirect to login.html
    }, 1000);  // 1-second delay to allow the alert to show
}
