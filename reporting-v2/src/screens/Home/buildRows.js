import camelCase from 'lodash.camelcase';

function buildRows(rows, columns) {
  const keys = columns.map(item => (item.Name));
  const newRows = rows.map(item => {
    let obj = {};
    for (let index = 0; index < keys.length; index += 1) {
      const element = keys[index];
      obj = {
        ...obj,
        [camelCase(element)]: item[index]
      }
    }
    return obj;
  });
  return newRows;
}

export default buildRows;
