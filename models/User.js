const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const md5 = require('md5')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Post',
  },
})

UserSchema.pre('save', function(next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
  next()
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

module.exports = mongoose.model('User', UserSchema)