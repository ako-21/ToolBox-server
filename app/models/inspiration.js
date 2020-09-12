const mongoose = require('mongoose')

const inspirationSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = inspirationSchema
