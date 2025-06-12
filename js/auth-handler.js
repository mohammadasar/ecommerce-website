const API_BASE = 'http://localhost:8080/auth';

// Signup
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.text();
  alert(data);
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
