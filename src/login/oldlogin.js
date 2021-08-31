import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';


import Api from '../api';
import './login.css';
import Globais from '../global'

export default function Login (){
  const [userState, setUserState] = useState(null);
  const [login, setLogin] = useState(true);
  const history = useHistory();
  const [mensagem, setMensagem] = useState(false);
  const [mensagemCadastro, setMensagemCadastro] = useState(false);

  if(userState){
   history.push('/home');
  }

  useEffect(() => {
    Api.getUserState().then(user =>{
      if(user){
        setUserState(user);
      }else{
        setUserState(null);
      }
    })
  })

  const handleLogin = async () => {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if(email === "" && senha === ""){
      setMensagem(true);
    }else{

      let result = await Api.loginAuth(email,senha);

      if(result){
        history.push('/home');
      }else{
        setMensagem(true);
      }
    }
  }
  
  useEffect(() => {
  }, [mensagem, mensagemCadastro])

  const handleCreateUser = async () => {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let nome = document.getElementById("nomeLogin").value;
    let tipo = document.getElementById('tipoLogin').value;
    let apelido = document.getElementById('apelidoLogin').value;
    let universidade = document.getElementById('universidadeLogin').value;

    if(email === "" || senha === "" || nome === "" || tipo === "" || apelido === "" || universidade === ""){
      setMensagemCadastro(true);
    }else{
      let result = await Api.createUser(email,senha, nome, tipo, apelido, universidade);
      if(result != ""){
        setMensagemCadastro(true);
      }
    }
  }

  const register = async () => {
    setLogin(false);
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    setMensagemCadastro(false);

  }

  const doLogin = async () => {
    setLogin(true);
    document.getElementById("email").value = "";
    document.getElementById("nomeLogin").value = "";
  }

  if(login){
    return(
      <>
        <div class="fundo">
          <div class="lateralEsquerdo">
            <h1 class="titulo">Sistema TCC</h1>
          </div>
          <div class="loginScreen">
            <div><h1>Login</h1></div>
            {mensagem && <p id="mensagemLogin">E-mail ou senha inválido!</p>}
            <div class="loginCampos">
              <input type="email" placeholder="E-mail" id="email"/>
              <input type="password" placeholder="Senha" id="senha"/>
            </div>
            <div>
              <button type="submit" onClick={handleLogin} class="buttonLogin">Entrar</button>
            </div>
              <Link>
                <a onClick={register} class="link">Crie o seu perfil</a>
              </Link>
          </div>
        </div>
      </>
    )
  }else{
    return(
      <>
        <div class="fundo">
          <div class="lateralEsquerdo">
            <h1 class="titulo">Sistema TCC</h1>
          </div>
          <div class="loginScreen">
            <div><h1>Cadastro</h1></div>
            {mensagemCadastro && <p id="mensagemCadastro">Dados inválidos!</p>}
            <div class="loginCampos">
              <input type="text" placeholder="Nome completo" id="nomeLogin"/>
              <input type="text" placeholder="Apelido" id="apelidoLogin"/>
              <input type="text" placeholder="Universidade" id="universidadeLogin"/>
              <input type="email" placeholder="E-mail" id="email"/>
              <input type="password" placeholder="Senha" id="senha"/>
            </div>
            <div>
                <select id="tipoLogin">
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                </select>
            </div>
            <div>
                <button type="submit" onClick={handleCreateUser} class="buttonLogin">Cadastrar</button>
            </div>
              <Link>
                <a onClick={doLogin} class="link">Já tem uma conta? Faça seu login</a>
              </Link>
          </div>
        </div>
      </>
    )
  }
}