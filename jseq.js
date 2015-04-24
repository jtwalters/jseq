#!/usr/bin/env node

var compareAst = require('compare-ast'),
    argv = require('yargs').argv,
    chalk = require('chalk'),
    fs = require('fs'),
    async = require('async'),
    stripShebang = require('strip-shebang');

if (argv._.length !== 2) {
  console.log(chalk.red('Pass two file names to compare.'));
  process.exit(1);
}

async.map(argv._, fs.readFile, function (err, data) {
  var result;

  if (err) {
    throw err;
  }

  try {
    result = compareAst(
      stripShebang(data[0].toString()),
      stripShebang(data[1].toString())
    );
    console.log(result);
  }
  catch (e) {
    console.log(chalk.red(e.message));
  }
});
