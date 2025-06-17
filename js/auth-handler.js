// const API_BASE = 'http://localhost:8080/auth';
const API_BASE = 'https://ecommerce-backend-wnu9.onrender.com/auth';

// Signup
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const email = document.getElementById('email').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.text();

    if (res.ok) {
      alert(data);  // Signup successful
      window.location.href = 'index.html'; // ✅ Redirect
    } else {
      alert("Signup failed: " + data);
    }

  } catch (error) {
    alert("Error occurred: " + error.message);
  }
});


// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

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
      localStorage.setItem('token', data.token);  // ✅ Save token in browser
      window.location.href = 'index.html';        // ✅ Go to main page
    } else {
      alert('Login failed: No token received');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
});
