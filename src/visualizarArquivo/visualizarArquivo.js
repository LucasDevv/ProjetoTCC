import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

import Api from '../api';
import MenuLateral from '../home/menuLateral';
import './visualizarArquivo.css';
import '../home/newHome';
import Chat from './chat';
import Globais from '../global';

export default function VisualizarArquivo (){
  const [userState, setUserState] = useState(true);
  const [fileState, setFileState] = useState();
  const [linkFile, setLinkfile] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [chatMessage, setChatMessage] = useState([]);

  if(Globais.tccId === ''){
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
  },[])

  if(!userState){
    history.push('/');
   }

  useEffect(() => {
    if(Globais.tccId !== ''){
      const getTcc = async () => {
        const link = await Api.getLinkTcc(Globais.tccId);
        setLinkfile(link);
      }
      getTcc();
    }
  }, [])

  useEffect(() => {
    if(Globais.tccId !== ''){
      let unsub = Api.onChatMessage(Globais.tccId, setChatMessage );
      return unsub;
    }
  },[])

  const readImages = async (e) => {
    const arquivo = e.target.files[0];
    setFileState(arquivo);
  }

  const anexarProjeto = async () => {
    const file = fileState;
    if(file != null){
      setLoading(true);  
      let link = await Api.setFile(Globais.tccId, file);
      setLoading(false);
      setLinkfile(link);
    }
  }

  function hideMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
      mensagem.style.display = "none"; 
  }

  return(
    <body> 
        <MenuLateral/>
        <div id="cabecalhoConteudo" onClick={hideMessage}>
            <div id="divHeaderEsquerda"></div>
            <div id="divMeuProjetos">{Globais.nomeTcc}</div>
            <div id="divPesquisar"></div>
        </div>
        <div id="conteudoProjeto" onClick={hideMessage}>
          <div id="anexarArquivo">
            <button id="btnAnexarTcc" onClick={anexarProjeto}>Anexar Tcc</button>
            <input type="file" accept="application/pdf" name="Tcc" id="arquivoTcc" onChange={readImages}/>
            {loading && <ReactBootStrap.Spinner animation="border" id="loading"/>}
          </div>
          <div id="conteudocorrecao" onClick={hideMessage}>
            <div id="arquvio">
              {!linkFile && <p id="mensagemCadastro">Não há PDF nesse projeto!</p>}
              <a href={linkFile} target="_blank">{Globais.nomeTcc}.pdf</a>
              <iframe src={linkFile} style={{width: "100%", height: "100%", border: "none"}}></iframe>
            </div>
            <Chat chatMessage={chatMessage}/>
          </div>
        </div>
    </body>
  )
} 