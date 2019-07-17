import tracePath from '../index'; 

describe('tracePath', () => {
  let a;
  let b;

  beforeAll(() => {
    a = 'i am a string here';
    b = 'i am aasd z here';
  });

  it('exists', () => {
    expect(tracePath).toBeTruthy();
  });

  it('traces the path', () => {
    const diffPath = [];
    const canPatch = (x, y, px, py) => {
      if (x === px) {
        diffPath.unshift('REMOVE')
      }
      
      if (y === py) {
        diffPath.unshift('INSERT')
      }
    };
  const comparator = (a, b) => a === b;
  
  tracePath(a, b, canPatch, comparator);

  expect(diffPath).toBe();
  });
});