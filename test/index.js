var tokenize = require('glsl-tokenizer/string')
var test     = require('tape')
var depth    = require('../')
var fs       = require('fs')

var src = fs.readFileSync(__dirname + '/fixture.glsl', 'utf8')

test('glsl-token-depth: structs', function(t) {
  var tokens = depth(tokenize(src))

  eachIdent(tokens, 'thing1', function(token) {
    t.equal(token.depth, 1, 'properties are given a new scope')
  })
  eachIdent(tokens, 'thing2', function(token) {
    t.equal(token.depth, 1, 'properties are given a new scope')
  })
  eachIdent(tokens, 'Thing', function(token) {
    t.equal(token.depth, 0, 'top-level struct declaration')
  })

  t.end()
})

test('glsl-token-depth: for loops', function(t) {
  var tokens = depth(tokenize(src))

  eachIdent(tokens, 'loop1', function(token) {
    t.equal(token.depth, 2, 'unnested for loop')
  })
  eachIdent(tokens, 'loop2', function(token) {
    t.equal(token.depth, 4, 'nested for loop')
  })

  t.end()
})

test('glsl-token-depth: do-while loops', function(t) {
  var tokens = depth(tokenize(src))

  eachIdent(tokens, 'second', function(token) {
    t.equal(token.depth, 3, 'do contents are in a new scope')
  })
  eachIdent(tokens, 'seventh', function(token) {
    t.equal(token.depth, 2, 'while contents are in parent scope')
  })

  t.end()
})

test('glsl-token-depth: if statements', function(t) {
  var tokens = depth(tokenize(src))

  eachIdent(tokens, 'fifth', function(token) {
    t.equal(token.depth, 4, 'comparision variables are in parent scope')
  })
  eachIdent(tokens, 'sixth', function(token) {
    t.equal(token.depth, 5, 'contents are in a new scope')
  })

  t.end()
})

test('glsl-token-depth: function declarations', function(t) {
  var tokens = depth(tokenize(src))

  eachIdent(tokens, 'main', function(token) {
    t.equal(token.depth, 0, 'top-level')
  })

  t.end()
})

function eachIdent(tokens, name, ident) {
  for (var i = 0, j = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'ident') continue
    if (tokens[i].data !== name) continue
    ident(tokens[i], j++)
  }
}
