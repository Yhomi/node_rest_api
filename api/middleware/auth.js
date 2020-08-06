const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
  const token = req.header('auth-token')
  if(!token) return res.status(401).json({message:"Access denied"});
  try {
    const verified = jwt.verify(token,process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({error:"Invalid Token"})
  }
}

module.exports = auth;
