import { renderHook, act } from '@testing-library/react-hooks';

import useAuthorInputState from '../useAuthorInputState';

describe('Testing useAuthorInputState', () => {
  it('should change value', () => {
    const { result } = renderHook(() => useAuthorInputState());

    const inputValue = { target: { value: 'author one' } };

    act(() => {
      result.current.onChange(inputValue);
    });

    expect(result.current.onChange).to.be.a('function');
    expect(result.current.value).to.equal('author one');
  });
});
