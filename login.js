document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordField = document.querySelector('input[placeholder="Password"]');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    window.location.href = 'homepage.html';
    localStorage.setItem('loggedIn', true);
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('loggedIn')) {
        const navBarButtons = document.getElementById('navbar-buttons');
        navBarButtons.innerHTML = ` 
        <a class="btn btn-light" href="#"><i class="bi bi-person-circle"></i></a> `;
    }
});

window.onload = function () {
    const emailField = document.querySelector('input[placeholder="Email or Username"]');
    const passwordField = document.querySelector('input[placeholder="Password"]');
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail) emailField.value = savedEmail;
    if (savedPassword) passwordField.value = savedPassword;
};
