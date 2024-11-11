
// const {removeDuplicates} = require ("../controllers/projectsControl")

// describe('projectsControl.removeDuplicates', () => {
//   test('deve remover itens duplicados de um array', () => {
//     const input = [1, 2, 2, 3, 4, 4, 5];
//     const expectedOutput = [1, 2, 3, 4, 5];
//     expect(projectsControl.removeDuplicates(input)).toEqual(expectedOutput);
//   });

//   test('deve retornar o array original se não houver duplicatas', () => {
//     const input = [1, 2, 3];
//     expect(projectsControl.removeDuplicates(input)).toEqual(input);
//   });

//   test('deve lidar com arrays vazios', () => {
//     const input = [];
//     expect(projectsControl.removeDuplicates(input)).toEqual([]);
//   });
// });

const { removeDuplicates } = require('../controllers/projectsControl');

describe('removeDuplicates', () => {
  it('deve remover itens duplicados com o mesmo _id', () => {
    const input = [
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
      { _id: '1', name: 'Project A (duplicate)' },
    ];

    const output = removeDuplicates(input);

    expect(output).toEqual([
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
    ]);
  });

  it('deve retornar um array vazio se a entrada for vazia', () => {
    const input = [];
    const output = removeDuplicates(input);
    expect(output).toEqual([]);
  });

  it('deve manter o array sem alteração se não houver duplicados', () => {
    const input = [
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
    ];

    const output = removeDuplicates(input);

    expect(output).toEqual(input);
  });
});