import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Accept', 'application/json');
    // myHeaders.append('mode', 'no-cors');
    myHeaders.append('x-rapidapi-key', key);
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    // myHeaders.append(
    //   'Access-Control-Allow-Headers',
    //   'Access-Control-Allow-Headers, Content-Type, x-rapidapi-key, mode, Accept',
    // );

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
