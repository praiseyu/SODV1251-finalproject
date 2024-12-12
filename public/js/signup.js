const signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', handleSignupSubmit);

async function handleSignupSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const userData = { name, email, password, confirmPassword };
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            alert("User succesfully registered. Redirecting to login page.")
            window.location.href = '/login';
        }
    } catch (err) {
        console.error('Error during signup:', err);
    }
};
