var gulp          = require('gulp');
var babelify      = require('babelify');
var $             = require('gulp-load-plugins')();
var del           = require('del');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var preprocessify = require('preprocessify');


var env           = 'dev';
var webserver     = false;

log = function(task, start) {
  if (!start) {
    setTimeout(function() {
      $.util.log('Starting', '\'' + $.util.colors.cyan(task) + '\'...');
    }, 1);
  } else {
    var time = ((new Date() - start) / 1000).toFixed(2) + ' s';
    $.util.log('Finished', '\'' + $.util.colors.cyan(task) + '\'', 'after', $.util.colors.magenta(time));
  }
};

gulp.task('clean:dev', function() {
  return del(['.tmp']);
});

gulp.task('clean:dist', function() {
  return del(['dist']);
});


gulp.task('build', function(){
  var pages = ['home', 'SignupPage'];
  pages.forEach(function(page) {
    var filePath = './app/scripts/pages/' + page + '.js';
    var extensions = ['.js', '.jsx'];
    //scripts
    console.log('running page', page);
    dev = false;
    var bundle = function () {
      if (dev) {
        var start = new Date();
        log('scripts:bundle');
      }
      browserify({
        entries: [filePath],
        extensions: extensions,
        debug: env === 'dev'
      }).transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(page + '.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe($.if(dev, $.tap(function () {
          log('scripts:bundle', start);
          if (!webserver) {
            runSequence('webserver');
          }
        })));
    };

    if (dev) {
      gulp.src(filePath)
        .pipe($.plumber())
        .pipe($.tap(function (file) {
          var d = domain.create();

          d.on('error', function (err) {
            $.util.log($.util.colors.red('Browserify compile error:'), err.message, '\n\t', $.util.colors.cyan('in file'), file.path);
            $.util.beep();
          });

          d.run(bundle);
        }));
    } else {
      bundle();
    }

    ////css
    gulp.src('./app/styles/pages/' + page + '.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe(gulp.dest('dist/styles/'));

    gulp.src('./app/pages/' + page + '.html')
      .pipe(gulp.dest('dist/'));

    gulp.src('./app/assets/*')
      .pipe(gulp.dest('dist/assets/'));

  });
});


gulp.task('default', ['build']);

