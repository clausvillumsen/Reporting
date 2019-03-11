import camelCase from 'lodash.camelcase';

function buildColumns(arr) {
  const newColumn = arr.map(item => ({
    Header: item.Name,
    accessor: camelCase(item.Name)
  }));
  return newColumn
}

export default buildColumns;
