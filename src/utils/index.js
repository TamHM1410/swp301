const onSelect = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]));
};
const unSelect = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]));
};
const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((k) => {
    if (obj[k] === null) {

        delete obj[k]
        return obj
      
    }
    
  });

  return obj
};

const updateNestedObjectParser =object =>{
    const final = {};

    Object.keys(object || {}).forEach(key => {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        const response = updateNestedObjectParser(object[key]);
  
        Object.keys(response || {}).forEach(a => {
          final[`${key}.${a}`] = response[a];
        });
      } else {
        final[key] = object[key];
      }
    });
  
    return final;
}
module.exports = {
  onSelect,
  unSelect,
  removeUndefinedObject,
  updateNestedObjectParser
};
