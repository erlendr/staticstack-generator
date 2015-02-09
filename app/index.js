var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  init: function() {
    this['msDestination'] = 'tmp';
    this['msMetadataOptions'] = 'options.yml';
  },
  prompting: function() {
    var done = this.async();
    
    var prompts = [{
      type    : 'input',
      name    : 'msTitle',
      message : 'Site Title',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'msDesc',
      message : 'Site Description',
      default : 'Staticstack-powered site'
    }, {
      type    : 'input',
      name    : 'msAuthor',
      message : 'Author name',
      default : this.user.git.name() || 'Metal Smith'
    },
    {
      type    : 'input',
      name    : 'msGitRepository',
      message : 'Git repository URL',
      default : ''
    }];

    this.prompt(prompts, function(answers) {
      for(var key in answers) {
        this[key] = answers[key];
      }
      done();
    });
  },
  build: function() {
    this.template('_build.js', 'build.js');
  },
  templates: function() {
    this.mkdir('templates');
    this.template('_templates/_home.hbs', 'templates/home.hbs');
    this.template('_templates/_partials/_header.hbs', 'templates/partials/header.hbs');
    this.template('_templates/_partials/_footer.hbs', 'templates/partials/footer.hbs');
  },
  readme: function() {
    this.template('_README.md', 'README.md');
  },
  package: function() {
    this.template('_package.json', 'package.json');
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