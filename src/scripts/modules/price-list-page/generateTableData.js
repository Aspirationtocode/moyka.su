import React from 'react';
import FlexContainer from '../ordinary-react-components/FlexContainer';

export const generateTableData = (section) => {
  const data = [];
  for (const key in section) {
    data.push({
      serviceTitle: key,
      servicePrice: section[key],
    });
  }
  return data;
};

const serviceTitleCell = row => (
  <div className="table__cell table__cell--service-title">
    {row.value}
  </div>
);

const serviceTitleValue = row => (
  <FlexContainer alignItems="center" justifyContent="center" fullHeight>
    <div className="table__cell table__cell--service-value">
      {row.value}
    </div>
  </FlexContainer>
);

export const generateColumns = sectionTitle => [
  {
    headerClassName: 'table__header',
    Header: sectionTitle,
    columns: [
      {
        headerClassName: 'table__section-header',
        Header: 'Наименование операции',
        minWidth: 200,
        maxWidth: 500,
        Cell: serviceTitleCell,
        accessor: 'serviceTitle',
      },
      {
        headerClassName: 'table__section-header',
        Header: 'Группа 1',
        Cell: serviceTitleValue,
        accessor: 'servicePrice[0]',
      },
      {
        headerClassName: 'table__section-header',
        Header: 'Группа 2',
        Cell: serviceTitleValue,
        accessor: 'servicePrice[1]',
      },
      {
        headerClassName: 'table__section-header',
        Header: 'Группа 3',
        Cell: serviceTitleValue,
        accessor: 'servicePrice[2]',
      },
      {
        headerClassName: 'table__section-header',
        Header: 'Группа 4',
        Cell: serviceTitleValue,
        accessor: 'servicePrice[3]',
      },
      {
        headerClassName: 'table__section-header',
        Header: 'Группа 5',
        Cell: serviceTitleValue,
        accessor: 'servicePrice[4]',
      },
    ],
  },
];
