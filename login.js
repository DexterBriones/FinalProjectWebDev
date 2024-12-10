document.getElementById('togglePasswordIcon').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
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

document.addEventListener('DOMContentLoaded',function() {
    if (localStorage.getItem('loggedIn')) {
        const navBarButtons = document.getElementById('navbar-buttons');
        navBarButtons.innerHTML = ` 
        <a class="btn btn-light" href="account.html"><i class="bi bi-person-circle"></i></a> `;
    }
});