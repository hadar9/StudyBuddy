import React from 'react';

export default function GeneralMessage({ folder }) {
  return (
    <div>
      <p>{folder.name}</p>
      <p>{folder.path}</p>
    </div>
  );
}
