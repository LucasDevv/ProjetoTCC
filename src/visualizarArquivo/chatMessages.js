import React, {useState, useEffect}  from 'react';

import Api from '../api';
import Globais from '../global';
import './chat.css';

export default function ChatMessages({item}){
  const [time, setTime] = useState('');

  useEffect(() =>{
      let d = new Date(item.date * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? '0' +hours : hours;
      minutes = minutes < 10 ? '0' +minutes : minutes;
      setTime(hours+':'+minutes);
  },[item])

  return(
    <div className="divMensagem">
        <div className={Globais.user === item.author ? "direitaMensagem" : "esquerdaMensagem"} key={item.author}>
          <div className="displayName">{item.displayName}</div>
          <div className="messageText">{item.text}</div>
          <div className="messageDate">{time}</div>
        </div>
    </div>
  )
}