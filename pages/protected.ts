import { NextApiRequest, NextApiResponse } from 'next';
import { withJWT } from './lib/middleware';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is protected data' });
};

export default withJWT(handler);