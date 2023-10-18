
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  export function getComparator(order, orderBy) {
    return (a, b) => {
      if (order === 'asc') {
        if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        if (a[orderBy] > b[orderBy]) {
          return 1;
        }
        return 0;
      } else {
        if (a[orderBy] > b[orderBy]) {
          return -1;
        }
        if (a[orderBy] < b[orderBy]) {
          return 1;
        }
        return 0;
      }
    };
  }
  