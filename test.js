'use strict';

var browserify = require('browserify'),
    _ = require('lodash'),

    // Feel free to crank this value up if you want MORE DATA!!!
    timesToRun = 1000,

    // I added this so people will know that the process isn't hung when we are cranking through a bunch of iterations.
    ProgressBar = require('progress'),
    startedProgressBar = new ProgressBar('Kicking off browserify runs: (:percent) [:bar]', {total: timesToRun}),
    finishedProgressBar = new ProgressBar('Finished browserify runs: (:percent) [:bar]', {total: timesToRun}),

    chalk = require('chalk'),
    q = require('q'),
    browserifyManyTimes = _.map(_.range(timesToRun), function() {
        // Here is the test we will repeat many times.
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

// Wait for all the tests to complete.
q.all(browserifyManyTimes).then(function(codeResults) {
    // For each different result that we got, report how many times we got it.
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
    // If you get an EMFILE error, you may have your ulimit set too low.
    console.log('Error:', err);
});

