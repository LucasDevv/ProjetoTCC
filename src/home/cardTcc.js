import React, {useState, useEffect}  from 'react';

import './cardTcc.css';
import Api from '../api'
import VisualizarArquivo from '../visualizarArquivo/visualizarArquivo';

export default function CardTcc(){
  const [list, setList] = useState([]);

  useEffect(() => {
    const getTcc = async () => {
      const user = await Api.getUserState();
      const uid = user.uid
      const Tccs = await Api.getTcc(uid);
      setList(Tccs);
    }
    getTcc();
  }, [])

  return(
    <>
      <div id="cardsPainel">
        <div id="titulo">
          <h3 id="tituloTcc" >Meus TCC's</h3>
        </div>
        {list.map((item)=>(
          <div id="card" key={item.idTcc}>
            <div id="dadoNomeTcc">
              <p id="cursoTcc">Nome: {item.nomeTcc}</p>
            </div>
            <div id="dadosTcc">
              <div class="divCurso">
                <h4 id="nomeTcc">Curso:</h4>
                <p>{item.cursoTcc}</p>
              </div>
              <div class="divCurso">
                <h4 id="dataTcc">DataUpload:</h4>
                <p>11/05/2021</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}