// navbar
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

// owl carousel
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      navText: [
        "<i class='bx bx-chevron-left'></i>",
        "<i class='bx bx-chevron-right'></i>"
      ]
      
    });
  });
  
// prodect card section---------->

// like button

let likeCount = 0;

function toggleLike(element) {
  const icon = element.querySelector('i');
  const badge = document.getElementById('likeCountBadge');

  if (icon.classList.contains('bx-heart')) {
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart');
    likeCount++;
  } else {
    icon.classList.remove('bxs-heart');
    icon.classList.add('bx-heart');
    likeCount--;
  }

  // Update the badge
  if (likeCount > 0) {
    badge.textContent = likeCount;
    badge.style.display = 'flex'; // shows badge
  } else {
    badge.style.display = 'none'; // hides badge when count is 0
  }
}
