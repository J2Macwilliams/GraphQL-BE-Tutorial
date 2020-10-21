const {signToken} = require('../utils/token');
const bcrypt = require('bcryptjs')

const resolvers ={
  Mutation: {
    signUp: async (parent, {username, password}, {prisma} ,info) => {
      const found = await prisma.user({username})
      if(!found){
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.createUser({
          username,
          password: hashedPassword
        })
        const token = signToken(user)
        return {token, user}
      }
      else{
        return {
          message: `${username} is already in the DB!`
        }
      }
    }
  },
  UserRegResult: {
    __resolveType(obj, ctx, info) {
      if (obj.token) {
        return 'SignUpResponse';
      }
      if (obj.message) {
        return 'UserFoundError';
      }
      return null;
    }
  }

}

module.exports =resolvers
