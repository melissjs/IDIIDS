const { ApolloServer } = require("apollo-server")
const mongoose = require('mongoose')
const fs = require("fs")
const path = require("path")

// import typedefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql")
const typeDefs = fs.readFileSync(filePath, "utf-8")
const resolvers = require("./resolvers")

// import mongoose models
const User = require('./models/User')
const Post = require('./models/Post')

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/idiid')
  .then(console.log('Connected to database successfully'))
  .catch(err => console.log('Error connecting to databse', err))

// create opollo/graphql server
// with typedefs, resolvers and context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  }
})

server.listen(4000).then(({ url }) => {
  console.log(`Hey Melissa you are a badass. Server listening on ${url}`)
})
