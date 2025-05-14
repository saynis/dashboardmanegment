import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'Error',
                message: 'Authentication required'
            });
        }

        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 'Error',
                    message: 'Invalid or expired token'
                });
            }
            
            req.user = decoded;
            next();
        });

    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Server error occurred'
        });
    }
}; 