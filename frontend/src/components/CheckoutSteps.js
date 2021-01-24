


const CheckoutSteps =   {

    render: (props) => {
        return ` 
          <div class="checkout-steps">
               <div class="${props.step1 ? 'active' : ''}">Login</div> 
               <div class="${props.step2 ? 'active' : ''}">Endereço</div> 
               <div class="${props.step3 ? 'active' : ''}">Pagamento</div> 
               <div class="${props.step4 ? 'active' : ''}">Fechar compra</div> 
          </div>

        `;
    }
};

export default CheckoutSteps;