import { cart } from "./cart.js";
import { dessertsProduct } from "./product.js";


export function renderConfirmModal(){
    
    const modalContainer = document.getElementById('orderSummary')
    let orderModalHTML = '';
    
    let totalAmount = 0; // Initialize total amount

    cart.forEach(cartItem => {
        let matchingProduct;
        dessertsProduct.forEach(item => {
            if (cartItem.id === item.id) {
                matchingProduct = item;
            }
        })
        
        console.log(matchingProduct)
        const itemTotal = cartItem.quantity * matchingProduct.price; 
        totalAmount += itemTotal; // Add item total to total amount
        orderModalHTML += 
        `
            <div class="flex justify-between items-center  px-2  py-4  border-b border-Rose-300">
                        <div class="flex h-full ">
                            <div class=" mr-2">
                                <img class="h-full object-cover rounded-sm"  width="60px" height="60px" src="${matchingProduct.img}" alt="">
                            </div>
                            <div class="">
                                <p class="text-md font-medium text-Rose-900">${matchingProduct.name}</p>
                                <span class="text-sm font-bold text-Red">${cartItem.quantity}x</span>
                                <span class="text-sm ml-4 text-Rose-500">@$${matchingProduct.price}</span>
                            </div>
                        </div>
                        <span class="text-sm ml-4 text-Rose-900 font-bold">$${itemTotal.toFixed(2)}</span>
            </div>
        `
    });

    modalContainer.innerHTML = orderModalHTML;


    const totalModalHTML = 
    `
         <div class="flex justify-between py-4 px-2">
            <span class="text-md font-semibold  text-Rose-900">Order Total</span>
            <span class="text-2xl font-bold">$${totalAmount.toFixed(2)}</span>
        </div>
    `

    modalContainer.insertAdjacentHTML('beforeend', totalModalHTML)
    
    
   
}

const cartContainer = document.getElementById('cartContainer');

 cartContainer.addEventListener('click', (e)=>{
        Object.values(cart).forEach((cartItem)=>{
            

            if(e.target.matches('#confirmOrderButton')){
                popModalButton( )
            }
        })
        console.log(e.target)
    })


export function popModalButton(){
  
      
        const modalPopUp = document.getElementById('orderConfirmModal')
        renderConfirmModal()
        modalPopUp.classList.remove('hidden')
        modalPopUp.classList.add('flex')
    
   
}




document.getElementById('startNewOrderBtn').addEventListener('click', ()=>{
    cart.length = 0;
    localStorage.removeItem('cart');
    dessertsProduct.forEach((product) => {
        localStorage.removeItem(`toggleState-${product.id}`);
        localStorage.removeItem(`borderState-${product.id}`);
    });

    // Reload the page
    location.reload();

})