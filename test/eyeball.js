var tokenize = require('glsl-tokenizer/string')
var chalk    = require('chalk')
var depth    = require('../')
var fs       = require('fs')

var src    = fs.readFileSync(__dirname + '/fixture.glsl', 'utf8')
var tokens = depth(tokenize(src))
var list   = [
    'blue'
  , 'green'
  , 'red'
  , 'yellow'
  , 'magenta'
  , 'cyan'
]

for (var i = 0; i < tokens.length; i++) {
  var color = list[tokens[i].depth % list.length]
  var data  = tokens[i].data
    .replace(/ /g, '·')
    .replace(/\t/g, '→ ')
    .replace(/\n/g, '¶\n')
  process.stdout.write(chalk[color](data))
}
