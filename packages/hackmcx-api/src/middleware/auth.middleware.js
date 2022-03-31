import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    try{
        const token = req.headers['authorization']?.split(' ')[1];
        if (token == null){
            return res.sendStatus(401);
        }
        const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        req.user = decoded.user;
    }catch (err){
        return res.sendStatus(401) // Should be a 403, but we can change that later... (AC issues)
    }

    next();
}
