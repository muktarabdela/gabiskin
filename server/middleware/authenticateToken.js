import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv';

dotenv.config();

async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ error: "You are not authorized" })
    }
    const token = authHeader.split(" ")[1];
    // console.log(token);
    // console.log(authHeader);
    try {
        const { email, password } = jwt.verify(token, process.env.JWT_KEY);
        req.user = { email, password }
        next()
    } catch (error) {
        return res.status(403).json({ error: "You are not authorized" })
    }

}
export default authenticateToken