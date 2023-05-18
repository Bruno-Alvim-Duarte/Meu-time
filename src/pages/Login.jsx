import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginContext from '../context/LoginContext';

function Login() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

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
        login();
        navigate('/home');
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="key-input">
        Key:
      </label>
      <input
        type="text"
        name="key-input"
        id="key-input"
        onChange={ ({ target }) => setKey(target.value) }
        value={ key }
      />
      <button onClick={ handleSubmit }>
        Entrar
      </button>
    </div>
  );
}

export default Login;
