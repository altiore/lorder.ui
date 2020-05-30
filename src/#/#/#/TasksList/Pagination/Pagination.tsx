import React, { useCallback, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';

import Fab from '@material-ui/core/Fab';
import Grow from '@material-ui/core/Grow';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface IPagination {
  changePage: (nPage: number) => any;
  count: number;
  page: number;
  perPage: number;
}

export const useStyles = makeStyles((theme: Theme) => ({
  fabStyle: {
    '& svg': {
      color: theme.palette.default.contrastText,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    backgroundColor: '#f2d578',
    borderRadius: '50%',
    boxShadow: theme.shadow.secondary,
    minHeight: 0,
  },
  left: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex!important',
    },
  },
  pagination: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: 40,
    justifyContent: 'space-around',
    marginBottom: theme.spacing(1 / 2),
    width: 144,
  },
  paginationWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 2),
    position: 'absolute',
  },
  right: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex!important',
    },
  },
}));

export const PaginationTsx: React.FC<IPagination> = ({ page, count, perPage, changePage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOver = useCallback(() => setIsHovered(true), []);

  const handleOut = useCallback(() => setIsHovered(false), []);

  const maxPage = useMemo(() => {
    const pageCount = Math.ceil(count / perPage);
    return pageCount ? pageCount - 1 : 0;
  }, [count, perPage]);

  useEffect(() => {
    if (maxPage < page) {
      changePage(0);
    }
  }, [changePage, maxPage, page]);

  const onNextPage = useCallback(() => {
    const nextPage = page + 1;
    if (nextPage > maxPage) {
      changePage(0);
    } else {
      changePage(nextPage);
    }
  }, [changePage, maxPage, page]);

  const onPrevPage = useCallback(() => {
    const prevPage = page - 1;
    if (prevPage < 0) {
      changePage(maxPage);
    } else {
      changePage(prevPage);
    }
  }, [changePage, maxPage, page]);

  const { fabStyle, left, pagination, paginationWrap, right } = useStyles();

  if (!Boolean(maxPage)) {
    return null;
  }

  return (
    <div className={paginationWrap}>
      <div
        className={pagination}
        onMouseOver={handleOver}
        onMouseOut={handleOut}
        onFocus={handleOver}
        onBlur={handleOut}
      >
        <Grow in={isHovered} timeout={600}>
          <Fab size="small" color="secondary" onClick={onPrevPage} className={cn(left, fabStyle)}>
            <ChevronLeftIcon />
          </Fab>
        </Grow>
        {page + 1} из {Math.max(maxPage + 1, 1)}
        <Grow in={isHovered} timeout={600}>
          <Fab size="small" color="secondary" onClick={onNextPage} className={cn(right, fabStyle)}>
            <ChevronRightIcon />
          </Fab>
        </Grow>
      </div>
    </div>
  );
};
