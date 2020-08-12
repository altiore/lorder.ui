export const flatToHierarchy = <P>(
  flat: P,
  idName: string = 'id',
  parentIdName: string = 'parentId'
): P & { children: P[] } => {
  const rootNodes: any = []; // items without parent

  const allNodes = (flat as any).reduce((buffer: any, currentNode: any) => {
    buffer[currentNode[idName]] = { ...currentNode };
    return buffer;
  }, {});

  // connect childrens to its parent, and split rootNodes apart
  Object.keys(allNodes).forEach(function(key) {
    const node = allNodes[key];
    if (node[parentIdName] === null) {
      rootNodes.push(node);
    } else if (node[parentIdName] in allNodes) {
      const p = allNodes[node[parentIdName]];
      if (!('children' in p)) {
        p.children = [];
      }
      p.children.push(node);
    }
  });

  return rootNodes;
};
