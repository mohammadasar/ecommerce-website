const API_BASE = 'http://localhost:8080/auth';
// const API_BASE = 'https://ecommerce-backend-wnu9.onrender.com/auth';

const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('signupUsername');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('signupPassword');
const confirmInput = document.getElementById('confirmPassword');
const signupBtn = document.getElementById('signupBtn');
const signupLoader = document.getElementById('signupLoader'); // ✅ Loader reference
const usernameSpan = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutDesktop");
const logoutBtnMobile = document.getElementById("logoutMobile");



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

      const data = await res.json();

   
        if (res.ok) {
            // ✅ Save token + username in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username",data.username);

          usernameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
          confirmInput.value = '';

          // ✅ Show username on website if span exists
        if (usernameSpan) {
          usernameSpan.textContent = data.username;
        
          console.log("username====",data.username);
          document.querySelector(".ps-5").style.display = "block";

          
        }
       
         // ✅ Show logout button (desktop)
       if (logoutBtn) {
         logoutBtn.style.display = "block";
          console.log("✅ Logout button displayed");
       } else {
            console.error("❌ Logout button not found in DOM");
        }

      
        // Mobile WELCOME
    const profileCircleMobile = document.getElementById("profileCircleMobile");
    const usernameDisplayMobile = document.getElementById("usernameDisplayMobile");
    const mobileProfile = document.getElementById("mobileProfile");

    if (profileCircleMobile && usernameDisplayMobile && mobileProfile) {
      const firstLetter = data.username.charAt(0).toUpperCase();
      profileCircleMobile.textContent = firstLetter;
      usernameDisplayMobile.textContent = data.username;
      mobileProfile.style.display = "block"; // ✅ unhide mobile welcome
    }

    // mobilelogout ------->
     if (logoutBtnMobile) {
         logoutBtnMobile.style.display = "block";
          console.log("✅ Logout button displayed");
       } 

      

        alert("Signup successful! Welcome " + data.username);


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
// const usernameLoginInput = document.getElementById("loginUsername");
// const passwordLoginInput = document.getElementById("loginPassword");
// const loginBtn = document.getElementById("loginBtn");
// const loginForm = document.getElementById("loginForm");
// const loginLoader = document.getElementById("loginLoader");
// const showusername =document. getElementById("usernameDisplay");

// if (usernameLoginInput && passwordLoginInput && loginBtn && loginForm) {
//   function checkInputs() {
//     const isFilled = usernameLoginInput.value.trim() !== "" && passwordLoginInput.value.trim() !== "";
//     loginBtn.disabled = !isFilled;
//     loginBtn.style.backgroundColor = isFilled ? "rgb(8, 213, 240)" : "#252525";
//     loginBtn.style.color = isFilled ? "black" : "white";
//     loginBtn.style.fontWeight = isFilled ? "600" : "normal";
//   }

//   usernameLoginInput.addEventListener("input", checkInputs);
//   passwordLoginInput.addEventListener("input", checkInputs);

//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = usernameLoginInput.value;
//     const password = passwordLoginInput.value;

//     try {
//       const res = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       if (!res.ok) {
//         const errorText = await res.text();

//          showusername.textContent = data.username;
         
//         throw new Error(errorText || 'Login failed');
//       }

//       const data = await res.json();
//       if (data.token) {
//         if (loginLoader) loginLoader.style.display = "flex";

//         setTimeout(() => {
//            // ✅ Save token + username
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('username', username);
       

//         // ✅ Show username on page
//         document.getElementById("usernameDisplay").textContent =data.username;
//         document.querySelector(".ps-5").style.display = "block"; // unhide welcome

       



//           usernameLoginInput.value = "";
//           passwordLoginInput.value = "";
//           checkInputs();
//           window.location.href = 'index.html';
//         }, 3000);
//       } else {
//         alert('Login failed: No token received');
//       }
//     } catch (err) {
//       alert('Error: ' + err.message);
//     }
//   });
// }

// ====== LOGIN ======
const usernameLoginInput = document.getElementById("loginUsername");
const passwordLoginInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginLoader = document.getElementById("loginLoader");

// Desktop
const showUsername = document.getElementById("usernameDisplay");
const profileCircle = document.getElementById("profileCircle");

// Mobile
const profileCircleMobile = document.getElementById("profileCircleMobile");
const usernameDisplayMobile = document.getElementById("usernameDisplayMobile");
const mobileProfile = document.getElementById("mobileProfile");

if (usernameLoginInput && passwordLoginInput && loginBtn && loginForm) {
  function checkInputs() {
    const isFilled =
      usernameLoginInput.value.trim() !== "" &&
      passwordLoginInput.value.trim() !== "";
    loginBtn.disabled = !isFilled;
    loginBtn.style.backgroundColor = isFilled ? "rgb(8, 213, 240)" : "#252525";
    loginBtn.style.color = isFilled ? "black" : "white";
    loginBtn.style.fontWeight = isFilled ? "600" : "normal";
  }

  usernameLoginInput.addEventListener("input", checkInputs);
  passwordLoginInput.addEventListener("input", checkInputs);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = usernameLoginInput.value.trim();
    const password = passwordLoginInput.value.trim();

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token) {
        if (loginLoader) loginLoader.style.display = "flex";

        setTimeout(() => {
          // ✅ Save token + username
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);

          // ✅ Desktop Welcome
          if (showUsername && profileCircle) {
            showUsername.textContent = data.username;
            profileCircle.textContent = data.username.charAt(0).toUpperCase();
            document.querySelector(".ps-5").style.display = "block";
          }

          // ✅ Mobile Welcome
          if (profileCircleMobile && usernameDisplayMobile && mobileProfile) {
            profileCircleMobile.textContent =
              data.username.charAt(0).toUpperCase();
            usernameDisplayMobile.textContent = data.username;
            mobileProfile.style.display = "flex"; // flex + gap (use CSS gap)
          }

          // ✅ Clear inputs
          usernameLoginInput.value = "";
          passwordLoginInput.value = "";
          checkInputs();

          // ✅ Redirect
          window.location.href = "index.html";
        }, 3000);
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
}

// logout section------>
async function logout() {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch(`${API_BASE}/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  // Clear local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  // Redirect
  window.location.href = "login.html";
}









