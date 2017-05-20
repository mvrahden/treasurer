module.exports = [
  {
    header: [undefined,'Col2','Col3','Col4'],
    data: [
      [11, '21', '31', '41']
    ]
  },
  {
    header: [null,'Col2','Col3','Col4'],
    data: [
      [11, '21', '31', '41']
    ]
  },
  {
    header: ['Col1','Col2','Col3','Col4'],
    data: [
      ['13', '23', {}, '43']
    ]
  },
  {
    header: ['Col1','Col2','Col3','Col4'],
    data: [
      ['13', '23', () => {}, '43']
    ]
  },
  {
    header: ['Col1','Col2','Col3','Col4'],
    data: [
      ['13', '23', [], '43']
    ]
  },
  // {
  //   header: [null,'Col2','Col3','Col4'],
  //   data: [
  //     [11, '21', '31', '41'],
  //     ['12', 22, '32', '42'],
  //     ['13', '23', 33, '43'],
  //     ['14', '24', '34', 44]
  //   ]
  // }
];