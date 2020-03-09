import { serialize } from 'cookie';

const COOKIE = "auth";
const TOKEN = "abcd1234";

export const generateAuthToken = (username) => {
  return TOKEN;
};

const authTokenIsValid = (token) => {
  return token === TOKEN;
};

export const setAuthCookie = (res, token) => {
  res.setHeader('Set-Cookie', serialize(COOKIE, token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 *8)
  }));
};

export const requireAuth = handler => (req, res) => {
  if (authTokenIsValid(req.cookies[COOKIE])) {
    return handler(req, res);
  } else {
    res.status(401).send({ err: "Unauthorized"});
  }
};
