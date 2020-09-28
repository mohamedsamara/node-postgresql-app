import { renderHook, act } from '@testing-library/react-hooks';

import useModalState from '../useModalState';

describe('Testing useModalState', () => {
  it('should change value', () => {
    const { result } = renderHook(() => useModalState());

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.setOpen).to.be.a('function');
    expect(result.current.open).to.equal(true);
  });
});
