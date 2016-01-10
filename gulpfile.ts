import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks, task} from './tools/utils';


// --------------
// Configuration.
loadTasks();

// --------------
// Clean (override).
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));
gulp.task('clean.tmp',   task('clean', 'tmp'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dist',
              'build.preprocess.dev',
              'tslint',
              'build.sass.dev',
              'build.ng2bs.dev',
              'build.img.dev',
              'build.js.dev',
              'build.index',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean.dist',
              'clean.tmp',
              'tslint',
              'build.sass.dev',
              //'build.ng2bs.dev',
              'build.img.dev',
              'build.html_css.prod',
              'build.deps',
              'build.js.prod',
              'build.bundles',
              'build.index',
              done));

/*gulp.task('build.prod', done =>
  runSequence('clean.dist',
              'build.preprocess.prod',
			  'tslint',
              'build.sass.dev',
              'build.ng2bs.dev',
              'build.img.dev',
              'build.js.prod',
              'build.index',
              done));*/

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('clean.test',
              'tslint',
              'build.test',
              'karma.start',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done));


// --------------
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
// gulp.task('docs', done =>
//   runSequence('build.docs',
//               'serve.docs',
//               done));
