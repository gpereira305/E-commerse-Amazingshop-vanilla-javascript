// import { hideLoading, showLoading, showMessage } from "../../utils"; 
import {getShipping, getUserInfo, setShipping } from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps'



const ShippingScreen = {
    after_render: () => { 
        document.getElementById('shipping-form')
        .addEventListener('submit', async(e) => {
            e.preventDefault();

            setShipping({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            });

             document.location.hash = '/payment'
        });

    },

    render: () => {
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
       
        const {address, city, postalCode, country} = getShipping();

        return ` 
        
           <div class="form-container">
           ${CheckoutSteps.render({ step1: true, step2: true })}
              <form id="shipping-form">
                  <ul class="form-items">
                      <li>
                         <h1>Frete</h1>
                      </li>
                      <li>
                         <label for="address">Endereço</label>
                         <input type="text name="address" id="address" value="${address}" required/>
                      </li> 
                      <li>
                         <label for="city">Cidade</label>
                         <input type="text name="city" id="city" value="${city}" required/>
                      </li> 
                      <li>
                         <label for="postalCode">CEP</label>
                         <input type="text name="postalCode" id="postalCode" value="${postalCode}" required/>
                      </li> 
                      <li>
                         <label for="country">Estado</label>
                         <input type="text name="country" id="country" value="${country}" required/>
                      </li> 
                      <li>
                         <button type="submit" class="primary">Continuar</button> 
                      </li>  
                  </ul>
              </form>
           </div>        
        `;
    }
}


export default ShippingScreen;