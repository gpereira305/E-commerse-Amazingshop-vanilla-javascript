import Ratings from '../components/Ratings';
import axios from "axios";
import { parseRequestUrl } from '../../utils';

const HomeScreen = { 
    render: async () => {

        const response = await axios({
          url: 'http://localhost:5000/api/products',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(!response || response.statusText !== 'OK'){
          return `<h2>Error in getting data</h2>`;

        }
        const products = response.data; 


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
                    </div> 
                </div>
               </li> 
            `).join('\n')}
          </ul> 
        `;
    } 
};


export default HomeScreen;