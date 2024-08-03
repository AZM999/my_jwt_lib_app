// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { validate_jwt, decode_jwt } from 'npm_jwt_tllib';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key'; // Ensure your secret key is loaded from environment variables

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token || !validate_jwt(token, SECRET_KEY)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Optionally, you can decode the JWT and add user info to the request
  try {
    const decoded = decode_jwt(token, SECRET_KEY);
    if (decoded) {
      // Attach user data to request if needed
      (request as any).user = decoded;
    }
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to all API routes
};
