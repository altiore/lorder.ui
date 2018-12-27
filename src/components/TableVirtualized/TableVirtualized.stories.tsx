/* tslint:disable */
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { storiesOf } from '@storybook/react';
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

export const demoData = {
  columns: [
    { label: 'Product Name', order: 1, isSelect: true, dataKey: 'product_name', component: CustomCell1 },
    { label: 'UPC', order: 5, isSelect: true, dataKey: 'product_upc', component: <CustomCell2 common="UPC" /> },
    { label: 'URL', order: 3, isSelect: true, dataKey: 'product_url' },
    { label: 'Site ID', order: 4, isSelect: true, dataKey: 'site_ID' },
    { label: 'Brand', order: 2, isSelect: true, dataKey: 'brand' },
  ],
  rows: [
    {
      product_name: 'Test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'One more test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Still test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'New test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Name',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'One more test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Still test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'New test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Name',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'One more test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Still test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'New test',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
    {
      product_name: 'Name',
      product_upc: '00001',
      product_url: 'URL example.com',
      site_ID: 'Site ID 2345224',
      brand: 'Brand Candy',
    },
  ],
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
