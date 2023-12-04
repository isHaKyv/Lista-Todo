// IconAtom.jsx
import React from 'react';

function IconAtom({ icon, size }) {
  const IconComponent = icon;
  return <IconComponent size={size} />;
}

export default IconAtom;
