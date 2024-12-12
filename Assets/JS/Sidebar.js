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
                                 style="height: 200px; width: 200px; object-fit: contain;object-position: 50% 50%; margin-bottom: 8px;">
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


