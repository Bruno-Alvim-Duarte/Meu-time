import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginContext from '../context/LoginContext';
import '../styles/Login.css';

function Login() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  const myHeaders = new Headers();
  myHeaders.append('x-rapidapi-key', key);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const handleSubmit = () => {
    fetch('https://v3.football.api-sports.io/status', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors.token) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Chave inválida',
          });
        }
        login(key);
        navigate('/home');
      })
      .catch((error) => console.log('error', error));
    // login(key);
    // navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-page__header">Login</h1>
        <label htmlFor="key-input">
          Insira sua API Key:
        </label>
        <input
          type="text"
          name="key-input"
          id="key-input"
          className="login-page__text-field"
          onChange={ ({ target }) => setKey(target.value) }
          value={ key }
        />
        <button className="login-page__btn" onClick={ handleSubmit }>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
