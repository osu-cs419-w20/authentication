import { serialize } from 'cookie';

const COOKIE = "auth";
const TOKEN = "abcd1234";

const CSRF_COOKIE = "csrf";
const CSRF_TOKEN = "dcba4321";

export const generateAuthToken = (username) => {
  return TOKEN;
};

const generateCsrfToken = (authToken) => {
  return CSRF_TOKEN;
}

const authTokenIsValid = (token) => {
  return token === TOKEN;
};

const csrfTokenIsValid = (csrfToken, authToken) => {
  return csrfToken === CSRF_TOKEN;
};

export const setAuthCookie = (res, token) => {
  res.setHeader('Set-Cookie', [
    serialize(COOKIE, token, {
      path: '/',
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 *8)
    }),
    serialize(CSRF_COOKIE, generateCsrfToken(token), {
      path: '/',
      sameSite: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 *8)
    })
  ]);
};

export const clearAuthCookie = (res) => {
  res.setHeader('Set-Cookie', serialize(COOKIE, "", {
    path: '/',
    httpOnly: true,
    sameSite: true
  }));
};

export const requireAuth = handler => (req, res) => {
  const validAuth = authTokenIsValid(req.cookies[COOKIE]);
  const validCsrf = csrfTokenIsValid(
    req.headers['x-csrf-token'],
    req.cookies[COOKIE]
  );
  if (validAuth && validCsrf) {
    return handler(req, res);
  } else {
    res.status(401).send({ err: "Unauthorized"});
  }
};
