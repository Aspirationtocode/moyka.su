import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [
  {
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName,
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
    ],
  },
];
class PriceList extends Component {
  render() {
    return (
      <div className="price-list">
        <ReactTable
          data={makeData()}
          columns={columns}
          showPaginationBottom={false}
          sortable={false}
          resizable={false}
        />
      </div>
    );
  }
}
function makeData() {
  return [
    {
      firstName: 'judge',
      lastName: 'babies',
      age: 16,
    },
    {
      firstName: 'quarter',
      lastName: 'driving',
      age: 17,
    },
    {
      firstName: 'division',
      lastName: 'society',
      age: 3,
    },
    {
      firstName: 'lamp',
      lastName: 'point',
      age: 2,
    },
    {
      firstName: 'argument',
      lastName: 'insurance',
      age: 13,
    },
  ];
}

export default PriceList;
