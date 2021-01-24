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
            ${products.map(product => `
               <li class="product-showcase">

                  <div class="product">
                     <a href="/#/product/${product._id}">
                        <img src="${product.image}" alt="${product.name}"/>
                     </a>
                   <div class="product-info-list" style="padding: 0 .7rem;">
                   <div class="product-name">
                     <a href="/#/product/1">
                          ${product.name}
                     </a>
                 
                     <div class="product-ratings style="color: #ffc000;">
                        ${Ratings.render({
                          value: product.rating,
                          text: `${product.numReviews} avaliações`
                        })}
                     </div>

                      <div class="product-brand">
                          ${product.brand}
                      </div>

                      <div class="product-price">
                          R$ ${product.price} à vista
                      </div>
                      <div class="payment-option">
                          <p style="margin-bottom: 1rem;">Ou em 6x sem juros</p>
                      </div> 
                      <div style="color: green;">
                          <p style="margin-bottom: 1rem;">Frete grátis acima de R$ 100.00</p>
                      </div> 
                    </div> 
                </div>
               </li> 
            `).join('\n')}
          </ul> 
        `;
    } 
};


export default HomeScreen;