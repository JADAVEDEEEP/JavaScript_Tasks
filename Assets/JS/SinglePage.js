

///////////////////////////////////////////////////////////////TO SHOW SINGLE PRODUCT DYNAMICALLY //////////////////////////////////////
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        viewSingleProduct(productId);
    }
}
async function viewSingleProduct(productId) {
    const loadingIndicator = document.getElementById('loading');
    const singleProduct = document.getElementById('singleProduct');
   
    const viewDetails = document.getElementById('ViewDetails')
    try {

        loadingIndicator.style.display = 'block';

        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const product = await response.json();
        const { title, image, price, rating, description, category } = product;

        const productCard = `
            <div class="row d-flex justify-content:space-between">
                <div class="col-md-5 col-sm-12 py-5 text-center">
                    <img class="image" src="${image}" width="300px" height="300px" style="object-fit: contain"/>
                </div>
                <div class="col-md-5 py-5">
                    <h4 class="text-uppercase text-muted">${title}</h4>
                    <p class="lead">${rating.rate} <i class="fa fa-star"></i></p>
                    <h3 class="display-6 my-4">INR ${price}</h3>
                    <p class="lead mt-3 text-muted">${description}</p>
                    <h6 class="my-4">${category}</h6>
                    <button class="btn btn-outline-dark" onclick="addToWishlist(${productId}, '${title}')">Add To Wishlist</button>
                    <a href="AddToCart.html" class="btn btn-dark mx-3" onclick="addToCart(${productId}, '${title}', ${price})">Add To Cart</a>
                </div>
            </div>
        `;

        const detailsProduct = `
            <div>
                <div class="container mb-5 p-5" style="background-color: #f0f0f0; font-family: 'Times New Roman', Times, serif; padding: 20px; border-radius: 10px; min-height: 150%; width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center;">
                    <div class="row" style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); min-height: 500px; width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
                        <div class="col-lg-16 py-2" style="flex: 1 1 100%; max-width: 100%; padding: 15px;">
                            <h3 style="color: #333;">Details</h3>
                            <p class="text-muted">${description}</p>
                            <h3 style="color: #333;">Product Details</h3>
                            <div class="d-flex justify-content-between align-items-center p-1 border-bottom" style="border-bottom: 1px solid #ddd;">
                                <span class="fw-bold" style="font-weight: bold;">Product Name</span>
                                <span>${title}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center p-1 border-bottom" style="border-bottom: 1px solid #ddd;">
                                <span class="fw-bold" style="font-weight: bold;">Product Rating</span>
                                <span>
                                    <p class="lead" style="margin: 0;">${rating.rate} <i class="fa fa-star" style="color: #ffcc00;"></i></p>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center p-1 border-bottom" style="border-bottom: 1px solid #ddd;">
                                <span class="fw-bold" style="font-weight: bold;">Product Price</span>
                                <span>
                                    <p class="lead" style="margin: 0;">${price} INR</p>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center p-1 border-bottom" style="border-bottom: 1px solid #ddd;">
                                <span class="fw-bold" style="font-weight: bold;">Product Category</span>
                                <span>
                                    <p class="lead" style="margin: 0;">${category}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        loadingIndicator.style.display = 'none';
        singleProduct.innerHTML = productCard;
        viewDetails.innerHTML = detailsProduct 
    

             viewRelatedProducts(category, productId);
    } catch (error) {
       
        loadingIndicator.style.display = 'none';
        console.error(error);
        singleProduct.innerHTML = '<p>Error loading product details.</p>';
    }
}

async function viewRelatedProducts(category, excludeProductId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch related products');
        }

        const relatedProducts = await response.json();
        const filteredProducts = relatedProducts.filter(product => product.id != excludeProductId);

        const relatedProductsContainer = document.getElementById('relatedProducts');
        let relatedProductsHTML = '<h3 class="my-4 p-5">Related Products</h3><div class="row">';

        filteredProducts.map(product => {
            relatedProductsHTML += `

            <div class=" col-md-3 ms-3 me-5 mx-1 col-sm-6 mb-4">
         <div class="card bg-light" style="border:none">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" height="200px" style=" object-fit: contain">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">INR ${product.price}</p>
            <a href="?id=${product.id}" class="btn btn-outline-dark">View Product</a>
        </div>
    </div>
</div>


            `;
        });
        relatedProductsHTML += '</div>';
        relatedProductsContainer.innerHTML = relatedProductsHTML;
    } catch (error) {
        console.error('Error fetching related products:', error);
    }
}

/////////////////////////////////////////////////////////////////STORE MULTIPLE ITEMS//////////////////////////////////////////////////
function addToCart(id, title, price) {
    const cartItem = {
        id,
        title,
        price,
        quantity: 1 
    };

    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        console.log("Cart was null or undefined, initializing...");
        cart = [];
    }

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1; 
        console.log(`Item quantity incremented: ${existingItem.quantity}`);
    } else {
        cart.push(cartItem);
        console.log(`New item added: ${JSON.stringify(cartItem)}`);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title}`)
    
}

