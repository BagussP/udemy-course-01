'use client'

import { useFormStatus } from "react-dom";

export const FormSubmit = () => {
  const status = useFormStatus();

  if(status.pending) {
    return <p>Creating Post...</p>
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};
