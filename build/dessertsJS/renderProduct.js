import { dessertsProduct } from "./product.js";
import { cart, addToCart, incrementQuantity, decrementQuantity, restoreToggleStateFromLocalStorage } from "./cart.js";

export function renderDessertsProduct() {
    const cakeContainerHTML = document.getElementById('cakeContainer');

    let cakeHTML = '';

    dessertsProduct.forEach((product) => {
        cakeHTML += 
        `
            <div class="">
                <div class="w-full relative mb-8">
                    <img src="${product.img}" alt=""
                        class="h-64 w-full object-cover rounded-xl hover:border-4 hover:border-Red transition-all duration-200  " id="productImage-${product.id}">
                    <div class="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 shrink-0 transition-all duration-300">
                        <button id="addToCart-${product.id}"
                            class="w-max flex justify-center text-sm items-center gap-2 py-2 px-4 bg-Rose-50 border border-Red rounded-3xl shrink-0 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"
                                viewBox="0 0 21 20">
                                <g fill="#C73B0F" clip-path="url(#a)">
                                    <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                                    <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Add to Cart
                        </button>
                        <div id="quantity-controls-${product.id}" class="text-center hidden px-20 transition-all duration-300">
                            <div class="inline-block items-center py-1 bg-Red w-40 text-white border border-Red rounded-3xl">
                                <button id="decrement-${product.id}" class="relative -left-4 text-lg p-1 md:p-2 border border-white rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 10 2">
                                        <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                                    </svg>
                                </button>
                                <span id="quantity-${product.id}" class="text-lg">1</span>
                                <button id="increment-${product.id}" class="text-lg relative -right-4 p-1 md:p-2 border border-white rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                                        <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <p class="text-sm text-Rose-500">${product.type}</p>
                    <span class="font-bold text-Rose-900">${product.name}</span>
                    <p class="text-Red font-bold">$${product.price}</p>
                </div>
            </div>
        `;
    });

    cakeContainerHTML.innerHTML = cakeHTML;

    // Add event listeners for "Add to Cart" buttons
    dessertsProduct.forEach((product) => {
        const addToCartButton = document.getElementById(`addToCart-${product.id}`);
        const incrementButton = document.getElementById(`increment-${product.id}`);
        const decrementButton = document.getElementById(`decrement-${product.id}`);

        addToCartButton.addEventListener('click', () => {
            toggleQuantity(product);
            addToCart(product.id); // Add to cart when "Add to Cart" is clicked
        });
        incrementButton.addEventListener('click', () => incrementQuantity(product.id));
        decrementButton.addEventListener('click', () => decrementQuantity(product.id));
    });

    // Restore toggle state from local storage
    restoreToggleStateFromLocalStorage();
}

// Toggle Add to Cart button with quantity controls
function toggleQuantity(product) {
    const addToCartButton = document.getElementById(`addToCart-${product.id}`);
    const quantityControls = document.getElementById(`quantity-controls-${product.id}`);
    const productImage = document.getElementById(`productImage-${product.id}`);

    if (!addToCartButton.classList.contains('hidden')) {
        addToCartButton.classList.add('hidden');
        quantityControls.classList.remove('hidden');
        productImage.classList.add('border-4', 'border-Red');
    }
}
