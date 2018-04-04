export const columns = [
  {
    prop: 'lnkey',
    label: 'Loan #',
    columnType: 'string',
    width: 70,
    canSort: true,
    canGroup: true,
    canFilter: true,
  },
  {
    prop: 'borrowerNames',
    label: 'Borrower/s',
    columnType: 'string',
    width: 150,
    canSort: true,
    canGroup: true,
    canFilter: true,
  },
  {
    prop: 'docNum',
    label: '# Docs',
    columnType: 'string',
    width: 50,
    canSort: true,
    canGroup: true,
    canFilter: true,
  },
  {
    prop: 'documents',
    label: 'Documents',
    columnType: 'string',
    width: 300,
    canSort: true,
    canGroup: true,
    canFilter: true,
  },
  
  {
    prop: 'complete',
    label: 'Complete',
    width: 100,
    columnType: 'string',
    canSort: true,
    canGroup: true,
    canFilter: true,
  }
];
