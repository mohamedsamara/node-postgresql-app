import { renderHook, act } from '@testing-library/react-hooks';

import useDrawerState from '../useDrawerState';

describe('Testing useDrawerState', () => {
  it('should change value', () => {
    const { result } = renderHook(() => useDrawerState());

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.setOpen).to.be.a('function');
    expect(result.current.open).to.equal(true);
  });
});
