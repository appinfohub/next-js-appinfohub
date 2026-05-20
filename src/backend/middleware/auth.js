import jwt from 'jsonwebtoken';

export const verifyAdmin = (req) => {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return null;
    return decoded;
  } catch (err) {
    return null;
  }
};
