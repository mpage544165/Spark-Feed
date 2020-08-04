var mongoose = require('mongoose');
var parser = require('article-parser');
var Article = require('../models/article'); //mongoose.model('Article');
var lda = require('lda');

module.exports.saveArticle = (req, res) => {

    parser.setSanitizeHtmlOptions({
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5',
            'u', 'b', 'i', 'em', 'strong',
            'div', 'span', 'p', 'article', 'blockquote', 'section',
            'pre', 'code',
            'ul', 'ol', 'li', 'dd', 'dl',
            'table', 'th', 'tr', 'td', 'thead', 'tbody', 'tfood',
            'label',
            'fieldset', 'legend',
            'br', 'p', 'hr',
            'a',
          ],
          allowedAttributes: {
            a: ['href'],
            img: ['src', 'alt'],
          },
    });

    console.log(req)
    parser.extract(req.body.url)
        .then(data => {
          let content = data.content.replace(/<[^>]*>?/gm, '');
          
          console.log('article:', data);

          let article = new Article({
            userId: req.payload._id,
            title: data.title,
            url: data.url,
            source: data.source,
            topic: 'Tech',
            description: data.description,
            content: content
          });

          article.save()
            .then(err => {
              console.log('article saved');
            });

          // Extract sentences.
          let documents = content.match( /[^\.!\?]+[\.!\?]+/g );

          // Run LDA to get terms for 2 topics (5 terms each).
          let result = lda(documents, 3, 6);

          console.log(result);
          res.send(result);
        });
}

module.exports.readArticles = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    Article
      .find({userId: req.payload._id})
      .exec((err, articles) => {
        res.status(200).json(articles);
      });
  }
}