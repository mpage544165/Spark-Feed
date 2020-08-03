var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    content: {
        type: String,
        required: true
    }
  });

  const Article = mongoose.model('Article', articleSchema);

  module.exports = Article;