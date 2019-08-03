import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grow from '@material-ui/core/Grow';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DoneIcon from '@material-ui/icons/Done';
import get from 'lodash-es/get';
import React from 'react';

type FilterType = 'smart' | 'recent' | 'new';

export interface IFilterProps {
  changeTasksFilter: any;
  changePage: any;
  classes?: any;
  count: number;
  filter: FilterType;
  page: number;
  perPage: number;
}

export interface IFilterState {
  hoveredFilter?: string;
  isFilterHovered: boolean;
  isPaginatorHovered: boolean;
}

const FILTERS = { smart: 'Ценные', recent: 'Недавние', new: 'Новые' };
const getLabelFromFilter = (filter: FilterType) => FILTERS[filter];

export class FilterTsx extends React.PureComponent<IFilterProps, IFilterState> {
  state = {
    hoveredFilter: undefined,
    isFilterHovered: false,
    isPaginatorHovered: false,
  };

  render() {
    const { classes, page, count, perPage, changePage, filter } = this.props;
    const { hoveredFilter, isFilterHovered, isPaginatorHovered } = this.state;

    return (
      <ListItem className={classes.root}>
        <div
          className={classes.pagination}
          onMouseEnter={this.handlePaginatorEnter}
          onMouseLeave={this.handlePaginatorLeave}
          onFocus={this.handlePaginatorEnter}
          onBlur={this.handlePaginatorLeave}
        >
          <Grow in={isPaginatorHovered} timeout={600}>
            <Fab size="small" color="secondary" onClick={changePage(page - 1)} className={classes.left}>
              <ChevronLeftIcon fontSize="small" />
            </Fab>
          </Grow>
          {page + 1} из {Math.ceil(count / perPage)}
          <Grow in={isPaginatorHovered} timeout={600}>
            <Fab size="small" color="secondary" onClick={changePage(page + 1)} className={classes.right}>
              <ChevronRightIcon fontSize="small" />
            </Fab>
          </Grow>
        </div>
        <div className={classes.grow} />
        <div className={classes.filter} onMouseEnter={this.handleFilterEnter} onMouseLeave={this.handleFilterLeave}>
          <Chip
            label={getLabelFromFilter(hoveredFilter || filter)}
            clickable
            className={classes.chip}
            color="secondary"
            deleteIcon={<DoneIcon />}
            onClick={this.toggleFilterHovered(!this.state.isFilterHovered)}
            style={{ bottom: isFilterHovered ? 40 : 16 }}
            onFocus={this.toggleFilterHovered(true)}
            onBlur={this.toggleFilterHovered(false)}
          />
          {isFilterHovered && (
            <Grow in={isFilterHovered} timeout={500}>
              <RadioGroup
                row
                aria-label="Gender"
                name="filter"
                className={classes.group}
                value={filter}
                onChange={this.changeTaskFilter as any}
              >
                {Object.keys(FILTERS).map((f: any) => {
                  const label = getLabelFromFilter(f);
                  return (
                    <Radio
                      key={f}
                      color="secondary"
                      checked={filter === f}
                      value={f}
                      name="task-filter"
                      aria-label={label}
                      onMouseEnter={this.handleRadioEnter}
                      onMouseLeave={this.handleRadioLeave}
                    />
                  );
                })}
              </RadioGroup>
            </Grow>
          )}
        </div>
      </ListItem>
    );
  }

  private changeTaskFilter = (e: React.SyntheticEvent) => {
    this.props.changeTasksFilter(e);
  };

  private handleFilterEnter = () => {
    this.setState({ isFilterHovered: true });
  };

  private handleFilterLeave = () => {
    this.setState({ isFilterHovered: false });
  };

  private toggleFilterHovered = (isFilterHovered: boolean) => () => {
    this.setState({ isFilterHovered });
  };

  private handleRadioEnter = (e: React.SyntheticEvent) => {
    this.setState({ hoveredFilter: get(e, 'target.value') });
  };

  private handleRadioLeave = () => {
    this.setState({ hoveredFilter: undefined });
  };

  private handlePaginatorEnter = () => {
    this.setState({ isPaginatorHovered: true });
  };

  private handlePaginatorLeave = () => {
    this.setState({ isPaginatorHovered: false });
  };
}
