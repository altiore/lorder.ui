import { connect } from 'react-redux';

import CrudJsx from '@components/crud';
import { ICrudColumn } from '@components/crud/crud';

import { closeDialog, openDialog } from '#/@store/dialog';

interface IOwnProps {
  formName?: string;
  entityName: string;
  createTitle?: string;
  createItem?: any;
  deleteItem?: (id: number) => void;
  deleteBulk?: (ids: Array<number | string>) => any;
  editItem?: (itemId, itemValue) => any;
  rows: any[];
  columns: ICrudColumn[];
  getId?: (item: any) => number | string;
  useId?: boolean;
}

const mapDispatch = {
  closeDialog,
  openDialog,
};

export default connect<any, { openDialog: any; closeDialog: any }, IOwnProps>(undefined, mapDispatch)(CrudJsx);
