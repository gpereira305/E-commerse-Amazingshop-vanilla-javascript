import { hideLoading, showLoading, showMessage } from "../../utils";
import { getMyOrders, update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button')
        .addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';

        });

        document.getElementById('profile-form')
        .addEventListener('submit', async(e) => {

            e.preventDefault();
            showLoading();

            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();

            if(data.error){
                showMessage(data.error);

            }else{
                setUserInfo(data);
                document.location.hash = '/';
            }
        });

    },

    render: async() => {
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
        
        const orders = await getMyOrders();

        return `

        <div class="profile">
           <div class="profile-info">

            <div class="form-container">
                <form id="profile-form">
                    <ul class="form-items">
                        <li>
                            <h1>Editar Perfil</h1>
                        </li>
                        <li>
                            <label for="name">Nome</label>
                            <input type="name name="name" id="name" value="${name}" required/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email name="email" id="email" value="${email}" required/>
                        </li>
                        <li>
                            <label for="password">Senha</label>
                            <input 
                              type="password 
                              name="password" 
                              id="password" 
                              minlength="6"
                              required
                            />
                        </li>  
                        <li>
                            <button type="submit" class="primary">Atualizar</button> 
                        </li> 
                        <li>
                            <button type="button" id="signout-button">Sair</button> 
                        </li> 
                    </ul>
                </form>

                <div class="purchase-history">
                    <h3>
                       <i class="fas fa-history"></i>
                        <a href="/#/mylistorder">Ver histórico de compras</a>
                    </h3>
                </div>

                </div> 
           </div>

    
        </div>
       
        `;
    },
}


export default ProfileScreen; 