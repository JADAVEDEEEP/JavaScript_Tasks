

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
            <div class="row d-flex align-items-center">
                <div class="col-md-5 col-sm-12 py-5 text-center">
                    <img class="image" src="${image}" width="300px" height="300px" style="object-fit: contain"/>
                </div>
                <div class="col-md-5 py-5">
                    <h4 class="text-uppercase fw-bolder">${title}</h4>
                     <h3 class="fw-normal">INR ${price}</h3>
                    <p class="lead text-muted">${rating.rate} <i class="fa fa-star"></i></p>
                   
                        <h6 class="fw-bolder fs-5 text-muted">${category}</h6>
                    <p class="lead mt-3 text-muted fs-6 fw-normal">${description}</p>
                
               
                    <button class="btn btn-light text-dark border border-dark" onclick="addToWishlist(${productId}, 'Product Title')">Add to Wishlist</button>
                   

                  <a href="AddToCart.html" class="btn btn-dark mx-3" 
                   onclick="handleAddToCart(event, ${productId}, '${title}', ${price})">Add To Cart</a>

                </div>
            </div>
        `;

        const detailsProduct = `
           <div>
    <div class="container mb-5 p-3">
        <div class="row p-3" style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); min-height: 500px; width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
            <div class="col-12 py-2" style="padding: 15px;">
                <h3 style="font-color: rgba(0, 0, 0, 0.1); font-size: 1.5rem;">Details</h3>
                <p class="text-muted" style="font-size: 1rem;margin-top:25px">${description}</p>
                <h3 style="color: #333; font-size: 1.5rem;margin-top:20px">Product Details</h3>
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom" style="border-bottom: 1px solid #ddd; font-size: 1rem;">
                    <span class="fs-6 ">Product Name</span>
                    <span>${title}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom" style="border-bottom: 1px solid #ddd; font-size: 1rem;">
                    <span class="fs-6">Product Rating</span>
                    <span>
                        <p class="lead " style="margin: 0; font-size: 1rem;">${rating.rate} <i class="fa fa-star" style="color: #ffcc00;"></i></p>
                    </span>
                </div>
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom" style="border-bottom: 1px solid #ddd; font-size: 1rem;">
                    <span class="fs-6">Product Price</span>
                    <span>
                        <p class="lead" style="margin: 0; font-size: 1rem;">${price} INR</p>
                    </span>
                </div>
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom" style="border-bottom: 1px solid #ddd; font-size: 1rem;">
                    <span class="fs-6">Product Category</span>
                    <span>
                        <p class="lead" style="margin: 0; font-size: 1rem;">${category}</p>
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
        let relatedProductsHTML = '<h3 class="mt-5">Related Products</h3><div class="row">';

        filteredProducts.map(product => {
            relatedProductsHTML += `

            <div class="mt-5 col-md-3 ms-3 me-5 mx-1 col-sm-6 mb-4">
         <div class="card bg-light" style="border:none">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" height="200px" style=" object-fit: contain;object-position: 50% 50%;">
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
function handleAddToCart(event, productId, title, price) {
    event.preventDefault(); 

  
    addToCart(productId, title, price);

    
    Swal.fire({
        title: 'Added to Cart',
        text: `${title} has been added to your cart. Redirecting...`,
        icon: 'success',
        timer: 5000, 
        showConfirmButton: false
    }).then(() => {
       
        setTimeout(() => {
            window.location.href = event.target.href; 
        }, 5000);
    });
}

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
}

/////////////////////////////////////////////////////////////////WISH LIST /////////////////////////////////////////////////////////////
function addToWishlist(productId, title) {
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    console.log("Current Wishlist:", wishlist); 

    
    const isAlreadyAdded = wishlist.some(product => product.id === productId);
    
    if (isAlreadyAdded) {
        Swal.fire({
            title: 'Already Added',
            text: `${title} is already in your wishlist!`,
            icon: 'info',
            timer: 3000,
            showConfirmButton: false
        });
    } else {
       
        wishlist.push({ id: productId, title: title });
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); 

        console.log("Updated Wishlist:", wishlist); 

        updateWishlistIcon();

        Swal.fire({
            title: 'Added to Wishlist',
            text: `${title} has been added to your wishlist!`,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
        });
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


document.addEventListener('DOMContentLoaded', () => {
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

        
        productContainer.innerHTML += `<h3>Reviews</h3>`;

      
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
        <div class=" mt-5 bg-light col-12 p-5 col-sm-6 col-md-4 mb-3">
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
