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
$(document).ready(function () {
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

function toggleLike(element, name, price, qtyInputId, image, description) {
  const icon = element.querySelector('i');
  const quantity = parseInt(document.getElementById(qtyInputId)?.value) || 1;

  let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

  const index = likedProducts.findIndex(
    (p) => p.name === name && p.image === image
  );

  // Toggle heart icon
  if (icon.classList.contains('bx-heart')) {
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart');

    if (index === -1) {
      likedProducts.push({ name, price, quantity, image, description });
    }
  } else {
    icon.classList.remove('bxs-heart');
    icon.classList.add('bx-heart');

    if (index !== -1) {
      likedProducts.splice(index, 1);
    }
  }

  localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}




// add to card function--------->
window.onload = function () {
  updateCartBadge();
};

function addToCart(name, price, qtyInputId, description) {
  const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;

  // Get the product card and its image
  const productCard = document.getElementById(qtyInputId).closest('.product-card');
  const image = productCard.querySelector('img')?.getAttribute('src') || '';


  const product = { name, price, quantity, image, description }; // Add description here

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Product added to cart!');
}


// view to cart
function viewDetails(name, price, qtyInputId, description) {
  const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;
  const productCard = document.getElementById(qtyInputId).closest('.product-card');
  const image = productCard.querySelector('img')?.getAttribute('src') || '';

  // Redirect with query parameters (all encoded properly)
  const url = `product-details.html?name=${encodeURIComponent(name)}&price=${price}&quantity=${quantity}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
  window.location.href = url;
}






// Update badge display and count
function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  badge.textContent = totalCount;
  console.log(badge.textContent)
  badge.style.display = totalCount > 0 ? 'flex' : 'none'; // control visibility
}
document.addEventListener('DOMContentLoaded', updateCartBadge);

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

// get products ----->
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const container = document.querySelector('.product-row');

  // Start both fetch and timer at the same time
  // const fetchPromise = fetch('http://localhost:8080/admin/products')
  const fetchPromise = fetch('https://ecommerce-backend-wnu9.onrender.com/admin/products')
    .then(res => res.json());

  const delayPromise = new Promise(resolve => setTimeout(resolve, 3000)); // ⏳ 5s delay

  Promise.all([fetchPromise, delayPromise])
    .then(([products]) => {
      if (!Array.isArray(products)) {
        loader.innerHTML = "Failed to load products.";
        return;
      }

      loader.style.display = "none"; // ✅ hide after 3s and fetch complete
      container.innerHTML = ''; // clear any loader inside

       // 👉 Show only first 10 products on index page
      const limitedProducts = products.slice(0, 3);

// <img src="http://localhost:8080${product.imageUrl}" alt="${product.name}">
//<img src="${product.imageUrl}" alt="${product.name}"></img>
      limitedProducts.forEach((product, index) => {
        const html = `
          <div class="col-6 col-md-4 d-flex justify-content-center mt-md-3 mt-4">
            <div class="product-card" onclick="viewDetails('${product.title}', ${product.price}, 'qty-${index}', '${product.description}')">
              <div class="product-image">
                
              <img src="${product.imageUrl}" alt="${product.name}"></img>
                <div class="like-icon" onclick="event.stopPropagation(); toggleLike(this, '${product.title}', ${product.price}, 'qty-${index}', '${product.imageUrl}', '${product.description}')">
                  <i class='bx bx-heart'></i>
                </div>
              </div>
              <div class="product-info">
                <h3>${product.title}</h3>
                <p class="d-none d-md-block">${product.description}</p>
                <div class="row mt-md-2">
                  <div class="col-6 col-md-5 quantity d-none d-md-block">
                    <label>Qty: <input type="number" id="qty-${index}" min="1" value="1"></label><br><br>
                  </div>
                  <div class="col-12 col-md-7 price">₹${product.price}</div>
                </div>
                <div class="buttons">
                  <button class="view-details d-none d-md-block"
                    onclick="event.stopPropagation(); viewDetails('${product.title}', ${product.price}, 'qty-${index}', '${product.description}')">
                    <span class="material-symbols-outlined">visibility</span>
                    View Details
                  </button>
                  <button class="add-to-cart d-none d-md-block"
                    onclick="event.stopPropagation(); addToCart('${product.title}', ${product.price}, 'qty-${index}', '${product.description}')">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    Add to Cart
                  </button>
                  <button class="view-details d-block d-md-none"
                    onclick="redirectToDetails('${product.title}', ${product.price}, 'qty-${index}', '${product.imageUrl}', \`${product.description}\`)">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                  <button class="add-to-cart d-block d-md-none"
                    onclick="event.stopPropagation(); addToCart('${product.title}', ${product.price}, 'qty-${index}', '${product.description}')">
                    <span class="material-symbols-outlined">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
  
      });

        // 👉 Setup "Browse More Products" button
      const browseBtn = document.querySelector(".product-btn button");
      browseBtn.addEventListener("click", () => {
        window.location.href = "all-products.html"; // redirect to all products page
      });
    })
    .catch(err => {
      loader.innerHTML = "Failed to load products.";
      console.error('Error:', err);
    });
});



 // searching products
