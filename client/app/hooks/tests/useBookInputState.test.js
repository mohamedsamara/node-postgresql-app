import { renderHook, act } from '@testing-library/react-hooks';

import useBookInputState from '../useBookInputState';

describe('Testing useBookInputState', () => {
  it('should change value', () => {
    const { result } = renderHook(() => useBookInputState());

    const inputValue = { target: { name: 'title', value: 'book one' } };

    act(() => {
      result.current.onChange(inputValue);
    });

    expect(result.current.onChange).to.be.a('function');
    expect(result.current.values.title).to.equal('book one');
  });
});
