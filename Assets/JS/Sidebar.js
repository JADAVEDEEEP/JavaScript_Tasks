///////////////////////////////////////////////////////////////FOR FILTER PRODUCT BY CATEGORY/////////////////////////////////////////////////////

async function fetchAndDisplayProducts(category = '') {
    try {
        let url = '';
        if (category === 'men') {
            url = 'https://fakestoreapi.com/products/category/men%27s%20clothing';
        } else if (category === 'electronics') {
            url = 'https://fakestoreapi.com/products/category/electronics';
        } else if (category === 'jewelery') {
            url = 'https://fakestoreapi.com/products/category/jewelery';
        } else if (category === 'women') {
            url = 'https://fakestoreapi.com/products/category/women%27s%20clothing';
        } else {
            url = 'https://fakestoreapi.com/products';
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const products = await response.json();

        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = ''; 

        products.map(product => {
            const { id, title, image, price, rating } = product;

            const productCard = `
                <div class="col-lg-4 col-md-12 col-sm-4 p-4 mb-1 product" 
                     data-id="${id}" 
                     data-price="${price}" 
                     data-rating="${rating.rate}">
                    <div class="card h-103 d-flex align-items-center justify-content-center" 
                         id="card-${id}" 
                         style="width: 250px; height: 400px; border: none; background-color: #f8f9fa; text-align: center; margin: 0 auto;">
                        <div class="card-body d-flex flex-column align-items-center p-4 justify-content-center">
                            <img src="${image}" 
                                 alt="${title}" 
                                 style="height: 200px; width: 200px; object-fit: contain; margin-bottom: 8px;">
                            <h5 class="card-title p-2" 
                                style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                                ${title}
                            </h5>
                            <h5 class="card-title p-2" 
                                style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                                INR ${price}
                            </h5>
                            <button class="btn btn-dark mt-3" 
                                    onclick="window.location.href='OneProduct.html?id=${id}'"
                                    style="background-color: #343a40; border-color: #343a40;" alt="Loading....">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            `;
        
            productContainer.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById('submenu1').addEventListener('click', () => fetchAndDisplayProducts('jewelery'));
document.getElementById('submenu2').addEventListener('click', () => fetchAndDisplayProducts('men'));
document.getElementById('submenu3').addEventListener('click', () => fetchAndDisplayProducts('women'));
document.getElementById('submenu4').addEventListener('click', () => fetchAndDisplayProducts('electronics'));

fetchAndDisplayProducts();

/////////////////////////////////////////////////////////////////////// BY RATING FILTER///////////////////////////////////////////////////////////

document.getElementById("ratingFilter").addEventListener("change", function(event) {
    const selectedRating = event.target.value;
    filterProductsByRating(selectedRating);
});

function filterProductsByRating(rating) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productRating = parseFloat(product.getAttribute('data-rating'));
        if (rating === "0" || productRating >= rating) {
            product.style.display = "block"; 
        } else {
            product.style.display = "none"; 
        }
    });
}

/////////////////////////////////////////////////////////////////////// BY PRICE FILTER///////////////////////////////////////////////////////////

document.getElementById("priceFilter").addEventListener("change", function(event) {
    const selectedPriceRange = event.target.value;
    filterProductsByPrice(selectedPriceRange);
});

function filterProductsByPrice(priceRange) {
    const products = document.querySelectorAll('.product'); 
    products.forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));
        if (priceRange === "0") {
            product.style.display = "block";
        } else {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            if (productPrice >= minPrice && productPrice <= maxPrice) {
                product.style.display = "block"; 
            } else {
                product.style.display = "none"; 
            }
        }
    });
}



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
                    <img class="image" src="${image}" width="300px" height="300px" style="object-fit: contain" />
                </div>
                <div class="col-md-5 py-5">
                    <h4 class="text-uppercase text-muted">${title}</h4>
                    <h3 class="display-6 my-4">INR ${price}</h3>
                   
                    <p class="lead">${rating.rate} <i class="fa fa-star"></i></p>
                    
                    <p class="lead mt-3 text-muted">${description}</p>
                    
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
        <img src="${product.image}" class="card-img-top" alt="${product.title}" height="200px" style="object-fit: contain">
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
