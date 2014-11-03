'use strict';

var browserify = require('browserify'),
    _ = require('lodash'),
    timesToRun = 1000,
    ProgressBar = require('progress'),
    startedProgressBar = new ProgressBar('Kicking off browserify runs: (:percent) [:bar]', {total: timesToRun}),
    finishedProgressBar = new ProgressBar('Finished browserify runs: (:percent) [:bar]', {total: timesToRun}),
    chalk = require('chalk'),
    q = require('q'),
    browserifyManyTimes = _.map(_.range(timesToRun), function() {
        var bundler = browserify({
                entries: ['./sample.js']
            });

        bundler.require('./sample.js', {expose: '/sample.js'});

        startedProgressBar.tick();
        return q.ninvoke(bundler, 'bundle').then(function(code) {
            finishedProgressBar.tick();
            return code;
        });
    });

q.all(browserifyManyTimes).then(function(codeResults) {
    _(codeResults)
        .countBy()
        .forEach(function(count, code) {
            console.log();
            console.log();
            console.log(chalk.cyan('=============================='));
            console.log();
            console.log(chalk.green.bold('The following code appeared', count, 'times'));
            console.log();
            console.log(chalk.yellow(code));
            console.log();
            console.log(chalk.cyan('=============================='));
            console.log();
            console.log();
        });
}).fail(function(err) {
    console.log('Error:', err);
});

