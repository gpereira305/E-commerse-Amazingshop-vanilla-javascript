// import { hideLoading, showLoading, showMessage } from "../../utils"; 
import {getUserInfo, setPayment } from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps'



const PaymentScreen = {
    after_render: () => { 
        document.getElementById('payment-form')
        .addEventListener('submit', async(e) => {
            e.preventDefault();

            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({paymentMethod});
             document.location.hash = '/placeorder';
        });

    },

    render: () => {
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
   
        return `
           <div class="form-container">
           ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
              <form id="payment-form">
                  <ul class="form-items">
                      <li>
                         <h1>Formas de pagamanto</h1>
                      </li> 
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="cartão de crédito"
                                 value="Cartão de crédito"
                                 checked
                               />  
                               <label for="cartão de crédito">
                                   <h3 style="margin-left: 1rem">Cartão de crédito</h3>
                               </label>
                             </div>
                          </li>
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="cartão de débito"
                                 value="Cartão de débito" 
                               />  
                               <label for="cartão de débito">
                                   <h3 style="margin-left: 1rem">Cartão de débito</h3>
                               </label>
                             </div>
                          </li>
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="boleto"
                                 value="Boleto" 
                               />  
                               <label for="boleto">
                                   <h3 style="margin-left: 1rem">Boleto</h3>
                               </label>
                             </div>
                          </li>
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="Depósito bancário"
                                 value="depósito" 
                               />  
                               <label for="depósito">
                                   <h3 style="margin-left: 1rem">Depósito</h3>
                               </label>
                             </div>
                          </li>

                      <li>
                         <button type="submit" class="primary">Continuar</button> 
                      </li>  
                  </ul>
              </form>
           </div>        
        `;
    },
}


export default PaymentScreen;