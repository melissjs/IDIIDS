const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
  Query: {
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) return null
      return User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favorites',
        model: 'Post',
      })
    },

    getUser: () => null,

    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        })
      return posts
    }
  },

  Mutation: {
    addPost: async (_, { title, imageUrl, categories, description, creatorId }, { Post }) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save()
      return newPost
    },

    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error(`User already exists ${user._id}`)
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save()
      return { token: createToken(newUser, process.env.SECRET, '1hr') }
    },

    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error(`User not found`)
      }
      const authenticated = await bcrypt.compareSync(password, user.password)
      if (!authenticated) {
        throw new Error(`Invalid password`)
      }
      return { token: createToken(user, process.env.SECRET, '1hr') }
    },
  }
}