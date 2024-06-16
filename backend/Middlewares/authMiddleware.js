const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
        {
            next("Not authorized, token failed")
        }

        const token = authHeader.split(" ")[1];
        try {
            console.log("token",token)
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("payload",payload)
            req.body.user= {userId : payload.id};
            console.log("userAuth",req.body.user)
            next();
        } catch (error) {
            next("auth error ")
            
        }





}
module.exports= userAuth;