import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/domains/@common/Page';
import { Project } from 'src/store/projects';
import { CreateProjectPopup } from './CreateProjectPopup';

const src =
  'https://cache.harvestapp.com/assets/onboarding/landing-projects@2x-e00081706c6ce0b93cf18c21c6e488f1fc913045992fc34dd18e5e290bc971cb.png';

export interface IProjectsProps {
  classes: any;
  closeDialog: any;
  getAllProjects: any;
  goToProject: any;
  openDialog: any;
  projectList: Project[];
  removeProject: any;
}

export class Projects extends React.Component<RouteComponentProps<{}> & IProjectsProps, {}> {
  public state = {
    page: 0,
    perPage: 10,
  };

  public componentDidMount() {
    this.props.getAllProjects();
  }

  public handleRowClick = (id: number | undefined) => () => {
    this.props.goToProject(id);
  };

  public handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.removeProject(id);
  };

  public handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number = 0) => {
    this.setState({ page });
  };

  public handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => {
    if (event && event.target.value) {
      this.setState({ perPage: event.target.value });
    }
  };

  public render() {
    const { classes, openDialog, projectList } = this.props;
    const { perPage, page } = this.state;
    const createProjectFunction = () => openDialog(CreateProjectPopup);
    return (
      <Page>
        {projectList && projectList.length ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Название проекта</TableCell>
                <TableCell numeric>Месячный бюджет</TableCell>
                <TableCell numeric>Потрачено</TableCell>
                <TableCell numeric>Полная стоимость</TableCell>
                <TableCell style={{ width: 50 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList.slice(page * perPage, (page + 1) * perPage).map(({ id, title, monthlyBudget }) => {
                return (
                  <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                    <TableCell component="th" scope="row">
                      {title}
                    </TableCell>
                    <TableCell numeric>{monthlyBudget}</TableCell>
                    <TableCell numeric>50</TableCell>
                    <TableCell numeric>1200</TableCell>
                    <TableCell>
                      <IconButton onClick={this.handleRemoveClick(id)} style={{ height: 42 }}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={projectList.length}
                  rowsPerPage={perPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage={'Элементов на странице'}
                  labelDisplayedRows={this.labelDisplayedRows}
                />
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <Grid item xs={12}>
            <img src={src} />
          </Grid>
        )}
        <Button size="large" variant="contained" color="primary" onClick={createProjectFunction}>
          <Typography variant="caption" noWrap>
            {'Создать проект'}
          </Typography>
        </Button>
      </Page>
    );
  }

  private labelDisplayedRows = ({ from, to, count }: any) => {
    return ''
      .concat(from, '-')
      .concat(to, ' из ')
      .concat(count);
  };
}
