import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function Index() {
  const [ user, setUser ] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/user', {
        headers: {
          'x-csrf-token': Cookies.get('csrf')
        }
      });
      if (res.status === 401) {
        router.push(`/login?redirect=${router.asPath}`);
      } else {
        const body = await res.json();
        setUser(body);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={async () => {
        const res = await fetch('/api/logout');
        if (res.status === 200) {
          router.push(`/login?redirect=${router.asPath}`);
        }
      }}>
        Logout
      </button>
      {user.name && <p>Name: {user.name}</p>}
      {user.email && <p>Email: {user.email}</p>}
    </div>
  );
}

export default Index;
