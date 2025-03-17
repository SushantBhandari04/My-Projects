const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware =  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(411).json({
            message: "Token missing!"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded =  jwt.verify(token,JWT_SECRET);

        req.userId = decoded.userId;
        next();
    }
    catch(e){
        return res.status(403).json({
            message: "Error!"
        })
    }
}

module.exports = authMiddleware;