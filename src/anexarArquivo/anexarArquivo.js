import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

import Api from '../api';
import './anexarArquivo.css'
import MenuLateral from '../home/menuLateral';

export default function AnexarArquivo (){
  const history = useHistory();
  const [userState, setUserState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [campoIntegrantes, setCampoIntegrantes] = useState([]);
  const [valueSelected, setValueSelected] = useState(0);
  const [mensagem, setMensagem] = useState(false);

//para verificar se há usuário logado
  useEffect(() => {
    Api.getUserState().then(user =>{
      if(user){
        setUserState(user);
      }else{
        setUserState(null);
      }
    })
  })
//Se não tiver usuário logado, irá redirecionar para o Login
  if(!userState){
    history.push('/');
   }
// salvar o Projeto criar pelo professor
  const handleSalvar = async () => {
    let aluno1 = "";
    let aluno2 = "";
    let aluno3 = "";
    let aluno4 = "";
    let aluno5 = "";
    const nomeTcc = document.getElementById('campoNomeTcc').value;
    const cursoTcc = document.getElementById('campoCursoTcc').value;
    const data = Date.now();
    const user = await Api.currentUser();
    const uid = user.uid;
    const email = user.email;

    if(nomeTcc === "" || cursoTcc === "" || valueSelected == '0' ){
      console.log("todos os campos são obrigatórios");
      setMensagem(true);
    }else{
      setLoading(true);    
      switch (valueSelected){
        case '1':
          aluno1 = document.getElementById('1').value;
          await Api.createProject(nomeTcc, cursoTcc, data, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5)
          history.push('/home');
          setLoading(false);
          break;

        case '2':
          aluno1 = document.getElementById('1').value;
          aluno2 = document.getElementById('2').value;
          await Api.createProject(nomeTcc, cursoTcc, data, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5)
          history.push('/home');
          setLoading(false);
          break;
        
        case '3':
          aluno1 = document.getElementById('1').value;
          aluno2 = document.getElementById('2').value;
          aluno3 = document.getElementById('3').value;
          await Api.createProject(nomeTcc, cursoTcc, data, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5)
          history.push('/home');
          setLoading(false);
          break;  
        
        case '4':
          aluno1 = document.getElementById('1').value;
          aluno2 = document.getElementById('2').value;
          aluno3 = document.getElementById('3').value;
          aluno4 = document.getElementById('4').value;
          await Api.createProject(nomeTcc, cursoTcc, data, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5)
          history.push('/home');
          setLoading(false);
          break;
          
        case '5':
          aluno1 = document.getElementById('1').value;
          aluno2 = document.getElementById('2').value;
          aluno3 = document.getElementById('3').value;
          aluno4 = document.getElementById('4').value;
          aluno5 = document.getElementById('5').value;
          await Api.createProject(nomeTcc, cursoTcc, data, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5)
          history.push('/home');
          setLoading(false);
          break; 

        default:
          console.log("error");
      }
    }
  }
//ao clicar em algum lugar da tela, irá esconder o menu do perfil
  function hideMessage(){   
    let mensagem = document.getElementById("balaoPerfil");
      mensagem.style.display = "none"; 
  }
//adicionar campos de acordo com a quantidade de integrantes
  const aplicarIntegrantes = async () => {
    setCampoIntegrantes([]);
    let select = document.getElementById("qtdIntegrantes");
    let value = select.options[select.selectedIndex].value
    
    for(let i = 0; i < value; i++){
      setCampoIntegrantes(prevArray => [...prevArray, <input type="text" className="camposTcc" id={i+1} placeholder={"E-mail do Integrante "+ (i+1)}/>])
    }

    setValueSelected(value);
  }
//Atualizar a tela para aparecer os novos campos de integrantes
  useEffect(() => {
  }, [campoIntegrantes])

  return(
    <body>
      <div id="conteudoAnexar" onClick={hideMessage}>
        <div id="cabecalhoConteudo">
            <div id="divHeaderEsquerda"></div>
            <div id="divMeuProjetos">Anexar Tcc</div>
            <div id="divPesquisar"></div> 
        </div>
        <article className="dadosTcc">
          <div className="perfilPainel" id="painelTcc">
            {mensagem && <p id="mensagemSalvar">todos os campos são obrigatórios!</p>}
            {loading && <ReactBootStrap.Spinner animation="border" id="loading"/>}
            <div id="campoNome">
              <input type="text" className="camposTcc" id="campoNomeTcc" placeholder="Título do Tcc"/>
            </div>
            <div id="campoNome">
              <input type="text" className="camposTcc" id="campoCursoTcc" placeholder="Curso"/>
            </div>
            <div id="divQtdIntegrantes">
                  <p>Quantidade de integrantes:</p>
                  <select id="qtdIntegrantes">
                    <option value="1" defaultValue className="opcao">1</option>
                    <option value="2" className="opcao">2</option>
                    <option value="3" className="opcao">3</option>
                    <option value="4" className="opcao">4</option>
                    <option value="5" className="opcao">5</option>
                  </select>
                  <button id="btnAplicar" onClick={aplicarIntegrantes}>Aplicar</button>
            </div>
            <div id="camposIntegrantes">
              {campoIntegrantes}
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