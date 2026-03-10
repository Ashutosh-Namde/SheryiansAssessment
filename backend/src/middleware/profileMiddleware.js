const jwt = require("jsonwebtoken")

const profileMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log(req.cookies.token);

        if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  const decode = jwt.verify(token,process.env.JWTSECRET)
req.userId = decode.id;
console.log(decode);

        next();
        
    } catch (error) {
        return res.status(400).json({message:"error i middleware"})
    }
}

module.exports = profileMiddleware