const API = "/api";

let token = localStorage.getItem("token");

if(token){

    document.getElementById("auth").style.display="none";

    document.getElementById("shop").style.display="block";

    loadProducts();

    loadCart();

    loadOrders();

}

// Register
async function register(){

    const name=document.getElementById("name").value;

    const email=document.getElementById("email").value;

    const password=document.getElementById("password").value;

    const response=await fetch(API+"/auth/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            email,
            password

        })

    });

    const data=await response.json();

    alert(data.message);

}

// Login
async function login(){

    const email=document.getElementById("loginEmail").value;

    const password=document.getElementById("loginPassword").value;

    const response=await fetch(API+"/auth/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email,
            password

        })

    });

    const data=await response.json();

    if(data.token){

        localStorage.setItem("token",data.token);

        location.reload();

    }

    else{

        alert(data.message);

    }

}

// Load Products
async function loadProducts(){

    const response=await fetch(API+"/products");

    const products=await response.json();

    const div=document.getElementById("products");

    div.innerHTML="";

    products.forEach(product=>{

        div.innerHTML+=`

        <div class="card">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <p><b>₹ ${product.price}</b></p>

            <p>Stock : ${product.stock}</p>

            <button onclick="addToCart('${product._id}')">

                Add To Cart

            </button>

        </div>

        `;

    });

}

// Add To Cart
async function addToCart(id){

    const response = await fetch(API + "/cart",{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            Authorization:localStorage.getItem("token")
        },

        body:JSON.stringify({
            product:id,
            quantity:1
        })

    });

    const data = await response.json();

    alert("Product Added Successfully");

    loadCart();

}

async function loadCart(){

    const response = await fetch(API + "/cart",{

        headers:{
            Authorization:localStorage.getItem("token")
        }

    });

    const cart = await response.json();

    const div = document.getElementById("cart");

    div.innerHTML = "";

    cart.forEach(item=>{

        div.innerHTML += `

        <div class="card">

            <h3>${item.product.name}</h3>

            <p>Quantity : ${item.quantity}</p>

            <p>₹ ${item.product.price}</p>

        </div>

        `;

    });

}

async function loadOrders(){

    const response = await fetch(API + "/orders",{

        headers:{
            Authorization:localStorage.getItem("token")
        }

    });

    const orders = await response.json();

    const div = document.getElementById("orders");

    div.innerHTML = "";

    orders.forEach(order=>{

        div.innerHTML += `

        <div class="card">

            <h3>Order</h3>

            <p>Total : ₹${order.totalAmount}</p>

            <p>Status : ${order.status}</p>

        </div>

        `;

    });

}

// Checkout
async function checkout(){

    const response = await fetch(API + "/cart",{

        headers:{
            Authorization:localStorage.getItem("token")
        }

    });

    const cart = await response.json();

    if(cart.length===0){

        alert("Cart is Empty");

        return;

    }

    let products = [];
    let totalAmount = 0;

    cart.forEach(item=>{

        products.push({

            product:item.product._id,
            quantity:item.quantity

        });

        totalAmount += item.product.price * item.quantity;

    });

    const orderResponse = await fetch(API + "/orders",{

        method:"POST",

        headers:{

            "Content-Type":"application/json",

            Authorization:localStorage.getItem("token")

        },

        body:JSON.stringify({

            products,
            totalAmount

        })

    });

    const data = await orderResponse.json();

    alert("Order Placed Successfully");

    loadOrders();

}

// Logout
function logout(){

    localStorage.removeItem("token");

    location.reload();

}