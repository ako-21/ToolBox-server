const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    },
    virtuals: true
  }
})

userSchema.virtual('name').get(function () {
  const index = this.email.indexOf('@')
  return this.email.substring(0, index)
})

module.exports = mongoose.model('User', userSchema)
