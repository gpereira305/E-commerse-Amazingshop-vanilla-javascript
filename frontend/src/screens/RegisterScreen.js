import { hideLoading, redirectUser, showLoading, showMessage } from "../../utils";
import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const RegisterScreen = {
    after_render: () => {
        document.getElementById('register-form')
        .addEventListener('submit', async(e) => {

            e.preventDefault();
            showLoading();

            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();

            if(data.error){
                showMessage(data.error);

            }else{
                setUserInfo(data);
                redirectUser();
            }
        });

    },

    render: () => {
        if(getUserInfo().name){
            redirectUser();
        }

        return `
           <div class="form-container">
              <form id="register-form">
                  <ul class="form-items">
                      <li>
                         <h1>Criar conta</h1>
                      </li>
                      <li>
                         <label for="name">Nome</label>
                         <input type="name name="name" id="name" required/>
                      </li>
                      <li>
                         <label for="email">Email</label>
                         <input type="email name="email" id="email" required/>
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
                         <label for="repassword">Confirmar senha</label>
                         <input 
                           type="password
                           name="repassword" 
                           id="repassword" 
                           minlength="6"
                           required
                         />
                      </li>
                      <li>
                         <button type="submit" class="primary">Registrar</button> 
                      </li>

                       <li>
                          <div>
                            Já tem conta?
                            <a href="/#/signin">Log in</a>
                          </div>
                       </li>
                  </ul>
              </form>
           </div>        
        `;
    },
}


export default RegisterScreen;