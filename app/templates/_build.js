var fs = require('fs');
var path = require('path');

var Metalsmith = require('metalsmith');
var Handlebars = require('handlebars');

var slug = require('metalsmith-slug');
var title = require('metalsmith-title');
var drafts = require('metalsmith-drafts');
var metadata = require('metalsmith-metadata');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .clean(false)
  .destination('<%= msDestination %>')
  .use(title())
  .use(slug())
  .use(markdown({
    smartypants: true,
    tables: true,
    gfm: true
  }))
  .use(function isHomePage(files, metalsmith, done) {
    files['index.html'].isHomePage = true;
    done();
  })
  .use(function exclude(files, metalsmith, done) {
    for(var key in files) {
      if(files[key].exclude) delete files[key];
    }
    done();
  })
  .use(metadata({
    options: '<%= msMetadataOptions %>'
  }))
  .use(permalinks())
  .use(templates({
    engine: 'handlebars',
    partials: {
      'header': 'partials/header',
      'footer': 'partials/footer',
    }
  }))
  .build(function(err){
    if (err) throw err;
  });