import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';

import './menuLateral.css';
import Api from '../api';
import Globais from '../global';

export default function MenuLateral(){
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState([]);
  const [userState, setUserState] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async () => {
    if(userState){
      const getUser = async () => {
        const user = await Api.getUserState();
        if(user){
          const uid = user.uid;
          const dataUser = await Api.dataUser(uid);
          setUserCurrent({
            avatarPhoto: dataUser.data().avatarPhoto,
            apelido: dataUser.data().apelido,
            universidade: dataUser.data().universidade,
            tipoUsuario: dataUser.data().tipoUsuario
          });
          Globais.user = uid;
          Globais.displayName = userCurrent.apelido;
          if(userCurrent.avatarPhoto != null){
            document.getElementById("avatarMenu").src = userCurrent.avatarPhoto;
            document.getElementById("nomeMenu").innerHTML = userCurrent.apelido;
            document.getElementById("instituicaoMenu").innerHTML = userCurrent.universidade;
            setUserState(false)
          }
        }
      }
      await getUser();
  }
  });

  const handleLogout = async () =>{
    Api.signOut();
    history.push('/');
  }

  //Mostrar Menu de balão
  function showMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
    mensagem.style.display = "block"; 
  }

  //Esconder Menu de balão
  function hideMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
      mensagem.style.display = "none"; 
  }

  return(
    <>
      <nav id="menu">
          <div id="perfilMenu">
            <div><img src="https://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg" alt="avatar" id="avatarMenu" onClick={showMessage}/></div>
            <div id="dadosAvatar">
              <div id="nomeMenu"></div>
              <div id="instituicaoMenu"></div>

              <div id="balaoPerfil" style={{display: "none"}}>
                <Link to="/perfil" style={{ textDecoration: 'none', color: 'black' }}>
                  <div className="selectBalao" id="selectCima">Perfil</div>
                </Link>
                <div className="selectBalao" id="selectBaixo" onClick={handleLogout}>Sair</div>
              </div>
            </div>
          </div>
          <div id="conteudoNav" onClick={hideMessage}>
            <Link to="/perfil" style={{ textDecoration: 'none', color: 'black' }}>
              <div className="buttonMenu">Perfil</div>
            </Link>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
              <div className="buttonMenu">Meus projetos</div>
            </Link>
            <Link to="/AnexarTcc" style={{ textDecoration: 'none', color: 'black' }}>
              <div className="buttonMenu" style={userCurrent.tipoUsuario === 'professor' ? {display:'flex'} : {display:'none'}}>Anexar Tcc</div>
            </Link>
            <div id="bordaFinal"></div>
          </div>
      </nav>
    </>
  )
}