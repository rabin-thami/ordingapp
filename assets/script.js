import { menuArray } from "/assets/data.js"

let renderEl = document.querySelector(".item-container");
let cartEl = document.querySelector(".cart-list")
let totalEl = document.querySelector("#totalPrice")
let cartlist = []
const duplicatesArray = []
function handleDuplicates(productId) {
    const idx = cartlist.findIndex(item => item.id == productId)
    cartlist[idx].quantity++
}
function handleNewItem(productId) {
    duplicatesArray.push(productId)
        menuArray.forEach(cartItem => {
            if (cartItem.id === productId) {
                document.querySelector(".confirm-order").classList.remove("hidden")
                cartlist.push(cartItem);
                
            }
        });
}

document.addEventListener('click', (e) => {
    const productId = parseInt(e.target.dataset.productId);

    if(e.target.classList.contains('remove-cart')) {
        const indexToRemove = cartlist.findIndex(item => item.id === productId)
        if (indexToRemove !== 1) {
            cartlist.splice(indexToRemove, 1)
            addToCart()
        }
    } 
    
    if (e.target.classList.contains('cartBtn')) {
        const isDuplicate = duplicatesArray.includes(productId)
        
        isDuplicate ? handleDuplicates(productId) : handleNewItem(productId)
        addToCart()
    }

    
    if (e.target.id === 'completeOrder'){
        document.querySelector(".card-info-container").classList.remove('hidden')
    }
    
    if (e.target.id === 'closePopUp') {
        document.querySelector(".card-info-container").classList.add('hidden')
    }

    if (e.target.id === 'pay'){
        checkCard()
    }
});


function addToCart() {
    cartEl.innerHTML = ''
    cartlist.forEach(cartElement => {
        cartEl.innerHTML += `
            <li>
                <p class="cart-item-name">${cartElement.name}</p>
                <p>x${cartElement.quantity}</p>
                <p class="remove-cart">remove</p>
                <p>$ ${cartElement.price}</p>
            </li>
        `;
    });
    totalPrice()
}

function totalPrice() {
    let total = 0
    cartlist.forEach(item => total = total + (item.price * item.quantity))
    totalEl.innerHTML = "$" + total
}


function checkCard() {
    let cardHolderName = document.querySelector("#userName").value;
    let cardNumber = document.querySelector("#cardNumber").value;
    let cardCVV = document.querySelector("#CVV").value;

    if (!cardHolderName) {
        alert('Enter card holder name');
    } else if (!cardNumber || cardNumber.length !== 16) {
        alert('Invalid card number');
    } else if (!cardCVV || cardCVV.length !== 3) {
        alert('Invalid CVV');
    }else {
        cartlist= []
        document.querySelector(".card-info-container").classList.add('hidden')
        document.querySelector('.thank-you').classList.remove("hidden")
    }
}


function render() {
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