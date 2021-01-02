import { getProduct } from '../api';
import {parseRequestUrl} from '../utils';
import Ratings from '../components/Ratings';


const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('add-button').addEventListener('click',() => {
            document.location.hash = `/cart/${request.id}`; 
        })
    },

    render: async () => {
         const request = parseRequestUrl();
         const product = await getProduct(request.id);
         if(product.error){
            return `<h2>${product.error}</h2>`;  
         }
         return `
            <div class="content">
               <div class="back-to-result">
                  <a href="/#/">
                    <h3 style="margin-bottom: 1rem;">
                        <i class="fas fa-arrow-left"></i> 
                         Voltar
                    </h3>
                  </a>
               </div>

               <div class="details">
                  <div class="details-image">
                     <img src="${product.image}" alt="${product.name}"/>
                  </div>

                  <div class="details-info">
                     <ul>
                        <li>
                           <h1>${product.name}</h1>
                        </li>
                        <li>
                           ${Ratings.render({
                               value: product.rating,
                               text: `${product.numReviews} reviews`,
                           })}
                        </li>
                        <li>
                          <h1>Por apenas R$ ${product.price}</h1>
                        </li>
                        <li>
                          Description:
                          <div>
                              ${product.description}
                          </div>
                        </li>
                     </ul>
                  </div>

                  <div class="details-action">
                     <ul>
                       <li>
                          <h3>Preço: R$ ${product.price}</h3>
                       </li>
                       <li> 
                          ${
                             product.countInStock > 0 ?
                            `<span class="success"><i class="fas fa-check"></i> Disponível</span>` :
                            `<span class="error"><i class="fas fa-times"></i> Indisponível</span>`
                           }
                       </li>
                       <li>
                          <button class="fw primary" id="add-button">
                               Add to cart
                          </button>
                       </li>
                     </ul>
                  </div>
               </div>
            </div>
         `;  
    },

};

export default ProductScreen;