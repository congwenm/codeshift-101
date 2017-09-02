var fs = require('fs')
var babel = require('babel-core')
var moriscript = require('./moriscript')

// read filename from the command line arguments
var fileName = process.argv[2] || './babel_plugin/example.ms'

// read the code from this file
fs.readFile(fileName, function (err, data) {
  debugger
  if(err) throw err;

  //convert form a buffer to a string
  var src = data.toString()

  debugger
  // use our plugin to transform the source
  var out = babel.transform(src, {
    plugins: [moriscript]
  })

  // // print the generated code to screen
  console.log(out.code)
})