import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';

import './home.css';
import Api from '../api';
import MenuLateral from './menuLateral';
import Globais from '../global';

export default function Home(){
  const [userState, setUserState] = useState(true);
  const history = useHistory();
  //const [sucesso, setSucesso] = useState(false);
  const [list, setList] = useState([]);

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

  //Pegar os Tccs que contem o usuario atual incluido
  useEffect(() => {
      const getTcc = async () => {
        const user = await Api.getUserState();
        if(user != null){
          const email = user.email
          const Tccs = await Api.getTcc(email);
          setList(Tccs);
        }
      }
      getTcc();

  }, [])

  //Esconder Menu de balão
  function hideMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
      mensagem.style.display = "none"; 
  }

  const abrirTcc = async (idTcc, nomeTcc) => {
    Globais.tccId=idTcc;
    Globais.nomeTcc = nomeTcc
    history.push('/visualizarTcc');
  }

  return(
    <>
      <body className="corpo">
        <MenuLateral/>
        <section className="conteudo" onClick={hideMessage}>
          <div id="cabecalhoConteudo">
            <div id="divHeaderEsquerda"></div>
            <div id="divMeuProjetos">Meus Projetos</div>
            <div id="divPesquisar"></div>
          </div>
          <div id="conteudoProjetos">
            {list.map((item)=>(
              <div id="cardProjeto" onClick={() => abrirTcc(item.idTcc, item.nomeTcc)} key={item.idTcc}>
                <div id="card" key={item.idTcc}></div>
                <div id="infoCard">
                  <div>{item.nomeTcc}</div>
                  <div>{item.cursoTcc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </body>
    </>
  )
}