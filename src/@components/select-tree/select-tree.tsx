import React, { useCallback, useMemo } from 'react';
import { animated, useSpring } from 'react-spring/web.cjs';

import difference from 'lodash/difference';
import uniq from 'lodash/uniq';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Popover from '@material-ui/core/Popover';
import { createStyles, fade, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

import { flatToHierarchy } from '@utils/flat-to-hierarchy';
import { pluralRu } from '@utils/plural-ru';

const useStyles = makeStyles((theme: Theme) => ({
  itemStyle: {
    alignItems: 'center',
    display: 'flex',
  },
  root: {
    flexGrow: 1,
    height: 400,
    padding: theme.spacing(2),
    width: 400,
  },
}));

export interface IProps {
  items: Array<{
    id: number;
    parentId?: number | null;
    [key: string]: any;
  }>;
  onChange: (a: any) => void;
  value: number[];
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    group: {
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
      marginLeft: 7,
      paddingLeft: 18,
    },
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
  })
)((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const getChildren = (items, list) => {
  const curChildren = list.filter(el => items && items.includes(el.parentId)).map(el => el.id);
  if (!curChildren || !curChildren?.length) {
    return items;
  }
  return uniq([...items, ...curChildren, ...getChildren(curChildren, list)]);
};

export const SelectTreeTsx: React.FC<IProps> = ({ items, onChange, value }) => {
  const mainChildren = useMemo(() => flatToHierarchy(items), [items]);
  const mainItem = { children: mainChildren };

  const handleLabelClick = useCallback(
    event => {
      const curValue: number = parseInt(event?.target?.value, 0);
      if (curValue) {
        event.preventDefault();
        event.stopPropagation();

        if (!Array.isArray(value)) {
          return;
        }

        const idx = value.indexOf(curValue);
        if (idx === -1) {
          const allChildren = getChildren([curValue], items);
          onChange(uniq([...value, ...allChildren]));
        } else {
          const allChildren = getChildren([curValue], items);
          onChange(difference(value, allChildren));
        }
      }
    },
    [items, onChange, value]
  );

  const { itemStyle, root } = useStyles();

  const renderChildren = useCallback(
    treeItem => {
      if (!treeItem.children || treeItem?.children?.length === 0) {
        return null;
      }
      return treeItem.children.map((childNode: any) => {
        return (
          <StyledTreeItem
            nodeId={`${childNode.id}`}
            key={childNode.id}
            onLabelClick={handleLabelClick}
            label={
              <div className={itemStyle}>
                <Checkbox color="default" value={childNode.id} checked={value && value.includes(childNode.id)} />
                <span>{childNode.title}</span>
              </div>
            }
          >
            {renderChildren(childNode)}
          </StyledTreeItem>
        );
      });
    },
    [handleLabelClick, itemStyle, value]
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select-tree' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="outlined" color="secondary" onClick={handleClick}>
        {value?.length
          ? pluralRu(
              value?.length || 0,
              'Выбрано %d частей',
              'Выбрана %d часть',
              'Выбрано %d части',
              'Выбрано %d частей'
            )
          : 'Выбери Части'}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <TreeView
          className={root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
          {renderChildren(mainItem)}
        </TreeView>
      </Popover>
    </div>
  );
};
