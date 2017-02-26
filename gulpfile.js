var gulp = require('gulp');
var rsync = require('gulp-rsync');

var paths = {
  configs: ['traefik/**/*', 'influxdb/**/*'],
  compose: 'docker-compose.yml'
};

var host = 'erwinsteffens.com'; 

// Copy app
gulp.task('copy', ['copy-config', 'copy-compose']);

// Copy configuration files
gulp.task('copy-config', function() {
  gulp.src(paths.configs)
    .pipe(rsync({
      hostname: host,
      username: 'root',
      destination: '/usr/share/'
    }));
});

// Copy compose file
gulp.task('copy-compose', function() {
  gulp.src(paths.compose)
    .pipe(rsync({
      hostname: host,
      username: 'root',
      destination: '/root/server'
    }));
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch(paths.configs, ['copy-config']);
  gulp.watch(paths.compose, ['copy-compose']);
});

gulp.task('default', ['watch', 'copy']);