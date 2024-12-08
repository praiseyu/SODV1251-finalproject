const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', handleLogin);

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userData = { email, password };
    try {
        console.log("40");
        const login = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const response = await login.json();
        console.log(response);
        if (login.ok) {
            alert('Login successful!');
            localStorage.setItem('authToken', response.token);
            // console.log(response.token + "line 23 login.js")
            console.log("line 24 of login.js");
            // setTimeout(() => {
            // window.location.href = '/flights';
            const validation = await fetch('/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${response.token}`,
                },
            });
            console.log(validation);
            // console.log(response.data.json());
            if (validation.ok) {
                console.log("I AM AUTHENTICATED at login.js 33");
                setTimeout(() => {
                    window.location.href = '/flights';
                }, 500);
            } else {
                console.log("unauth. line 36 login.js");
            }
            // }, 500);

        } else {
            alert(response.message);
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('An error occurred. Please try again.');
    }
}