import { Link } from 'react-router-dom';
import React from 'react';
import forbidden from '../assets/styles/forbidden.module.css';

function Forbidden() {
  return (
    <div className={forbidden['body-forbidden']}>
      <div className={forbidden.container}>
        <h1>Désolé, vous n'avez pas accès à cette page.</h1>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

export default Forbidden;
