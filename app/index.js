var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  init: function() {
    this['msDestination'] = 'tmp';
    this['msMetadataOptions'] = 'options.yaml';

    this.on('end', function() {
      this.installDependencies({
        bower: false,
        npm: true,
        skipInstall: this.options['skip-install'] || this.options.s,
        callback: function () {
          this.log('Done!');
        }.bind(this)
      });
    });
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
  src: function() {
    this.mkdir('src');
    this.template('_src/_options.yaml', 'src/options.yaml');
    this.template('_src/_index.md', 'src/index.md');
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
  installingDependencies: function() {
    this.log('Installing Metalsmith, Handlebars and plugins...');
    this.npmInstall(
      [
      'handlebars',
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