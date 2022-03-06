const { ApolloServer, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const fs = require('fs')

// import typedefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql")
const typeDefs = fs.readFileSync(filePath, "utf-8")
const resolvers = require("./resolvers")

// import mongoose models
const User = require('./models/User')
const Post = require('./models/Post')

// connect to database
// mongoose.connect('mongodb://127.0.0.1:27017/idiid')
mongoose.connect('mongodb://db:27017/idiid')
  .then(console.log('Connected to database successfully'))
  .catch(err => console.log('Error connecting to database', err))

  const getUser = async token => {
    if (token) {
      try {
        return jwt.verify(token, process.env.SECRET)
      } catch (err) {
        throw new AuthenticationError('Session has ended. Please login again.')
      }
    }
  }

// create opollo/graphql server
// with typedefs, resolvers and context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization
    const currentUser = await getUser(token)
    return {
      currentUser,
      User,
      Post,
    }
  }
})

server.listen(4000).then(({ url }) => {
  console.log(`Hey Melissa you are a badass. Server listening on ${url}`)
})
