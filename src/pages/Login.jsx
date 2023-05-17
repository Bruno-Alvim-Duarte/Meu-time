import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="key-input">
        Key:
      </label>
      <input type="text" name="key-input" id="key-input" />
      <button>
        Entrar
      </button>
    </div>
  );
}

export default Login;
