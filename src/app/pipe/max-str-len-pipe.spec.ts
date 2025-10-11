import { MaxStrLenPipe } from './max-str-len-pipe';

describe('MaxStrLenPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxStrLenPipe();
    expect(pipe).toBeTruthy();
  });
});
