import { PadStartPipe } from './pad-start.pipe';

describe('PadStartPipe', () => {
  it('should return unchanged non numeric values', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform('hello' as any, 5)).toBe('hello');
  });
  it('should pad with 0 by default', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform(1, 5)).toBe('00001');
  });
  it('should pad with other values', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform(1, 5, '2')).toBe('22221');
  });
});
