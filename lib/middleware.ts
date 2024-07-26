import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { validate_jwt } from './node_modules/npm_jwt_tllib';

const secret = process.env.JWT_SECRET || 'mysecret';

export function withJWT(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send('unauthorized');
    }

    const token = authHeader.split(' ')[1];

    if (!token || !validate_jwt(token, secret)) {
      return res.status(401).send('unauthorized');
    }

    return handler(req, res);
  };
}