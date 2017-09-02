// run with
// -p displays result, tally of dispositions for each file processed
// -d remove this, and it would replace the content in  input.js
// jscodeshift -t remove-consoles.js input.js -d -p
export const oldschool = (fileInfo, api) => {
  const j = api.jscodeshift
  const root = j(fileInfo.source) // produces ast

  const callExpressions = root.find(j.CallExpression, { // finds all instances of callExpression where such and such...
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'console' }
    }
  })

  callExpressions.remove() // remove the console

  return root.toSource()
}

export default (fileinfo, api) => {
  const j = api.jscodeshift
  return j(fileinfo.source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { type: 'Identifier', name: 'console' }
      }
    })
    .remove()
    .toSource()
}
