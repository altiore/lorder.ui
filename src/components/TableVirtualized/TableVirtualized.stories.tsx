/* tslint:disable */
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { storiesOf } from '@storybook/react';
import { internet, phone, random } from 'faker';
import * as React from 'react';

import Table from '.';

const CustomCell1 = ({ cellData }: any) => <FormControlLabel control={<Checkbox color="primary" />} label={cellData} />;

class CustomCell2 extends React.Component<any> {
  render() {
    const { cellData, common } = this.props;
    return (
      <span>
        {cellData} {common}
      </span>
    );
  }
}

const rows = [];

for (let i = 0; i <= 1000; i++) {
  rows.push({
    id: i,
    email: internet.email(),
    tel: phone.phoneNumber(),
    projectsCount: random.number({ min: 1, max: 379 }),
  });
}

export const demoData = {
  columns: [
    { label: 'Email', order: 1, isShown: true, dataKey: 'email', component: CustomCell1 },
    { label: 'Телефон', order: 2, isShown: true, dataKey: 'tel', component: <CustomCell2 common="UPC" /> },
    { label: 'Количество проектов', order: 3, isShown: true, dataKey: 'projectsCount' },
  ],
  rows,
};

storiesOf('Table', module)
  .add('default', () => (
    <div style={{ maxWidth: 1000, margin: '50px auto' }}>
      <Table {...demoData} />
    </div>
  ))
  .add('isColumnsSortable=false', () => (
    <div style={{ maxWidth: 1000, margin: '50px auto' }}>
      <Table {...demoData} isColumnsSortable={false} />
    </div>
  ));
