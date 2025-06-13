// // auth-check.js
// window.addEventListener('DOMContentLoaded', () => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     const decoded = jwt_decode(token);
//     const roles = decoded.roles ? decoded.roles.split(',') : [];

//     if (roles.includes('ADMIN')) {
//       document.getElementById('adminLink')?.style.display = 'block';
//       document.getElementById('adminLinkMobile')?.style.display = 'block';
//     } else {
//       document.getElementById('adminLink')?.style.display = 'none';
//       document.getElementById('adminLinkMobile')?.style.display = 'none';
//     }
//   } else {
//     // Optional: Redirect to login if no token
//     console.warn('No token found. Redirecting to login.');
//     window.location.href = 'login.html';
//   }
// });
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwt_decode(token);
      const roles = decoded.roles ? decoded.roles.split(',') : [];

      const adminLink = document.getElementById('adminLink');
      const adminLinkMobile = document.getElementById('adminLinkMobile');

      if (roles.includes('ADMIN')) {
        if (adminLink) adminLink.style.display = 'block';
        if (adminLinkMobile) adminLinkMobile.style.display = 'block';
      } else {
        if (adminLink) adminLink.style.display = 'none';
        if (adminLinkMobile) adminLinkMobile.style.display = 'none';
      }
    } catch (err) {
      console.error('Error decoding token:', err);
      localStorage.removeItem('token');
      
    }
  } else {
    console.warn('No token found. Redirecting to login.');
    
  }
});

