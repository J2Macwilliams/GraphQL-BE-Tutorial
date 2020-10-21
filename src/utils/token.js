const jwt = require('jsonwebtoken');

const signToken = (user) => {
	const payload = {
		id: user.id,
	  username: user.username
	};
  
	const secret = process.env.JWT_SECRET;
  
	const options = {
	  expiresIn: "3h",
	};
  
	return jwt.sign(payload, secret, options); 
  }
  
module.exports = {signToken}