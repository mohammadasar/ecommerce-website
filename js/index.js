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
    $(".owl-carousel-1").owlCarousel({
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

  console.log("Before toggle:", {
    iconClass: icon.className,
    likeCount: likeCount
  });

  // Toggle heart icon and update count
  if (icon.classList.contains('bx-heart')) {
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart');
    likeCount++;
    console.log("Liked ➕: new likeCount =", likeCount);
  } else {
    icon.classList.remove('bxs-heart');
    icon.classList.add('bx-heart');
    likeCount = Math.max(0, likeCount - 1);
    console.log("Unliked ➖: new likeCount =", likeCount);
  }

  // Update badge visibility
  if (likeCount > 0) {
    badge.textContent = likeCount;
    badge.style.display = 'flex';
    console.log("Badge updated ✅:", badge.textContent);
  } else {
    badge.style.display = 'none';
    console.log("Badge hidden ❌");
  }

  console.log("After toggle:", {
    iconClass: icon.className,
    likeCount: likeCount
  });
}

// add to card function--------->
let cartCount = 0;

function addToCart() {
  const badge = document.getElementById('cartCountBadge');
  cartCount++;
  badge.textContent = cartCount;
  badge.style.display = 'flex'; // show badge when there's something in cart
}

function goToCartPage() {
  window.location.href = 'cart.html'; // replace with your actual cart page URL
}

// mobile navbar----------------------------------------->
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const toggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  navLinks.classList.toggle('show');
  toggle.classList.toggle('active');
  navbar.classList.toggle('fixed');

 
}

function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  const navLinks = document.getElementById('navLinks');

  dropdown.classList.toggle('show');

  if (dropdown.classList.contains('show')) {
    navLinks.style.height = '100vh';
  } else {
    navLinks.style.height = 'auto';
  }
}

// customer review carousel
$(document).ready(function () {
  var owl = $(".owl-carousel-2");

  owl.owlCarousel({
    center: true,
    items: 3,
    loop: true,
    margin: 30,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1000: { items: 3 }
    },
    onInitialized: applyActiveStyles,
    onTranslated: applyActiveStyles
  });

  function applyActiveStyles(event) {
    // Reset styles for all items
    owl.find('.item').css({
      'background-color': '',
      'color': ''
    }).find('.review-text, .review-name, p').css('color', '#000'); // Reset to black

    owl.find('.quotetion i').css('color', '#2da010'); // Default green

    // Apply styles to center item only
    owl.find('.owl-item.center .item').css({
      'background-color': '#3cb815'
    }).find('.review-text, .review-name, p').css('color', '#fff');

    owl.find('.owl-item.center .quotetion i').css('color', 'red');
  }

  // Custom Nav Buttons
  $("#nextBtn").click(function () {
    owl.trigger("next.owl.carousel");
  });

  $("#prevBtn").click(function () {
    owl.trigger("prev.owl.carousel");
  });
});

