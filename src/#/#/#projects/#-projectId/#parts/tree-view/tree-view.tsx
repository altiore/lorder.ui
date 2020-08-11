import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: 216,
    maxWidth: 400,
  },
});

export interface ITreeViewProps {
  count?: number;
  data: any;
}

export const TreeViewTsx: React.FC<ITreeViewProps> = ({ data, count }) => {
  const classes = useStyles();
  const renderChildren = useCallback(treeItem => {
    if (!treeItem.children || treeItem.children.length === 0) {
      return null;
    }
    return treeItem.children.map((childNode: any) => {
      return (
        <TreeItem nodeId={`${childNode.id}`} key={childNode.id} label={childNode.title}>
          {renderChildren(childNode)}
        </TreeItem>
      );
    });
  }, []);
  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {data.map((rootNode: any) => {
          return (
            <TreeItem nodeId={`${rootNode.id}`} key={rootNode.id} label={rootNode.title}>
              {renderChildren(rootNode)}
            </TreeItem>
          );
        })}
      </TreeView>
    </div>
  );
};
