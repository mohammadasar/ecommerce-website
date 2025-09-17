// order process ------>

const params = new URLSearchParams(window.location.search);
const name = decodeURIComponent(params.get('name'));
const price = params.get('price');
const description = decodeURIComponent(params.get('description'));
const quantity = params.get('quantity');
const image = decodeURIComponent(params.get('image'));

if (name && price && image && quantity && description) {
  const container = document.getElementById('product-detail');
  container.innerHTML = `
    <div class="row card-row ">
      <div class="col-12 col-md-6 position-relative p-0">
        <img src="${image}" alt="${name}"><br>
        <div class="like-icon">
          <i class='bx bx-heart'></i>
        </div>
      </div>
      <div class="col-12 col-md-6   d-flex flex-column justify-content-between">
        <div>
        <h3 class="px-3 px-md-5" >${name}</h3>
        <p class="px-3 px-md-5">${description}</p>
        <p class="mt-3 px-3 px-md-5"><strong>Price:</strong> $${price}</p>
        <label class="px-3 px-md-5"><strong>Quantity:</strong>
          <input type="number" id="qty-input" value="${quantity}" min="1">
        </label><br>
        </div>
        <div class="bottom-option d-md-block d-none" id="bottom-option-desk"></div>
      </div>
    </div>
  `;

  const container1 = document.getElementById('bottom-option-desk');
  container1.innerHTML = `
    <div class="d-flex flex-row justify-content-between">
      <button class="btn add-btn" onclick="addToCart('${name}', ${price}, 'qty-input', '${image}')">Add to Cart</button>
      <button class="btn buy-btn" onclick="buyNow('${name}', ${price}, 'qty-input')">Buy Now</button>
    </div>
  `;
   const container2 = document.getElementById('bottom-option-mobile');
  container2.innerHTML = `
    <div class="d-flex flex-row justify-content-between">
      <button class="btn add-btn" onclick="addToCart('${name}', ${price}, 'qty-input', '${image}')">Add to Cart</button>
      <button class="btn buy-btn" onclick="buyNow('${name}', ${price}, 'qty-input')">Buy Now</button>
    </div>
  `;



  // ✅ Attach the event listener for the like button
  const likeIcon = container.querySelector('.like-icon');
  likeIcon.addEventListener('click', function () {
    toggleLike(this);
  });
}
 else {
      document.getElementById('product-detail').textContent = 'Product details missing.';
    }

   // Function to handle Buy Now
function buyNow(productName, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value) || 1;
  window.currentProduct = { name: productName, price: price, qty: qty };

  // Show address form first
  document.getElementById("checkoutModal").style.display = "block";
}

// Step 1 → Save Address to DB
function saveAddressAndProceed() {
  const addressData = {
    fullName: document.getElementById("custName").value,
    phone: document.getElementById("custPhone").value,
    altPhone: document.getElementById("custAltPhone").value,
    pincode: document.getElementById("custPincode").value,
    address: document.getElementById("custAddress").value,
    state: document.getElementById("custState").value,
    district: document.getElementById("custDistrict").value
  };

  // Basic validation
  if (!addressData.fullName || !addressData.phone || !addressData.address) {
    alert("Please fill all required fields.");
    return;
  }

  // Save in DB
const token = localStorage.getItem("token");

// fetch("http://localhost:8080/admin/update-address", 
fetch("https://ecommerce-backend-wnu9.onrender.com/admin/update-address",
{
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(addressData)
})
  .then(res => {
    if (!res.ok) throw new Error("Failed to save address");
    return res.text();
  })
  .then(msg => console.log(msg))
  .catch(err => alert("Error saving address: " + err.message));
  document.getElementById("checkoutModal").style.display = "none";
 showPaymentDetails()
}

// Step 2 → Show Payment Details Card
function showPaymentDetails() {
  const { name, price, qty } = window.currentProduct;
  const totalAmount = price * qty;

  document.getElementById("paymentCard").innerHTML = `
    <div class="card p-3">
      <p><strong>Product:</strong> ${name}</p>
      <p><strong>Quantity:</strong> ${qty}</p>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    </div>
  `;
  document.getElementById("paymentDetails").style.display = "block";
}

// Step 3 → Place Order
function placeOrderFinal(paymentType) {
  const { name, price, qty } = window.currentProduct;
  const totalAmount = price * qty;

  if (paymentType === "COD") {
    // fetch("http://localhost:8080/api/orders/save",
    fetch("https://ecommerce-backend-wnu9.onrender.com/api/orders/save",
     {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
         },
      credentials: "include",
      body: JSON.stringify({
        productName: name,
        price: price,
        quantity: qty,
        paymentType: "COD",
        status: "PENDING"
      })
    }).then(() => {
      alert("Order placed successfully (COD)!");
      closePayment();
    });
    return;
  }

  // Razorpay Online Payment
  // fetch("http://localhost:8080/api/payment/create-order",
  fetch("https://ecommerce-backend-wnu9.onrender.com/api/payment/create-order",
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount })
  })
  .then(res => res.json())
  .then(orderData => {
    const options = {
      key: "rzp_test_qoebkgBWvtmZQw", // Razorpay Key
      amount: orderData.amount,
      currency: "INR",
      name: "My Shop",
      description: name,
      order_id: orderData.id,
      handler: function (response) {
        // fetch("http://localhost:8080/api/orders/save",
        fetch("https://ecommerce-backend-wnu9.onrender.com/api/orders/save", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: name,
            price: price,
            quantity: qty,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            paymentType: "ONLINE",
            status: "PAID"
          })
        }).then(() => {
          alert("Order placed successfully!");
          closePayment();
        });
      },
      theme: { color: "#3399cc" }
    };
    new Razorpay(options).open();
  });
}

function closeModal() {
  document.getElementById("checkoutModal").style.display = "none";
}

function closePayment() {
  document.getElementById("paymentDetails").style.display = "none";
}

// Close modal function
function closeModal() {
  document.getElementById("checkoutModal").style.display = "none";
}

    // Function to handle Add to Cart
    function addToCart(name, price, qtyInputId, image) {
      const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;

      const product = { name, price, quantity, image };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert('Product added to cart!');
    }

    // back to history page funciton
    function goBack() {
    if (document.referrer !== "") {
      history.back();
    } else {
      // Fallback if no history (e.g., user opened page directly)
      window.location.href = "index.html";
    }
  }
