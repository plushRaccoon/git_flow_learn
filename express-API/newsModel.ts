const mongoose = require('mongoose');
const { Schema } = mongoose;
const newsSchema = new Schema({
  title: String,
  content: String,
  author: String,
});

module.exports = mongoose.model('News', newsSchema);
