import { getUserInfo } from "../localStorage";


const Header = {
    render: () => {
        const { name } = getUserInfo();

        return `
          <div class="brand">
            <a href="/#/">jsamazona</a>
          </div>
          <div>
          ${
             name 
             
             ? `<a href="/#/profile" 
                       style="font-style: italic;
                       font-size: 1.6rem; 
                       color: #ec8816;">
                       ${name}
                </a>`
             :`<i class="fas fa-user"></i><a href="/#/signin">Log In</a>`
           }
           <i class="fas fa-shopping-cart"></i><a href="/#/cart">Cart</a>
          </div> 
        `;
    },
    after_render: () => {

    } 
};

export default Header;