export const getSortingFn = (order, prop) => {
  return (a, b) => {
    if (order === 'ascending'){
      return a[prop].toString().localeCompare(b[prop].toString());
    } else {
      return b[prop].toString().localeCompare(a[prop].toString());
    }
  }
};

export const ApiException = function(message) {
  this.message = message;
  this.name = 'ApiException';
};
