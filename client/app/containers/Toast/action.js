import { ADD_TOAST, REMOVE_TOAST } from './constant';

export const addToast = toast => {
  return {
    type: ADD_TOAST,
    payload: toast,
  };
};

export const removeToast = id => {
  return {
    type: REMOVE_TOAST,
    payload: id,
  };
};
