const jwt = require("jsonwebtoken");
const { secrut } = require("../config/config");


module.exports = {
    auth: (req , res , next)=>{
        
        const token = req.cookies.token;

        if (!token) {
    
            return res.status(401).send({ message: 'Please login' });
    
        }
            try {
    
               const decoded =  jwt.verify(token, secrut);
               req.auth = decoded;
               next();
        
            } catch (err) {
        
                return res.status(400).send({ message: 'Authentication error!' });
        
            }
    }
}