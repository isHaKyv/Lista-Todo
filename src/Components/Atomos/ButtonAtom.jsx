// ButtonAtom.jsx
import React from 'react';

function ButtonAtom({ onClick, children }) {
  return (
    <button onClick={onClick}>{children}</button>
  );
}

export default ButtonAtom;
