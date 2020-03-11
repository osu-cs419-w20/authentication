import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    console.log("== Logging in with these credentials:", username, password);
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await res.json();
    if (res.status === 200) {
      console.log("== Successful login, document.cookie:", document.cookie);
      router.push(router.query.redirect || '/');
    } else {
      alert("Error: " + body.err);
    }
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
