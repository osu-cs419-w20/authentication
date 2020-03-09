const TOKEN = "abcd1234";

export const generateAuthToken = (username) => {
  return TOKEN;
};

const authTokenIsValid = (token) => {
  return token === TOKEN;
};
