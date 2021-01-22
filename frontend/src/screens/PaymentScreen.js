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
                         <h1>Forma de pagamanto</h1>
                      </li> 
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="paypal"
                                 value="Paypal"
                                 checked
                               />  
                               <label for="paypal">
                                   <h3 style="margin-left: 1rem">Paypal</h3>
                               </label>
                           </div>
                         </li>
                       <li>
                           <div style="display: flex">
                               <input 
                                 type="radio"
                                 name="payment-method"
                                 id="stripe"
                                 value="Stripe" 
                               />
                               <label for="stripe">
                                      <h3 style="margin-left: 1rem">Stripe</h3>
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