import { generateAuthToken, setAuthCookie } from '../../utils/auth';

import USER from '../../data/user';

function credentialsAreValid(username, password) {
  return username === USER.username && password === USER.password;
}

export default (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    console.log("== req.body:", req.body);
    console.log("== received credentials:", username, password);
    if (credentialsAreValid(username, password)) {
      setAuthCookie(res, generateAuthToken(username));
      res.status(200).send({ msg: "OK!" });
    } else {
      res.status(401).send({
        err: "Invalid credentials"
      });
    }
  } else {
    res.status(405).send({
      err: "Only POSTs accepted"
    });
  }
};
