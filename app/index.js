var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default: this.appname
    }, function(answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  },
  installingMetalsmith: function() {
    this.log('Installing Metalsmith and plugins...');
    this.npmInstall(
      [
      'metalsmith',
      'metalsmith-slug',
      'metalsmith-title',
      'metalsmith-drafts',
      'metalsmith-metadata',
      'metalsmith-markdown',
      'metalsmith-templates',
      'metalsmith-permalinks',
      'metalsmith-filemetadata'
      ], { 'saveDev': true })
  }
});