/////////////////////////////////////////////////////////////////WISH LIST /////////////////////////////////////////////////////////////

function addToWishlist(productId, title) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    
    if (!wishlist.some(product => product.id === productId)) {
        wishlist.push({ id: productId, title: title });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistIcon();
    }
}


function updateWishlistIcon() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistIcon = document.getElementById('wishlist-icon');

    if (wishlist.length > 0) {
        wishlistIcon.innerHTML = `<i class="fa fa-heart"></i><span class="badge bg-danger">${wishlist.length}</span>`;
    } else {
        wishlistIcon.innerHTML = `<i class="fa fa-heart"></i>`;
    }
}

document.addEventListener('DOMContentLoaded',  ()=> {
    updateWishlistIcon(); 
});


///////////////////////////////////////////////////////////REVIEWS JASONS////////////////////////////////////////////////////////////
async function jasondata() {
    try {
      
        const response = await fetch('/Assets/js/Reviews.json');
        const products = await response.json();
        console.log(products);

        const productContainer = document.getElementById('ProductReview');
        productContainer.innerHTML = ''; 

        
        productContainer.innerHTML += `<h3>Reviews⭐⭐</h3>`;

      
        const visibleLimit = 3;
        
       
        const initialProductCards = products.slice(0, visibleLimit).map(({ star, description, name, details }) => {
            const starRating = getStarRating(star);
            return createProductCard(name, starRating, description, details);
        }).join('');

        productContainer.innerHTML += `<div class="row">${initialProductCards}</div>`;

        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.classList.add('btn', 'btn-primary');
        viewMoreBtn.style.cssText = 'display: block; margin-top: 20px; margin-left: auto; margin-right: auto; text-align: center; background-color: white; color: black; font-size: 20px; padding: 12px 24px; border: 2px solid black; border-radius: 10px;width:250px; fas fa-chevron-down mx-2"';
        viewMoreBtn.innerText = 'View More';
        
      
        productContainer.appendChild(viewMoreBtn);
        
        
     
        viewMoreBtn.addEventListener('click', () => {
            viewMoreBtn.style.display = 'none';

            
            const additionalProductCards = products.slice(visibleLimit).map(({ star, description, name, details }) => {
                const starRating = getStarRating(star);
                return createProductCard(name, starRating, description);
            }).join('');
            productContainer.innerHTML += `<div class="row">${additionalProductCards}</div>`;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getStarRating(star) {
    return Array.from({ length: 5 }, (_, i) => i < star ? '⭐' : '⛤').join('');
}

function createProductCard(name, starRating, description, details) {
    return `
        <div class=" bg-light col-12 p-5 col-sm-6 col-md-4 mb-3">
            <div class="card shadow">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${starRating}</h6>
                    <p class="card-text">${description}</p>
                    <div class="details" style="display:none;">
                        <p>${details}</p> <!-- Additional details -->
                    </div>
                </div>
            </div>
        </div>
    `;
}


jasondata();
