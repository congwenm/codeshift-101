// jscodeshift -t signature-change.js input.js -d -p)
export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // find declaration for 'car' import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'car',
    }
  })

  // get the local name for the imported module
  const localName = importDeclaration.find(j.Identifier)
    .get(0)
    .node.name

  // find where `.factory` is being called
  return root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: {
        name: localName,
      },
      property: {
        name: 'factory',
      },
    }
  })
    .replaceWith(nodePath => {
      const { node } = nodePath
      node.arguments = [{ foo: 'bar' }]
      return node
    })
    .toSource()
};

