import React from 'react';

export default function CenterDecorator(getStory) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
        padding: '16px',
      }}
    >
      {getStory()}
    </div>
  );
}
