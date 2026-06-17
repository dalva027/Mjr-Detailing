import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-in-production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';

if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET)
) {
  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in production');
}

export const ACCESS_EXPIRES_IN = '15m';
export const REFRESH_EXPIRES_IN = '7d';

export interface AdminPayload {
  id: string;
  email: string;
}

export function signAccessToken(payload: AdminPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    algorithm: 'HS256',
    expiresIn: ACCESS_EXPIRES_IN,
    subject: payload.id,
    issuer: 'admin-dashboard',
  });
}

export function signRefreshToken(id: string): string {
  return jwt.sign({ id }, REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: REFRESH_EXPIRES_IN,
    subject: id,
    issuer: 'admin-dashboard',
  });
}

export function verifyAccessToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET, {
      algorithms: ['HS256'],
      issuer: 'admin-dashboard',
    }) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): { id: string } | null {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET, {
      algorithms: ['HS256'],
      issuer: 'admin-dashboard',
    }) as { id: string };
    return decoded;
  } catch {
    return null;
  }
}
