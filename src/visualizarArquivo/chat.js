import React, {useEffect, useRef}  from 'react';

import Api from '../api';
import Globais from '../global';
import './chat.css';
import ChatMessages from './chatMessages';

export default function Chat({chatMessage}){
  const scrollComentarios = useRef();

 const handleInputKeyUp = (e) => {
    if(e.keyCode == 13){
      handleSendClick();
    }
 }

  useEffect(() =>{
    if(scrollComentarios.current.scrollHeight > scrollComentarios.current.offsetHeight){
      scrollComentarios.current.scrollTop = scrollComentarios.current.scrollHeight - scrollComentarios.current.offsetHeight;
    }
  },[chatMessage])

 const handleSendClick = () => {
  const message = document.getElementById("messageArea").value
  if(message !== ""){
    Api.sendMessage(Globais.tccId, Globais.user, message, Globais.displayName);
    document.getElementById("messageArea").value = "";
  }
 }
  
  return(
    <>
      <div id="correcao">
        <div id="comentarios" ref={scrollComentarios}>
          {chatMessage.map((item)=>(
            <ChatMessages item={item}/>
          ))}
        </div>
        <div className="sendMessage">
          <textarea id="messageArea" className="sendArea" type="text" placeholder="Digite sua mensagem..." onKeyUp={handleInputKeyUp} autoComplete="off"></textarea>
          <button className="btnSendMessage" onClick={handleSendClick}>Enviar</button>
        </div>
      </div>
    </>
  )
}