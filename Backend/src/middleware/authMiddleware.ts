import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Create a custom Request interface that includes our new property!
export interface AuthRequest extends Request {
  userId?: string;
}

// 2. Swap 'Request' for your new 'AuthRequest'
export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // 3. Tell TypeScript exactly what shape the decoded object is
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    
    // 4. Extract just the userId string from the decoded object!
    req.userId = decoded.userId; 

    next(); 
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};