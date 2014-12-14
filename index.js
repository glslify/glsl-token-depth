module.exports = getTokenDepth

function getTokenDepth(tokens) {
  var loop  = false
  var depth = 0

  for (var i = 0; i < tokens.length; i++) {
    loop = loop || (tokens[i].type === 'keyword' && (
      tokens[i].data === 'for'
    ))

    switch (tokens[i].data) {
      case '(': tokens[i].depth = loop ? depth++ : depth; break
      case '{': tokens[i].depth = loop ? depth : depth++; loop = false; break
      case '}': tokens[i].depth = --depth; break
      default:  tokens[i].depth = depth
    }
  }

  return tokens
}
