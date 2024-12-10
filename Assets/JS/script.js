////////////////////////////////////////////////////////// SCROLLING CONTENT ////////////////////////////////////////////////////////////////
const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const scrollContainer = document.querySelector('.category-scroll-container');
   const card = document.getElementById('card')

  prevButton.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
  });

  nextButton.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
  });
  


  /////////////////////////////////////////////////////////////////////GET ALL PRODCUTS ////////////////////////////////////////////////////////

  async function fetchAndDisplayProducts() {
    try {
      
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        const products = await response.json();


        const productContainer = document.getElementById('productContainer');

        
        products.map(product => {
            const { id, title, image,price } = product;

          
            const productCard = `
         <div class="col-lg-4 col-md-6 col-sm-12 p-4 mb-1">
    <div class="card h-103 d-flex align-items-center justify-content-center" 
         id="card-${id}" 
         style="width: 250px; height: 400px; border: none; background-color: #f8f9fa; text-align: center; margin: 0 auto;">
        <div class="card-body d-flex flex-column align-items-center p-4 justify-content-center">
            <img src="${image}" 
                 alt="${title}" 
                 style="height: 100px; width: 200px; object-fit: contain; margin-bottom: 8px;">
            <h5 class="card-title p-2" 
                style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                ${title}
            </h5>
            <h5 class="card-title p-2" 
                style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                INR ${price}
            </h5>
            <a href="#" 
               class="btn btn-dark" 
               style="background-color: #343a40; border-color: #343a40;">
                Buy Now
            </a>
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
fetchAndDisplayProducts();

///////////////////////////////////////////////////////////////////GET API FOR THE DOSCOUNTS////////////////////////////////////////////////////////////
async function fetchAndDisplayCategory() {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8');
      const products = await response.json();
  
      const productContainer = document.getElementById('catrgoryContainer');
  
      products.map(product => {
        const { id, title, image, price } = product;
  
        
        const discountedPrice = (price * 0.5).toFixed(2);
  
        const productCard = `
          <div class="col-lg-4 col-md-6 col-sm-12 p-4 mb-1">
            <div class="card h-103 d-flex align-items-center justify-content-center" 
              id="card-${id}" 
              style="width: 250px; height: 400px; border: none; background-color: #f8f9fa; text-align: center; margin: 0 auto;">
              <div class="card-body d-flex flex-column align-items-center p-4 justify-content-center">
                <img src="${image}" 
                    alt="${title}" 
                    style="height: 100px; width: 200px; object-fit: contain; margin-bottom: 8px;">
                <h5 class="card-title p-2" 
                    style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                    ${title}
                </h5>
                <h5 class="card-title p-2" 
                    style="font-size: 0.9rem; font-weight: bold; margin-bottom: 6px;">
                    <s style="color: red;">INR ${price}</s> INR ${discountedPrice}
                </h5>
                <a href="#" 
                  class="btn btn-dark " 
                  style="background-color: #343a40; border-color: #343a40;">
                    Buy Now
                </a>
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
  
  fetchAndDisplayCategory();
  


