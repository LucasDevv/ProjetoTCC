import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

import Api from '../api';
import './perfil.css';
import MenuLateral from '../home/menuLateral';

export default function Perfil (){
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState([]);
  const [userState, setUserState] = useState(true);
  const [fileState, setFileState] = useState();
  const [mensagem, setMensagem] = useState(false);
  const [saved, setSaved] = useState(true);


  useEffect(() => {
    Api.getUserState().then(user =>{
      if(user){
        setUserState(user);
      }else{
        setUserState(null);
      }
    })
  })

  if(!userState){
    history.push('/');
   }

  function hideMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
      mensagem.style.display = "none"; 
  }

  const handleSalvar = async () => {
    if(document.getElementById("campoNomeTcc").value === "" || document.getElementById("campoCursoTcc").value === ""){
      setMensagem(true);
    }else{
      setLoading(true);
      const nome = document.getElementById("campoNomeTcc").value;
      const universidade = document.getElementById("campoCursoTcc").value;
      setUserCurrent({
        apelido: nome,
        universidade: universidade
      });
      if(fileState != null){
        await Api.editProfile(userCurrent.uid, universidade, nome, fileState);
      }else{
        await Api.editProfileWithoutFile(userCurrent.uid, universidade, nome);
      }
      setLoading(false);
      setSaved(true)
    }
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async () => {
    if(saved){
      const getUser = async () => {
        const user = await Api.getUserState();
        if(user){
          const uid = user.uid;
          const dataUser = await Api.dataUser(uid);
          setUserCurrent({
            uid: uid,
            avatarPhoto: dataUser.data().avatarPhoto,
            apelido: dataUser.data().apelido,
            universidade: dataUser.data().universidade,
            tipoUsuario: dataUser.data().tipoUsuario
          });
          if(userCurrent.avatarPhoto != null){
            document.getElementById("avatarPerfil").src = userCurrent.avatarPhoto;
            document.getElementById("campoNomeTcc").value = userCurrent.apelido;
            document.getElementById("campoCursoTcc").value = userCurrent.universidade;
            document.getElementById("avatarMenu").src = userCurrent.avatarPhoto;
            document.getElementById("nomeMenu").innerHTML = userCurrent.apelido;
            document.getElementById("instituicaoMenu").innerHTML = userCurrent.universidade;
            setSaved(false)
          }
        }
      }
      await getUser();
  }
  });

  const readImages = async (e) => {
    const arquivo = e.target.files[0];
    setFileState(arquivo);
  }

  return(
    <body>
      <MenuLateral/>
      <div id="conteudoAnexar" onClick={hideMessage}>
        <div id="cabecalhoConteudo">
            <div id="divHeaderEsquerda"></div>
            <div id="divMeuProjetos">Perfil</div>
            <div id="divPesquisar"></div> 
        </div>
        <article className="dadosTcc">
          <div className="perfilPainel" id="painelTcc">
            {mensagem && <p id="mensagemSalvar">Nenhum campo pode estar vazio!</p>}
            {loading && <ReactBootStrap.Spinner animation="border" id="loading"/>}
            <div id="imgPerfil">
              <img src="https://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg" alt="avatar" id="avatarPerfil"/>
              <input type="file" name="Avatar" id="arquivoAvatar" onChange={readImages}/>
            </div>
            <div id="campoNome">
              <input type="text" className="camposTcc" id="campoNomeTcc" placeholder="Nome"/>
            </div>
            <div id="campoNome">
              <input type="text" className="camposTcc" id="campoCursoTcc" placeholder="Universidade"/>
            </div>
            <div id="btnAnexar">
            <button type="submit" id="btnSalvar" onClick={handleSalvar} >salvar</button>
            </div>
          </div>
        </article>
      </div>
    </body>
  );
}