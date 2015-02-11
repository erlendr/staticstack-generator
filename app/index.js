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
  writing: function () {
    //Shell: Config for running build.js
    this.gruntfile.insertConfig(
      'shell', 
      ' { dev: { command: "node build.js development" }, dist: { command: "node build.js production" } }');

    //Default task
    this.gruntfile.registerTask('default', ['shell:dev']);

    //Load NPM tasks
    this.gruntfile.loadNpmTasks('grunt-contrib-uglify');
    this.gruntfile.loadNpmTasks('grunt-contrib-clean');
    this.gruntfile.loadNpmTasks('grunt-shell');
    this.gruntfile.loadNpmTasks('grunt-sass');
    this.gruntfile.loadNpmTasks('grunt-contrib-watch');
    this.gruntfile.loadNpmTasks('grunt-browser-sync');
    this.gruntfile.loadNpmTasks('grunt-contrib-connect');
    this.gruntfile.loadNpmTasks('grunt-contrib-jshint');
    this.gruntfile.loadNpmTasks('grunt-contrib-compress');
    this.gruntfile.loadNpmTasks('grunt-contrib-copy');
    this.gruntfile.loadNpmTasks('grunt-aws-s3');
  },
  readme: function() {
    this.template('_README.md', 'README.md');
  },
  package: function() {
    this.template('_package.json', 'package.json');
  }
});