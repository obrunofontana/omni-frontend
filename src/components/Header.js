import React from 'react';
import {Link} from 'react-router-dom';//Preciso importar o link e colocar em redor do que eu quero que seja lincavel 

import './Header';
import './Header.css';
// import { Container } from './styles';
import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

export default function Header() {
  return (
    <header id="main-header">
        <div className="header-content">
            <Link to="/">
                <img src={logo} alt="InstaOmni"/>
            </Link>
            <Link to="/new">
                <img src={camera} alt="Enviar Publicação"/>
            </Link>
        </div>
    </header>
  );
}
