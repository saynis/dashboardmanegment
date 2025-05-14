import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const tokenGenerator = (user) => {
    return jwt.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "1d"  // Waxaan ka dhignay 1 day si userku wakhti ku filan u helo
    });
}; 