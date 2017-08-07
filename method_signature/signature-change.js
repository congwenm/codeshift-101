// jscodeshift -t signature-change.js input.js -d -p
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

  const argKeys = ['color', 'make', 'model', 'year', 'miles', 'bedliner', 'alarm']

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
      const object = j.objectExpression(
        node.arguments.map((arg, i) =>
          j.property(
            'init',
            j.identifier(argKeys[i]),
            j.literal(arg.value)
          )
        )
      )
      node.arguments = [object]
      return node
    })
    .toSource({ quote: 'single', trailingComma: true })
};

