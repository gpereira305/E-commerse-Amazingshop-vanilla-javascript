import {getUserInfo } from "../localStorage";


const Header = { 
  
  after_render: () => {  
    
  },

    render: () => {  
      const { name, isAdmin } = getUserInfo();  
    
        return `
        <div class="brand">
              <a href="/#/">Amazing <span style="color:#b64606;">Shop</span></a>
         </div>
            <div>
              ${
                name
                  ? `<a href="/#/profile">${name}`
                  : `<a href="/#/signin"><i class="fas fa-user"></i> Logar</a>` 
               }
               ${
                isAdmin ? `<a href="/#/dashboard">Admin</a>` : '' 
               } 
            <a href="/#/cart"><i class="fas fa-shopping-cart"></i> Carrinho</a>

      </div>
        `;
    }
  
};

export default Header; 