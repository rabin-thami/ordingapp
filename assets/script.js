import { menuArray } from "/assets/data.js"

const classRemove = document.querySelector(".confirm-order")
let renderEl = document.querySelector(".item-container");
let buttonId = document.querySelector(".cartBtn");
let cartEl = document.querySelector('.cart-list')
let cartlist = []


document.addEventListener('click', (e) =>{
    const productId = parseInt(e.target.dataset.productId);

    menuArray.forEach(cartItem => {
        if(cartItem.id === productId) {
            classRemove.classList.remove("hidden")
            cartlist.push(cartItem);
            addToCart()
        }
    });
    
})


function addToCart() {
    cartlist.forEach(cartElement => {
      cartEl.innerHTML += `
      <li>
        <p class="cart-item-name">${cartElement.name}</p>
        <p class="remove-cart">remove</p>
        <p>${cartElement.price}</p>
      </li>
      `  
    })
}

function render() {
    // Loop through menuArray and generate HTML for each item
    menuArray.forEach(item => {
        renderEl.innerHTML += `
        <li>
            <p class="item-emoji">${item.emoji}</p>
            <div class="item-info-container">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="cartBtn" data-product-id=${item.id}"><i class="fa-regular fa-plus"></i></button>
        </li>
        `;
    });
}
render();