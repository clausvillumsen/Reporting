const getIconByName = (name) => {
  let result = '';
  const arrName = name && name.replace(/[^a-zA-Z ]/g, '').split(' ');
  if (arrName && arrName[0] && arrName[0].charAt(0)) {
    result += arrName[0].charAt(0);
  }
  return result;
};

export default getIconByName;
