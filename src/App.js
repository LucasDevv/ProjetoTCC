import React, {useState, useEffect}  from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Globais from './global';
import Api from './api';
import Login from './login/login';
import Home from './home/home';
import AnexarTcc from './anexarArquivo/anexarArquivo';
import VisualizarArquivo from './visualizarArquivo/visualizarArquivo';
import Perfil from './perfil/perfil';
import MenuLateral from './home/menuLateral';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
              <Login />
          </Route>
          <Route path="/home">
              <Home />
          </Route>
          <Route path="/AnexarTcc">
              <MenuLateral/>
              <AnexarTcc />
          </Route>
          <Route path="/visualizarTcc">
              <VisualizarArquivo/>
          </Route>
          <Route path="/perfil">
              <Perfil/>
          </Route>
        </Switch>
      </BrowserRouter>
    </> 
  )
}

export default App;
