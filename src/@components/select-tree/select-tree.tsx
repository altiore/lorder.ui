import React, { useCallback, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring/web.cjs';

import difference from 'lodash/difference';
import sortBy from 'lodash/sortBy';
import toLower from 'lodash/toLower';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

import { PropTypes } from '@material-ui/core';
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

import SearchIco from '@components/@icons/Search';
import InputLight from '@components/input-light';

import { flatToHierarchy } from '@utils/flat-to-hierarchy';
import { pluralRu } from '@utils/plural-ru';

export interface IProps {
  color?: PropTypes.Color;
  items: any[];
  onChange: (a: any) => void;
  multiple?: boolean;
  value: number[];
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
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
)((props: TreeItemProps) => <TreeItem {...props} tabIndex={-1} TransitionComponent={TransitionComponent} />);

const getChildren = (items, list) => {
  const curChildren = list.filter(el => items && items.includes(el.parentId)).map(el => el.id);
  if (!curChildren || !curChildren?.length) {
    return items;
  }
  return uniq([...items, ...curChildren, ...getChildren(curChildren, list)]);
};

const getParents = (items, list) => {
  const curParentIds = uniq(items.map(el => el.parentId).filter(el => Boolean(el)));

  if (!curParentIds || !curParentIds?.length) {
    return items;
  }
  const parents = list.filter(el => curParentIds.includes(el.id));
  return uniqBy([...items, ...parents, ...getParents(parents, list)], 'id');
};

export function SelectTreeTsx<IItem>({ color, items, onChange, value, multiple }: IProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleChangeTerm = useCallback(
    event => {
      setSearchTerm(event?.currentTarget?.value);
    },
    [setSearchTerm]
  );

  const filteredItems = useMemo(() => {
    return Array.isArray(items)
      ? getParents(
          items.filter(el => ~toLower(el?.title).search(toLower(searchTerm))),
          items
        )
      : [];
  }, [items, searchTerm]);

  const mainChildren = useMemo(() => flatToHierarchy(filteredItems), [filteredItems]);
  const mainItem = { children: mainChildren };

  const handleLabelClick = useCallback(
    event => {
      const curValue: number = parseInt(event?.target?.value, 0);
      if (curValue) {
        event.preventDefault();
        event.stopPropagation();

        if (multiple) {
          if (!Array.isArray(value)) {
            return;
          }

          const idx = value.indexOf(curValue);
          if (idx === -1) {
            const allChildren = getChildren([curValue], items);
            const newValue = uniq([...value, ...allChildren]);
            onChange(newValue);
          } else {
            const allChildren = getChildren([curValue], items);
            onChange(difference(value, allChildren));
          }
        } else {
          if (Array.isArray(value)) {
            return;
          }

          const newValue = parseInt(value, 0) === curValue ? null : curValue;
          onChange(newValue);
        }
      }
    },
    [items, onChange, multiple, value]
  );

  const selectedItem = useMemo<any>(() => {
    return Array.isArray(value) ? undefined : items.find(el => el.id === parseInt(value, 0));
  }, [items, value]);

  const { itemStyle, popoverClass, treeViewStyle } = useStyles();

  const renderChildren = useCallback(
    treeItem => {
      if (!treeItem.children || treeItem?.children?.length === 0) {
        return null;
      }
      return sortBy(treeItem.children, 'title').map((childNode: any) => {
        const checked = value
          ? Array.isArray(value)
            ? value.includes(childNode.id)
            : parseInt(value, 0) === childNode.id
          : false;
        return (
          <StyledTreeItem
            nodeId={`${childNode.id}`}
            key={childNode.id}
            onLabelClick={handleLabelClick}
            label={
              <div className={itemStyle}>
                <Checkbox color="default" value={childNode.id} checked={checked} />
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

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = useMemo(() => (open ? 'select-tree' : undefined), [open]);

  return (
    <div>
      <Button fullWidth aria-describedby={id} variant="outlined" color={color || 'secondary'} onClick={handleClick}>
        {selectedItem?.title
          ? selectedItem?.title
          : value?.length
          ? pluralRu(
              value?.length || 0,
              'Выбрано %d частей',
              'Выбрана %d часть',
              'Выбрано %d части',
              'Выбрано %d частей'
            )
          : multiple
          ? 'Выбери Части'
          : '[нет родителя]'}
      </Button>
      <Popover
        id={id}
        PaperProps={{ className: popoverClass }}
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
        <InputLight
          autoFocus
          icon={<SearchIco />}
          onChange={handleChangeTerm}
          placeholder="Фильтр частей..."
          value={searchTerm}
        />
        <TreeView
          className={treeViewStyle}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
          {renderChildren(mainItem)}
        </TreeView>
      </Popover>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  itemStyle: {
    alignItems: 'center',
    display: 'flex',
  },
  popoverClass: {
    height: 360,
    overflow: 'hidden',
    padding: theme.spacing(2, 1),
    width: 400,
    ...theme.scroll.secondary,
  },
  treeViewStyle: {
    flexGrow: 1,
    height: 300,
    marginTop: 8,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: theme.spacing(0, 1),
    width: 388,
    ...theme.mainContent.scroll,
  },
}));
