import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { generateTableData, generateColumns } from '../generateTableData';

import { priceList } from '../../../../data';

import abbreviations from '../abbreviations';

class PriceList extends Component {
  constructor() {
    super();
    this.renderTable = this.renderTable.bind(this);
    this.renderTables = this.renderTables.bind(this);
  }
  renderTable(sectionTitle) {
    const columns = generateColumns(sectionTitle);
    const tableData = generateTableData(priceList[sectionTitle]);
    return (
      <ReactTable
        className={`table table--${abbreviations[sectionTitle]}`}
        key={sectionTitle}
        data={tableData}
        columns={columns}
        showPaginationBottom={false}
        defaultPageSize={tableData.length}
        sortable={false}
        resizable={false}
      />
    );
  }
  renderTables() {
    const tables = [];
    for (const sectionTitle in priceList) {
      const currentTable = this.renderTable(sectionTitle);
      tables.push(currentTable);
    }
    return tables;
  }
  render() {
    return (
      <div className="price-list">
        {this.renderTables()}
      </div>
    );
  }
}

export default PriceList;
