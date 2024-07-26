import { NextApiRequest, NextApiResponse } from 'next';
import { encode_jwt } from './node_modules/npm_jwt_tllib';

const secret = process.env.JWT_SECRET || 'mysecret';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Simple authentication logic (replace with your own logic)
    if (username === 'user' && password === 'pass') {
      const token = encode_jwt(secret, username, { role: 'user' }, 3600);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};