//   // const response = await fetch(`https://ecommerce-backend-wnu9.onrender.com/admin/search?keyword=${keyword}`);

//   async function searchProducts() {
//   const keyword = document.getElementById("searchInput").value.trim();

//   if (keyword.length === 0) {
//     document.getElementById("results").innerHTML = "";
//     document.getElementById("productDetails").innerHTML = "";
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:8080/admin/search?keyword=${keyword}`);
//     if (!response.ok) throw new Error("Failed to fetch");

//     const products = await response.json();

//     let output = "<ul>";
//     products.forEach(p => {
//       output += `<li onclick="selectProduct('${p.id}', '${p.title}', '${p.description}', ${p.price}, '${p.imageUrl || ''}')">
//                    ${p.title}
//                  </li>`;
//     });
//     output += "</ul>";

//     document.getElementById("results").innerHTML = output;
//   } catch (error) {
//     console.error(error);
//     document.getElementById("results").innerHTML = "<p style='color:red;'>Error loading products</p>";
//   }
// }

let currentFocus = -1;


// async function searchProducts() {
//   const keyword = document.getElementById("searchInput").value.trim();
//   const resultsBox = document.getElementById("results");

//   if (keyword.length === 0) {
//     resultsBox.innerHTML = "";
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:8080/admin/search?keyword=${keyword}`);
//     const products = await response.json();

//     let output = "";

//     // ✅ If products found, group by category
//     const categories = new Set(products.map(p => p.category));

//     categories.forEach((cat, index) => {
//       output += `
//         <li class="list-group-item list-group-item-action"
//             onclick="redirectToCategory('${cat}')"
//             data-index="${index}">
//             <strong>${cat}</strong>
//         </li>`;
//     });

//     resultsBox.innerHTML = output;
//     currentFocus = -1; // reset
    
//   } catch (error) {
//     console.error("Search error:", error);
//   }
// }
async function searchProducts() {
  const keyword = document.getElementById("searchInput").value.trim();
  const resultsBox = document.getElementById("results");

  if (keyword.length === 0) {
    resultsBox.innerHTML = "";
    currentFocus = -1; // also reset here
    return;
  }

  try {
    // const response = await fetch(`http://localhost:8080/admin/search?keyword=${keyword}`);
     const response = await fetch(`https://ecommerce-backend-wnu9.onrender.com/admin/search?keyword=${keyword}`);
    const products = await response.json();

    let output = "";

    // ✅ If products found, group by category
    const categories = new Set(products.map(p => p.category));

    categories.forEach((cat, index) => {
      output += `
        <li class="list-group-item list-group-item-action"
            onclick="redirectToCategory('${cat}')"
            data-index="${index}">
            <strong>${cat}</strong>
        </li>`;
    });

    resultsBox.innerHTML = output;

    // ✅ Reset everything on new search
    currentFocus = -1;
    removeActive(resultsBox.getElementsByTagName("li"));

  } catch (error) {
    console.error("Search error:", error);
  }
}


function redirectToCategory(category) {
  const clickedItem = document.querySelector(`[onclick="redirectToCategory('${category}')"]`);
  if (clickedItem) {
    document.getElementById("searchInput").value = clickedItem.innerText; // keep category name in input
  }
  window.location.href = `category.html?name=${encodeURIComponent(category)}`;
}


function handleKeyNavigation(e) {
  const resultsBox = document.getElementById("results");
  const items = resultsBox.getElementsByTagName("li");

  if (e.key === "ArrowDown") {
    currentFocus++;
    addActive(items);
  } else if (e.key === "ArrowUp") {
    currentFocus--;
    addActive(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (currentFocus > -1 && items[currentFocus]) {
      items[currentFocus].click();
    }
  } else {
    searchProducts(); // normal typing triggers search
  }
}

function addActive(items) {
  if (!items) return;
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = items.length - 1;
  items[currentFocus].classList.add("active");
}

function removeActive(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
}
function goToCategory() {
  const keyword = document.getElementById("searchInput").value.trim();
  if (!keyword) return;

  // ✅ Redirect directly
  redirectToCategory(keyword);
}


// ✅ Hide dropdown when clicking outside
document.addEventListener("click", function(event) {
  const searchBox = document.querySelector(".searchBox");
  const resultsBox = document.getElementById("results");
  if (!searchBox.contains(event.target)) {
    resultsBox.innerHTML = "";
  }
});