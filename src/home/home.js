import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';

import Header from './header'
import './home.css'
import Api from '../api'
import CardTcc from './cardTcc';

export default function Home(){
  const [userState, setUserState] = useState(true);
  const history = useHistory();
  const [sucesso, setSucesso] = useState(false);

  const readImages = async (e) => {
    const file = e.target.files[0];
    const user = await Api.currentUser();
    const dataUsuario = await Api.dataUser(user.uid);

    const result = Api.getStorage(file, user, dataUsuario);
    setSucesso(true)
    setTimeout(function timeout() {
      setSucesso(false);
    }, 2000)

  }

  if(!userState){
   history.push('/');
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

  useEffect( async () => {
        const user = await Api.currentUser();
        if(user){
        const uid = user.uid;
        const dataUser = await Api.dataUser(uid);
        document.getElementById("img").src = dataUser.data().avatarPhoto;
        document.getElementById("nome").value = dataUser.data().nome;
        document.getElementById("curso").value = dataUser.data().curso;
        document.getElementById("campoSobre").value = dataUser.data().sobre;
        }
  })

  const saveProfile = async () => {
    const curso = document.getElementById("curso").value
    const sobre = document.getElementById("campoSobre").value
    const user = await Api.currentUser();
    const dataUser = await Api.dataUser(user.uid);
    const avatar = dataUser.data().avatarPhoto;

    if(user){
      const uid = user.uid;
      const result = await Api.editProfile(uid, curso, sobre, avatar);
      console.log(result);
      setSucesso(true)
      setTimeout(function timeout() {
      setSucesso(false);
      }, 2000)
    }
  }

  useEffect(() => {
  }, [sucesso])

  return(
    <>
      <Header/>
      <body class="corpo">
        <div class="ladoEsquerdo"></div>
        <article class="dadosPerfil">
          <div class="btnPainel">
            <div class="btnNavegacao">
              <Link to="/AnexarTcc" id="linkAnexar">
                <button type="submit" class="btnHome" id="anexar">Anexar TCC</button>
              </Link>
            </div>
            <div class="btnNavegacao">
              <button type="submit" class="btnHome" id="cronograma">Cronograma</button>
            </div>
          </div>
          <div class="perfilPainel">
            <div class="dadosCima">
              <div class="imagem">
                <img src="" id="btnBusca" alt="avatar" id="img"/>
              </div>
              <div class="campos">
                <div class="dadoCampo">
                 <input type="text" placeholder="Nome" id="campo" id="nome" readOnly={true}/>
                </div>
                <div class="dadoCampo">
                  <input type="text" placeholder="Curso" id="campo" id="curso"/>
                </div>
                <input  onChange={readImages} type="file" id="inputImage"/>
              </div>
            </div>
            <div class="sobre">
              <textarea placeholder="Sobre você" id="campoSobre"></textarea>
            </div>
            <div class="salvar">
              <button type="submit" id="btnSave" onClick={saveProfile}>salvar</button>
            </div>
            {sucesso && <p id="mensagem">Salvo com sucesso!</p>}
          </div>
          <CardTcc/>
        </article>
        <aside class="navegacao">
        </aside>
        <article>

        </article>
      </body>
    </>
  )
}