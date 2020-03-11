import { clearAuthCookie } from '../../utils/auth';

export default (req, res) => {
  clearAuthCookie(res);
  res.status(200).end();
};
