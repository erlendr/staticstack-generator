# generator-staticstack
Staticstack is a Yeoman generator for static site generation via [Metalsmith](http://www.metalsmith.io/). [Bourbon](http://bourbon.io), [Neat](http://neat.bourbon.io) & [Bitters](http://bitters.bourbon.io/) are included.

[Grunt](http://gruntjs.com/) is used for compilation of [Sass](http://sass-lang.com). [Bower](http://bower.io/) is used for managing dependencies.

### Prerequisites
If you do not have [Node.js](http://nodejs.org/) `>=0.10`, [Yeoman](http://yeoman.io/) `>=1.1.2`, [Ruby](https://www.ruby-lang.org/en/) `>=1.9` and the [Bundler](http://bundler.io/) gem installed, you must do that first:

- [Node.js](http://davidcalhoun.me/2013/12/16/developer-tools-homebrew/)
- [Yeoman](http://yeoman.io/learning/index.html)
- [Ruby](https://rvm.io/rvm/install)
- [Bundler](http://bundler.io/#getting-started)

### Installation

This will work when the module is published:

````bash
npm install -g generator-staticstack
````

For now, clone the repo and do:

```bash
npm install
npm link
```

### Update

If you already have generator-staticstack installed, please upgrade before
generating another site to get the latest updates.

```bash
npm list -g | grep 'generator-staticstack' # See your installed version
npm info generator-staticstack | grep 'latest' # See latest generator-staticstack version
npm update -g generator-staticstack # Upgrade generator-staticstack globally
```

### Usage
Staticstack will run `bundle install`, so if you would like to install the Staticstack gems into a gemset, set that up before running `yo staticstack`.

````bash
mkdir project-name && cd project-name
yo staticstack
````

*Should you run into an error such as `command yo not found` it may be related to a path issue when installing Node.js via Homebrew. Please refer to the top answer on this [StackOverflow question](http://stackoverflow.com/questions/15846076/command-not-found-after-installation).*

### Grunt Tasks
##### grunt serve
Serve your source locally into your browser. LiveReload will automatically load any changes to HTML, CSS and JavaScript that you make.

##### grunt check
TBD

##### grunt build
Build the concatenated, minified production version of the source into the `dist` directory.

##### grunt deploy
TBD
