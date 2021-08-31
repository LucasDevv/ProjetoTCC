import React from 'react'
import './header.css'
import search from '../images/search.png';
import exit from '../images/exit.png'
import Api from '../api'
import {Link, useHistory} from 'react-router-dom';

export default function Header(){ 
  const history = useHistory();

  const handleLogout = async () =>{
    Api.signOut();
    history.push('/');
  }

  return(
    <header>
      <Link to="/home" id="linkHome">
        <h1>Sistema TCC</h1>
      </Link>
      <div id="divBusca">
        <input type="text" id="txtBusca" placeholder="Buscar..."/>
        <img src={search} id="btnBusca" alt="Buscar"/>
      </div>
      <div id="logout"><img src={exit} id="btnLogout" alt="Sair" onClick={handleLogout}/></div>
    </header>
  )
}