import { ChangeEvent } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail =
  (callBackFn: (message: string | null) => void) =>
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!emailPattern.test(event.target.value)) {
      callBackFn('Please enter a valid email address.');
    } else {
      callBackFn(null);
    }
  };
