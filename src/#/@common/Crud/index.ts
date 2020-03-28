import { connect } from 'react-redux';

import Crud from '@components/Crud';

import { closeDialog, openDialog } from '#/@store/dialog';

interface IOwnProps {
  formName: string;
  entityName: string;
  createItem?: any;
  deleteItem?: (id: number) => void;
  deleteBulk?: (ids: Array<number | string>) => any;
  rows: any[];
  columns: Array<{ title: string; path: any; name?: string; isNumber?: boolean; allowed?: object }>;
  getId?: (item: any) => number | string;
}

const mapDispatch = {
  closeDialog,
  openDialog,
};

export default connect<any, { openDialog: any; closeDialog: any }, IOwnProps>(
  undefined,
  mapDispatch
)(Crud);
