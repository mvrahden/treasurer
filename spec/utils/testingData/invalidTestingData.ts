export class Invalid {
  public static headers = [
    undefined,
    null,
    'falseValue',
    1.5,
    [],
    ['validValue', undefined],
    ['validValue', null],
    ['validValue', []],
    ['validValue', {}]];
  public static paths = [
    [],
    null,
    undefined,
    1.5,
    './test/subdir/subsubdir/test.xlsx',
    './test/subdir/subsubdir/test',
    './test/subdir/subsubdir/test.doc'
  ];
  public static fileContents = [
    {
      header: [undefined, 'Col2', 'Col3', 'Col4'],
      data: [[11, '21', '31', '41']]
    },
    {
      header: [null, 'Col2', 'Col3', 'Col4'],
      data: [[11, '21', '31', '41']]
    },
    {
      header: ['Col1', 'Col2', 'Col3', 'Col4'],
      data: [['13', '23', {}, '43']]
    },
    {
      header: ['Col1', 'Col2', 'Col3', 'Col4'],
      data: [['13', '23', () => { }, '43']]
    },
    {
      header: ['Col1', 'Col2', 'Col3', 'Col4'],
      data: [['13', '23', [], '43']]
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

  public static extensions = [
    './path/toFileWithoutExtension',
    './path/toFile.xlsx',
    './path/toFile.xls',
    './path/toFile.docx',
    './path/toFile.doc',
    './path/toFile.js',
    './path/toFile.ts',
    './path/toFile.html',
    './path/toFile.xml',
    './path/toFile.xml'
  ];
  public static dataStructures = [
    undefined,
    null,
    'falseValue',
    1.5,
    [],
    {},
    [['validValue', 'validValue'], undefined],
    [['validValue', 'validValue'], null],
    [['validValue', 'validValue'], () => { }],
    [['validValue', 'validValue'], { falseObject: [['false3dStructure'], ['false3dStructure']] }]
  ];
  public static dataElements = [
    [['validValue', 'validValue'], [null, 'validValue']],
    [['validValue', 'validValue'], [['false3dStructure'], ['false3dStructure']]],
    [['validValue', 'validValue'], [() => { }, 'validValue']],
    [['validValue', 'validValue'], [{ falseObject: [['false3dStructure'], ['false3dStructure']] }]]
  ];

}
