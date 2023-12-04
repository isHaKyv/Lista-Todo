
import React from 'react';

function InputAtom({ placeholder, onChange, value }) {
  return (
    <input placeholder={placeholder} type="text" onChange={onChange} value={value} />
  );
}

export default InputAtom;
