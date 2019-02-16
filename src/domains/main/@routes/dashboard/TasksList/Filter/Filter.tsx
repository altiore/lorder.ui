import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DoneIcon from '@material-ui/icons/Done';
import get from 'lodash-es/get';
import * as React from 'react';

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

    const paginatorStyle = {
      display: isPaginatorHovered ? 'flex' : 'none',
    };
    return (
      <ListItem className={classes.root}>
        <div
          className={classes.pagination}
          onMouseEnter={this.handlePaginatorEnter}
          onMouseLeave={this.handlePaginatorLeave}
        >
          <Fab
            size="small"
            color="secondary"
            onClick={changePage(page - 1)}
            className={classes.left}
            style={paginatorStyle}
          >
            <ChevronLeftIcon fontSize="small" />
          </Fab>
          {page + 1} из {Math.ceil(count / perPage)}
          <Fab
            size="small"
            color="secondary"
            onClick={changePage(page + 1)}
            className={classes.right}
            style={paginatorStyle}
          >
            <ChevronRightIcon fontSize="small" />
          </Fab>
        </div>
        <div className={classes.grow} />
        <div
          className={classes.filter}
          onMouseEnter={this.handleFilterEnter}
          onMouseLeave={this.handleFilterLeave}
          style={{ marginBottom: isFilterHovered ? -16 : 0 }}
        >
          <Chip
            label={getLabelFromFilter(hoveredFilter || filter)}
            clickable
            className={classes.chip}
            color="secondary"
            deleteIcon={<DoneIcon />}
            onClick={this.toggleFilterHovered}
          />
          <RadioGroup
            row
            aria-label="Gender"
            name="filter"
            className={classes.group}
            value={filter}
            onChange={this.changeTaskFilter}
            style={{ display: isFilterHovered ? 'flex' : 'none' }}
          >
            {Object.keys(FILTERS).map((f: FilterType) => {
              const label = getLabelFromFilter(f);
              return (
                <Radio
                  key={f}
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
        </div>
      </ListItem>
    );
  }

  private changeTaskFilter = (e: React.SyntheticEvent) => {
    this.setState({ isFilterHovered: false });
    this.props.changeTasksFilter(e);
  };

  private handleFilterEnter = () => {
    this.setState({ isFilterHovered: true });
  };

  private handleFilterLeave = () => {
    this.setState({ isFilterHovered: false });
  };

  private toggleFilterHovered = () => {
    this.setState(({ isFilterHovered }) => ({ isFilterHovered: !isFilterHovered }));
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
