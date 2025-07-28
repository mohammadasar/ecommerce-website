// const API_BASE = 'http://localhost:8080/auth';
const API_BASE = 'https://ecommerce-backend-wnu9.onrender.com/auth';

const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('signupUsername');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('signupPassword');
const confirmInput = document.getElementById('confirmPassword');
const signupBtn = document.getElementById('signupBtn');
const signupLoader = document.getElementById('signupLoader'); // ✅ Loader reference

if (signupForm && signupBtn && signupLoader) {
  // Disable initially
  signupBtn.disabled = true;

  function validateSignupFields() {
    const allFilled =
      usernameInput.value.trim() &&
      emailInput.value.trim() &&
      passwordInput.value &&
      confirmInput.value;

    if (allFilled) {
      signupBtn.disabled = false;
      signupBtn.classList.add('enabled');
    } else {
      signupBtn.disabled = true;
      signupBtn.classList.remove('enabled');
    }
  }

  [usernameInput, emailInput, passwordInput, confirmInput].forEach(input => {
    input.addEventListener('input', validateSignupFields);
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      signupBtn.disabled = true;
      signupBtn.innerText = 'Registering...';
      signupLoader.style.display = 'flex'; // ✅ Show loader

      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.text();

      if (res.ok) {
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmInput.value = '';
        alert(data);

        setTimeout(() => {
           window.location.href = 'index.html';
        }, 3000);
      } else {
        alert("Signup failed: " + data);
      }
    } catch (error) {
      alert("Error occurred: " + error.message);
    } finally {
      signupBtn.innerText = 'Register';
      signupLoader.style.display = 'none'; // ✅ Always hide after try/catch
      validateSignupFields();
    }
  });
}


// ====== LOGIN ======
const usernameLoginInput = document.getElementById("loginUsername");
const passwordLoginInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginLoader = document.getElementById("loginLoader");

if (usernameLoginInput && passwordLoginInput && loginBtn && loginForm) {
  function checkInputs() {
    const isFilled = usernameLoginInput.value.trim() !== "" && passwordLoginInput.value.trim() !== "";
    loginBtn.disabled = !isFilled;
    loginBtn.style.backgroundColor = isFilled ? "rgb(8, 213, 240)" : "#252525";
    loginBtn.style.color = isFilled ? "black" : "white";
    loginBtn.style.fontWeight = isFilled ? "600" : "normal";
  }

  usernameLoginInput.addEventListener("input", checkInputs);
  passwordLoginInput.addEventListener("input", checkInputs);

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameLoginInput.value;
    const password = passwordLoginInput.value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Login failed');
      }

      const data = await res.json();
      if (data.token) {
        if (loginLoader) loginLoader.style.display = "flex";

        setTimeout(() => {
          localStorage.setItem('token', data.token);
          usernameLoginInput.value = "";
          passwordLoginInput.value = "";
          checkInputs();
          window.location.href = 'index.html';
        }, 3000);
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}
