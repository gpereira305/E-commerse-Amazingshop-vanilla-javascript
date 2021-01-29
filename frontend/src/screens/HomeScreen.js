import Ratings from '../components/Ratings'; 
import { getProducts } from '../api';

const HomeScreen = { 
    render: async () => {

      const products = await getProducts();
      if(products.error){
        return `<div class="error">${products.error}</div>`
      }


        return ` 
        <ul class="products">
        <div class="main-banner">
            <img src="/images/product-0.jpg" alt="banner"/>
        </div>

        ${products
          .map(
            (product) => `  
                  <li>
                    <div class="product"> 
                                    
                          <a href="/#/product/${product._id}">  
                            <img src="${product.image}" alt="${product.name}"/>
                          </a>  
                        <div class="product-name">
                              <p>
                                ${product.name}
                              </p> 
                         </div> 

                          <div class="product-rating">
                              ${Ratings.render({
                                  value: product.rating,
                                 text: `${product.numReviews} reviews`,
                              })}
                          </div>

                          <div class="product-brand">
                               ${product.brand}
                          </div>

                          <div class="product-price">
                               R$ ${product.price} à vista
                          </div>

                      <div class="payment-option">
                          <p style="margin-bottom: 1rem; color: #44bd32;"">Ou em 6x sem juros</p>
                      </div>   
                      </div>
                  </li>  
         `).join('\n')}
      `;
    } 
};


export default HomeScreen;