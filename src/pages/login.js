import React, { useState } from 'react';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("== Logging in with these credentials:", username, password);
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default Login;
